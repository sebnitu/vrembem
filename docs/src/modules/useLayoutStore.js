import { atom, map } from 'nanostores';

const $collection = atom(null);

const $layout = map({
  hasAside: false,
  hasDrawer: false,
});

$collection.listen((value) => {
  if (value) {
    $layout.setKey('hasDrawer', true);
  } else {
    $layout.setKey('hasDrawer', false);
  }
});

export { $layout, $collection };
