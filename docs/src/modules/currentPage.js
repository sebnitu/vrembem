const currentPage = (pathname, options) => {
  const settings = {
    pathname: pathname,
    classBase: '',
    classCurrent: 'is-current',
    classParent: 'is-parent',
    ...options
  };

  function isCurrent(path) {
    return (pathname === path);
  }

  function isParent(path) {
    return (pathname.includes(path));
  }

  function classes(path, base = settings.classBase) {
    const classes = [];

    if (base) {
      classes.push(base);
    }

    if (isCurrent(path)) {
      classes.push(settings.classCurrent);
    } else if (isParent(path)) {
      classes.push(settings.classParent);
    }

    return classes.join(' ');
  }

  return {
    settings,
    isCurrent,
    isParent,
    classes
  };
};

export { currentPage };
