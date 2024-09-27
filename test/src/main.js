const isSameDomain = (styleSheet) => {
  if (!styleSheet.href) {
    return true;
  }
  return styleSheet.href.indexOf(window.location.origin) === 0;
};
const isStyleRule = (rule) => rule.type === 1;
const getCSSCustomPropIndex = () => {
  return [...document.styleSheets].filter(isSameDomain).reduce(
    (finalArr, sheet) =>
      finalArr.concat(
        [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
          const props = [...rule.style]
            .map((propName) => [
              propName.trim(),
              rule.style.getPropertyValue(propName).trim()
            ])
            .filter(([propName]) => propName.indexOf("--vb") === 0);
          return [...propValArr, ...props];
        }, [])
      ),
    []
  );
};

const customProperties = getCSSCustomPropIndex();
const location = document.getElementById("custom-properties");
customProperties.forEach((prop) => {
  const li = document.createElement("li");
  const template = `
  <div class="flex flex_gap_sm">
    <code class="code">${prop[0]}</code>
    <code class="code">${prop[1]}</code>
  </div>
  `;
  li.innerHTML = template;
  location.append(li);
});

const count = document.createElement("span");
count.innerText = ` (${customProperties.length})`;
document.getElementById("custom-properties-title").append(count);
