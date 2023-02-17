import { Popover } from 'vrembem';
let popover = null;

if (typeof window !== 'undefined') {
  popover = new Popover({ autoInit: true });
  window['popover'] = popover;
}

export { popover };
