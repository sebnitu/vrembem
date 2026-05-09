export function currentPage(pathname, options = {}) {
  const config = {
    pathname: pathname,
    classBase: "",
    classActive: "is-active",
    classParent: "is-parent",
    ...options
  };

  function isCurrent(path) {
    return pathname === path;
  }

  function isParent(path) {
    return pathname.includes(path);
  }

  function classes(path, base = config.classBase) {
    const classes = [];

    if (base) {
      classes.push(base);
    }

    if (isCurrent(path)) {
      classes.push(config.classActive);
    } else if (isParent(path)) {
      classes.push(config.classParent);
    }

    return classes.join(" ");
  }

  return {
    config,
    isCurrent,
    isParent,
    classes
  };
}
