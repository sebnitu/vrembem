export type ParsedConfig = {
  package: string;
  library: string;
};

/**
 * Builds Sass `with` clause config examples directly from a package's own
 * `_config.scss` source, using its `$default` map as the single source of
 * truth. This keeps the documentation in sync with the actual config options
 * without having to manually duplicate them.
 *
 * @param source
 *   The raw contents of the package's `src/_config.scss` file.
 * @param pkg
 *   The package name, e.g. "button".
 *
 * @returns
 *   `package`: A `@use "@vrembem/<pkg>" with (...)` example.
 *   `library`: The `@use "vrembem" with (...)` equivalent, where top-level
 *   config keys are prefixed with the package name (except for "core", whose
 *   options are not namespaced in the library import).
 */
export function parseConfig(source: string, pkg: string): ParsedConfig {
  let map: string;

  try {
    map = extractDefaultMap(source);
  } catch (error) {
    throw new Error(
      `Failed to parse @vrembem/${pkg} config: ${(error as Error).message}`,
      { cause: error }
    );
  }

  return {
    package: toPackageConfig(map, pkg),
    library: toLibraryConfig(map, pkg)
  };
}

/**
 * Wraps a config map in a package import `with` clause.
 */
function toPackageConfig(map: string, pkg: string): string {
  return toWithClause(`@vrembem/${pkg}`, map);
}

/**
 * Wraps a config map in a library (barrel) import `with` clause. Top-level
 * keys are prefixed with the package name, matching how the `vrembem` import
 * namespaces package options (see `core/config`'s `merge-with-default` mixin).
 * Nested map keys are left untouched. Core options are not namespaced.
 */
function toLibraryConfig(map: string, pkg: string): string {
  return toWithClause("vrembem", pkg === "core" ? map : prefixKeys(map, pkg));
}

/**
 * Wraps a config map in a `@use "<module>" with ($config: (...));` clause,
 * indenting the map contents to fit.
 */
function toWithClause(module: string, map: string): string {
  const body = map
    .replace(/\n$/, "")
    .split("\n")
    .map((line) => (line.length ? `  ${line}` : line))
    .join("\n");

  return `@use "${module}" with (\n  $config: (${body}\n  )\n);`;
}

/**
 * Extracts the contents of a package's `$default: ( ... );` Sass map,
 * i.e. everything between its outer parens, preserving original formatting.
 */
function extractDefaultMap(source: string): string {
  const marker = "$default: (";
  const start = source.indexOf(marker);

  if (start === -1) {
    throw new Error(`Could not find "${marker}" in config source`);
  }

  const openIndex = start + marker.length - 1;
  let depth = 0;
  let closeIndex = -1;

  scanParens(source, openIndex, (index, delta) => {
    depth += delta;
    if (depth === 0) {
      closeIndex = index;
      return true;
    }
  });

  if (closeIndex === -1) {
    throw new Error(`Could not find closing paren for "${marker}"`);
  }

  return source.slice(openIndex + 1, closeIndex);
}

/**
 * Prefixes the top-level keys of a config map with the package name.
 */
function prefixKeys(map: string, pkg: string): string {
  let depth = 0;

  return map
    .split("\n")
    .map((line) => {
      if (depth === 0) {
        line = line.replace(/^(\s*)"([\w-]+)":/, `$1"${pkg}-$2":`);
      }
      depth += getDepthDelta(line);
      return line;
    })
    .join("\n");
}

/**
 * Counts the net change in paren depth for a single line.
 */
function getDepthDelta(line: string): number {
  let delta = 0;
  scanParens(line, 0, (_, change) => {
    delta += change;
  });
  return delta;
}

/**
 * Walks Sass source from `start`, calling `onParen` for each paren that is
 * not inside a quoted string or `//` comment. `delta` is `1` for an opening
 * paren and `-1` for a closing one. Return `true` from `onParen` to stop early.
 */
function scanParens(
  source: string,
  start: number,
  onParen: (index: number, delta: 1 | -1) => boolean | void
): void {
  let inString = false;

  for (let i = start; i < source.length; i++) {
    const char = source[i];

    if (char === '"' && source[i - 1] !== "\\") {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === "/" && source[i + 1] === "/") {
      const newline = source.indexOf("\n", i);
      if (newline === -1) return;
      i = newline;
      continue;
    }

    if (char === "(" || char === ")") {
      if (onParen(i, char === "(" ? 1 : -1)) return;
    }
  }
}
