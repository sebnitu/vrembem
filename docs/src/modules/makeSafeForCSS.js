function makeSafeForCSS(name) {
  return name.replace(/[^a-z0-9]/g, function(s) {
    const c = s.charCodeAt(0);
    if (c == 32) return "-";
    if (c == 46) return "-";
    return s.toLowerCase();
  });
}

export { makeSafeForCSS };
