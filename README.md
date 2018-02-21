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

Import the components you'd like to use directly into your Sass project. To import the entire project, use the vrembem import:

```scss
@import 'vrembem';
```

Alternatively, you can add only the specific components you need. Keep in mind that components include the `all` to include all necessary component files:

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

Remember that you will need to add the path to Vrembem in your `includePaths` options array to make sure LibSass can resolve `@import` declarations.

```
node_modules/vrembem/scss/
```

## Available Components

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

## Upcoming Layout Examples

- [ ] GitHub project dashboard
- [ ] Signin form
- [ ] Slack chat interface
