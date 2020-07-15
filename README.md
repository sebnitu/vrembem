# Vrembem

A CSS component library based on the BEM methodology.

[![npm version](https://img.shields.io/npm/v/vrembem.svg)](https://www.npmjs.com/package/vrembem)
[![Build Status](https://travis-ci.org/sebnitu/vrembem.svg?branch=master)](https://travis-ci.org/sebnitu/vrembem)
[![Coverage Status](https://coveralls.io/repos/github/sebnitu/vrembem/badge.svg?branch=master)](https://coveralls.io/github/sebnitu/vrembem?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/sebnitu/vrembem.svg)](https://david-dm.org/sebnitu/vrembem?type=dev)

## About

Vrembem is a front-end CSS component library written with the goal of making available common web interface patterns. This allows developers and designers to implement robust components into their web projects while keeping them flexible and customizable through the use of the [BEM methodology](https://en.bem.info/methodology/) and [Sass CSS extension language](https://sass-lang.com/).

This Vrembem repository is managed as a monorepo that contains all available components. Include all components using the convenient all-in-one [vrembem](./packages/vrembem#readme) package.

## Packages

- [arrow](./packages/arrow#readme) - A directional triangle drawn with CSS.
- [base](./packages/base#readme) - Includes useful default styles and base components for common HTML elements.
- [breadcrumb](./packages/breadcrumb#readme) - The breadcrumb component is a navigation component that shows the hierarchical path to a users current location.
- [button](./packages/button#readme) - Buttons are a simple component that allow users to take actions.
- [button-group](./packages/button-group#readme) - A component for displaying groups of buttons.
- [card](./packages/card#readme) - The cards component provides a flexible and extensive content container with multiple variants and options.
- [checkbox](./packages/checkbox#readme) - Checkboxes allow the user to select multiple options from a set.
- [container](./packages/container#readme) - A component for giving content a max width and centered within it's parent.
- [core](./packages/core#readme) - The core variables, functions and mixins for Vrembem components.
- [dialog](./packages/dialog#readme) - A component that facilitates a conversation between the system and the user. They often request information or an action from the user.
- [dismissible](./packages/dismissible#readme) - A component for removing an element from the DOM or hiding it with a CSS class.
- [drawer](./packages/drawer#readme) - A container component that slides in from the left or right. Typically containing menus, search or other content.
- [dropdown](./packages/dropdown#readme) - A component that is initially hidden and revealed upon user interaction either through a click or hover event. Dropdown components typically display lists of possible actions or navigation.
- [grid](./packages/grid#readme) - A flexbox based grid system component.
- [icon](./packages/icon#readme) - The icon component provides a consistent way to style icons.
- [icon-action](./packages/icon-action#readme) - A component for displaying simple action buttons using icons.
- [input](./packages/input#readme) - A component for displaying form input elements.
- [level](./packages/level#readme) - A simple flexbox based layout component.
- [media](./packages/media#readme) - The media component is used for displaying groups of content with a corresponding media asset, such as an image, avatar or icon.
- [menu](./packages/menu#readme) - Menus represent groups of links, actions or tools that a user can interact with.
- [modal](./packages/modal#readme) - A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the dialog component to make modal dialogs.
- [notice](./packages/notice#readme) - A component for highlighting (optionally dismissible) messages to the user.
- [panel](./packages/panel#readme) - Panels are a compositional container component that allows you to wrap and theme groups of content.
- [radio](./packages/radio#readme) - Radios allow the user to select a single option from a set.
- [section](./packages/section#readme) - A container component for wrapping distinct sections of a page.
- [switch](./packages/switch#readme) - Switches are a binary form element used to toggle between two options.
- [table](./packages/table#readme) - A table component for displaying HTML tables.
- [tooltip](./packages/tooltip#readme) - Text labels that appear when a user hovers over, focuses on or touches an element.
- [utility](./packages/utility#readme) - The utility component provides a set of atomic classes that specialize in a single function.
- [vrembem](./packages/vrembem#readme) - A complete collection of all Vrembem components into a single comprehensive package for convenience.

## Copyright and License

Vrembem and Vrembem documentation copyright (c) 2020 Sebastian Nitu. Vrembem is released under the [MIT license](https://github.com/sebnitu/vrembem/blob/master/LICENSE) and Vrembem documentation is released under [Creative Commons](https://github.com/sebnitu/vrembem/blob/master/docs/LICENSE).
