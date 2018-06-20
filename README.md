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
// Core files
@import 'core/all';

// Global styles (recommended)
@import 'global/all';

// Layout components
@import 'layout/all';

// All block components
@import 'blocks/all';

// Individual block components
@import 'blocks/button/all';
@import 'blocks/dialog/all';
@import 'blocks/menu/all';
@import 'blocks/tooltip/all';
```

**Path**

To resolve the import paths for Vrembem, you'll need to include the following path in your compiler options. In node-sass it's passed in the `includePaths` option array.

```
node_modules/vrembem/src/scss/
```
