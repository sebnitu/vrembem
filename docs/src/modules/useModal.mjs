import { Modal } from 'vrembem';
let modal = null;

if (typeof window !== 'undefined') {
  modal = new Modal();
  window['modal'] = await modal.init();
}

export { modal };
