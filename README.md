# Vrembem

A CSS component library based on the BEM methodology.

## Usage

A quick way to start using Vrembem now is to install it via a package manager.

```bash
# Using NPM
npm install vrembem

# Using Yarn
yarn add vrembem
```

## Imports

Import the components you'd like to use directly into your Sass project. To import the entire project, use the vrembem import:

```scss
@import 'vrembem';
```

Alternatively, you can add only the specific components you need. Keep in mind that components include the `all` import to include all necessary component files:

```scss
// Import core files
@import 'core/all';

// Import all global styles (recommended)
@import 'global/all';

// Import all layout components
@import 'layout/all';

// Import either all components, or call specific components you need
@import 'blocks/button/all';
@import 'blocks/dialog/all';
@import 'blocks/menu/all';
@import 'blocks/tooltip/all';
```

**Paths**

To resolve the import paths for Vrembem, you'll need to include the following path in your compiler options. In node-sass it's passed in the `includePaths` option array.

```
node_modules/vrembem/scss/
```

## What's Available?

**Global**
- [ ] Base
- [ ] Reboot
- [ ] Utility

**Layout**

- [ ] Container
- [ ] Grid
- [ ] Level
- [ ] Section
- [ ] Spacing

**Blocks**

- [ ] Arrow
- [ ] Badge
- [ ] Box
- [ ] Breadcrumb
- [ ] Button
- [ ] Button-group
- [ ] Dialog
- [ ] Dropdown
- [ ] Embed-wrap
- [ ] Hero
- [ ] Icon
- [ ] Icon-action
- [ ] Input
- [ ] Input-group
- [ ] Menu
- [ ] Modal
- [ ] Navbar
- [ ] Notice
- [ ] Tooltip
- [ ] Typography

## In Development

**Examples**

- [ ] GitHub project dashboard
- [ ] Signin form
- [ ] Slack chat interface
- [ ] YouTube single video view
- [ ] Single page website
