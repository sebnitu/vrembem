export const anchorPositionStart = (el, anchor, settings) => {
  let pos = settings.anchorPadding;
  if (settings.selectorTopElem) {
    const topElem = el.querySelector(settings.selectorTopElem);
    if (topElem) pos += topElem.offsetHeight;
  }
  return anchor.offsetTop - (pos);
};

export const anchorPositionEnd = (el, anchor, settings) => {
  let pos = settings.anchorPadding;
  if (settings.selectorBotElem) {
    const botElem = el.querySelector(settings.selectorBotElem);
    if (botElem) pos += botElem.offsetHeight;
  }
  return anchor.offsetTop - (el.offsetHeight - (anchor.offsetHeight + pos));
};

export const anchorPositionCenter = (el, anchor, settings) => {
  const posTop = anchorPositionStart(el, anchor, settings);
  const posBot = anchorPositionEnd(el, anchor, settings);
  return posBot + ((posTop - posBot) / 2);
};

export const anchorPositionNearest = (el, anchor, settings) => {
  const posTop = anchorPositionStart(el, anchor, settings);
  const posBot = anchorPositionEnd(el, anchor, settings);
  if (el.scrollTop > posTop) return posTop;
  if (el.scrollTop < posBot) return posBot;
  return false;
};

export const anchorInView = (el, anchor, settings) => {
  const posTop = anchorPositionStart(el, anchor, settings);
  const posBot = anchorPositionEnd(el, anchor, settings);

  if (el.scrollTop > posTop || el.scrollTop < posBot) return false;
  return true;
};

export const anchorPositionGet = (el, anchor, settings) => {
  const inView = anchorInView(el, anchor, settings);
  switch (settings.alignment) {
    case 'start': return (inView) ? false : anchorPositionStart(el, anchor, settings);
    case 'center': return (inView) ? false : anchorPositionCenter(el, anchor, settings);
    case 'end': return (inView) ? false : anchorPositionEnd(el, anchor, settings);
    case 'nearest': return anchorPositionNearest(el, anchor, settings);
    default: return false;
  }
};
