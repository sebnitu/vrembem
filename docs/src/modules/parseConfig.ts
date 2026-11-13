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
  const packageConfig = toPackageConfig(source, pkg);
  return {
    package: packageConfig,
    library: toLibraryConfig(packageConfig, pkg)
  };
}

/**
 * Wraps a package's `$default` map in a package-style `with` clause.
 */
function toPackageConfig(source: string, pkg: string): string {
  const body = extractDefaultMap(source)
    .replace(/\n$/, "")
    .split("\n")
    .map((line) => (line.length ? `  ${line}` : line))
    .join("\n");

  return `@use "@vrembem/${pkg}" with (\n  $config: (${body}\n  )\n);`;
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
  let inString = false;
  let i = openIndex;

  for (; i < source.length; i++) {
    const char = source[i];
    const prev = source[i - 1];

    if (char === '"' && prev !== "\\") {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === "/" && source[i + 1] === "/") {
      const newline = source.indexOf("\n", i);
      i = newline === -1 ? source.length : newline;
      continue;
    }

    if (char === "(") depth++;
    if (char === ")") {
      depth--;
      if (depth === 0) break;
    }
  }

  return source.slice(openIndex + 1, i);
}

/**
 * Transforms a package-style config example into its library (barrel) import
 * equivalent. Keys directly inside the `$config` map are prefixed with the
 * package name, matching how the `vrembem` import namespaces package options
 * (see `core/config`'s `merge-with-default` mixin). Nested map keys are left
 * untouched.
 */
function toLibraryConfig(source: string, pkg: string): string {
  const result = source.replace(
    new RegExp(`@use\\s+"@vrembem\\/${pkg}"`),
    `@use "vrembem"`
  );

  // Core options are not namespaced in the library import
  if (pkg === "core") return result;

  const lines = result.split("\n");
  let depth = 0;
  let baseDepth: number | null = null;

  const transformed = lines.map((line) => {
    // Keys only get prefixed at the depth directly inside `$config: ( ... )`
    if (baseDepth !== null && depth === baseDepth) {
      const match = line.match(/^(\s*)"([\w-]+)":/);
      if (match) {
        const [full, indent, key] = match;
        line = line.replace(full, `${indent}"${pkg}-${key}":`);
      }
    }

    depth += getDepthDelta(line);

    if (baseDepth === null && line.includes("$config:")) {
      baseDepth = depth;
    }

    return line;
  });

  return transformed.join("\n");
}

/**
 * Counts the net change in paren depth for a single line, ignoring parens
 * inside quoted strings or after a `//` comment marker.
 */
function getDepthDelta(line: string): number {
  let delta = 0;
  let inString = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const prev = line[i - 1];

    if (char === '"' && prev !== "\\") {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === "/" && line[i + 1] === "/") break;

    if (char === "(") delta++;
    if (char === ")") delta--;
  }

  return delta;
}
