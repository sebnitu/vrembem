# Changelog

This document logs all notable changes to the Vrembem project.

**Tags:**

| Label          | Heading                    |
| :------------- | :------------------------- |
| `PR: breaking` | :fire: Breaking Changes    |
| `PR: feat`     | :tada: New Feature         |
| `PR: fix`      | :bug: Bug Fix              |
| `PR: refactor` | :house: Refactor           |
| `PR: test`     | :white_check_mark: Testing |
| `PR: docs`     | :books: Documentation      |
| `PR: chore`    | :hammer: Chore             |

<!--
Fixing issues with Lerna
- Run `npx lerna repair`
- Run `npx lerna clean`
- Delete `node_modules` and `package-lock.json`
- Run `npm install`

Publish flow for `next` branch
- Merge branch that contains appropriate PR label
- Run `npm run sink`
- Run `npx lerna-changelog`
- Copy/paste output from changelog into this file
- Fix heading levels `####` > `###`
- Commit changes using the commit message template
- Run `npx lerna version` (use `--force-publish` to force a bump on all packages)
- Run `npx lerna publish from-package --dist-tag next`

Commit message template:
chore(release): add v4.0.0-next.21 to CHANGELOG.md

Docs:
https://lerna.js.org/docs/features/version-and-publish
-->
<!-- v4.0.0-next -->


## v4.0.0-next.21 (2024-08-03)

### :bug: Bug Fix
* `popover`
  * [#1967](https://github.com/sebnitu/vrembem/pull/1967) Fix bug where popover tries to open when it no longer exists


## v4.0.0-next.20 (2024-08-03)

### :tada: New Feature
* `popover`, `vrembem`
  * [#1966](https://github.com/sebnitu/vrembem/pull/1966) Refactor popover and add custom properties support
* `button`, `core`, `input`, `menu`
  * [#1965](https://github.com/sebnitu/vrembem/pull/1965) Add focus-ring variables and apply to form-controls


## v4.0.0-next.19 (2024-08-01)

### :house: Refactor
* `button`, `checkbox`, `core`, `menu`, `radio`, `switch`
  * [#1964](https://github.com/sebnitu/vrembem/pull/1964) Refactor how form-controls handle size calculations


## v4.0.0-next.18 (2024-07-31)

### :hammer: Chore
* `drawer`, `modal`, `popover`
  * [#1963](https://github.com/sebnitu/vrembem/pull/1963) Add missing root.scss value in package.json "files" property


## v4.0.0-next.17 (2024-07-31)

### :tada: New Feature
* `checkbox`, `core`, `radio`, `switch`
  * [#1962](https://github.com/sebnitu/vrembem/pull/1962) Add css.defer function to better manage dependent custom property values and output


## v4.0.0-next.16 (2024-07-30)

### :tada: New Feature
* `button`, `checkbox`, `core`, `input`, `menu`, `radio`, `switch`, `vrembem`
  * [#1961](https://github.com/sebnitu/vrembem/pull/1961) Apply form-control appearance variables to create a more consistent style language
* `core`, `vrembem`
  * [#1951](https://github.com/sebnitu/vrembem/pull/1951) Add new themeStore core module for managing theme state
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `input`, `menu`, `notice`, `radio`, `switch`, `utility`, `vrembem`
  * [#1950](https://github.com/sebnitu/vrembem/pull/1950) Apply form-control variables to create consistent scaling


## v4.0.0-next.15 (2024-07-13)

### :house: Refactor
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `flex`, `grid`, `icon`, `input`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1928](https://github.com/sebnitu/vrembem/pull/1928) Refactor theme module as an extension of the css module


## v4.0.0-next.14 (2024-07-11)

### :tada: New Feature
* `checkbox`, `radio`, `switch`
  * [#1927](https://github.com/sebnitu/vrembem/pull/1927) Add background color property to form-controls
* `core`
  * [#1924](https://github.com/sebnitu/vrembem/pull/1924) Improve creating and maintaining themes

### :house: Refactor
* `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `flex`, `grid`, `icon`, `input`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `vrembem`
  * [#1926](https://github.com/sebnitu/vrembem/pull/1926) Refactor build flow to separate base and root output in components
* `button`, `card`, `checkbox`, `core`, `drawer`, `input`, `menu`, `modal`, `radio`, `switch`
  * [#1925](https://github.com/sebnitu/vrembem/pull/1925) Add "form-control" and "transition" modules back in the "core" css module

### :books: Documentation
* [#1923](https://github.com/sebnitu/vrembem/pull/1923) Fix theme classes not overriding system preference


## v4.0.0-next.13 (2024-07-06)

### :tada: New Feature
* `core`
  * [#1917](https://github.com/sebnitu/vrembem/pull/1917) Allow passing maps to config.set mixin

### :house: Refactor
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `flex`, `grid`, `icon`, `input`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1918](https://github.com/sebnitu/vrembem/pull/1918) Improve package exports for better entry paths


## v4.0.0-next.12 (2024-07-05)

### :bug: Bug Fix
* `core`
  * [#1916](https://github.com/sebnitu/vrembem/pull/1916) Fix param parsing in css.set

### :house: Refactor
* `vrembem`
  * [#1915](https://github.com/sebnitu/vrembem/pull/1915) Create better build entries into the Vrembem package


## v4.0.0-next.11 (2024-07-05)

### :tada: New Feature
* `core`, `drawer`, `modal`
  * [#1914](https://github.com/sebnitu/vrembem/pull/1914) Add usage flags and conditional output


## v4.0.0-next.10 (2024-07-04)

### :tada: New Feature
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `flex`, `grid`, `icon`, `input`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1913](https://github.com/sebnitu/vrembem/pull/1913) Add new usage module and configuration to only output CSS vars when used


## v4.0.0-next.9 (2024-06-25)

### :tada: New Feature
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `flex`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1897](https://github.com/sebnitu/vrembem/pull/1897) Refactor grid and flexbox layout components
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`
  * [#1883](https://github.com/sebnitu/vrembem/pull/1883) Add CSS module for managing custom properties
* `grid`, `menu`, `utility`
  * [#1881](https://github.com/sebnitu/vrembem/pull/1881) Migrate the menu component to custom property methods
* `core`, `grid`
  * [#1865](https://github.com/sebnitu/vrembem/pull/1865) Add css function fallback parameter

### :house: Refactor
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `flex`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1897](https://github.com/sebnitu/vrembem/pull/1897) Refactor grid and flexbox layout components
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `switch`, `table`, `utility`, `vrembem`
  * [#1882](https://github.com/sebnitu/vrembem/pull/1882) Refactor core into a more defined library
* `grid`, `menu`, `utility`
  * [#1881](https://github.com/sebnitu/vrembem/pull/1881) Migrate the menu component to custom property methods
* `media`
  * [#1879](https://github.com/sebnitu/vrembem/pull/1879) Migrate the media component to custom property methods
* `level`
  * [#1878](https://github.com/sebnitu/vrembem/pull/1878) Migrate the level component to custom property methods
* `core`, `input`
  * [#1877](https://github.com/sebnitu/vrembem/pull/1877) Migrate the input component to custom property methods
* `icon`
  * [#1875](https://github.com/sebnitu/vrembem/pull/1875) Migrate the icon component to custom property methods
* `notice`
  * [#1866](https://github.com/sebnitu/vrembem/pull/1866) Migrate the notice component to custom property methods
* `base`, `core`, `grid`
  * [#1864](https://github.com/sebnitu/vrembem/pull/1864) Migrate the grid component to custom property methods

### :books: Documentation
* `button`
  * [#1894](https://github.com/sebnitu/vrembem/pull/1894) Update the DocBlock contents to reflect new CSS var output
* `grid`, `menu`, `utility`
  * [#1881](https://github.com/sebnitu/vrembem/pull/1881) Migrate the menu component to custom property methods
* `media`
  * [#1879](https://github.com/sebnitu/vrembem/pull/1879) Migrate the media component to custom property methods
* `level`
  * [#1878](https://github.com/sebnitu/vrembem/pull/1878) Migrate the level component to custom property methods
* `core`, `input`
  * [#1877](https://github.com/sebnitu/vrembem/pull/1877) Migrate the input component to custom property methods
* `icon`
  * [#1875](https://github.com/sebnitu/vrembem/pull/1875) Migrate the icon component to custom property methods
* Other
  * [#1867](https://github.com/sebnitu/vrembem/pull/1867) Add the ability to reset code examples
* `notice`
  * [#1866](https://github.com/sebnitu/vrembem/pull/1866) Migrate the notice component to custom property methods
* `base`, `core`, `grid`
  * [#1864](https://github.com/sebnitu/vrembem/pull/1864) Migrate the grid component to custom property methods


## v4.0.0-next.8 (2024-06-06)

### :tada: New Feature
* `core`, `section`, `table`
  * [#1848](https://github.com/sebnitu/vrembem/pull/1848) Migrate the section component to new theme method
* `base`
  * [#1847](https://github.com/sebnitu/vrembem/pull/1847) Add sr-only class to base module
* `checkbox`, `core`, `radio`, `switch`
  * [#1817](https://github.com/sebnitu/vrembem/pull/1817) Apply CSS Variables to Checkbox, Radio and Switch form controls
* `button`, `checkbox`, `core`, `input`, `table`
  * [#1809](https://github.com/sebnitu/vrembem/pull/1809) Refactor palette get function to support hsl with alpha returns

### :bug: Bug Fix
* Other
  * [#1838](https://github.com/sebnitu/vrembem/pull/1838) Fix error on Get Started page by adding drawer element conditional check
* `button`
  * [#1835](https://github.com/sebnitu/vrembem/pull/1835) Add light and dark themes to default button styles
  * [#1781](https://github.com/sebnitu/vrembem/pull/1781) Button variable fixes and documentation update
* `checkbox`, `core`
  * [#1788](https://github.com/sebnitu/vrembem/pull/1788) Update checkbox documentation and expanded documentation features

### :house: Refactor
* `drawer`, `modal`
  * [#1863](https://github.com/sebnitu/vrembem/pull/1863) Improve error messages on modal and drawer event handlers
* `core`, `drawer`, `modal`, `popover`, `vrembem`
  * [#1862](https://github.com/sebnitu/vrembem/pull/1862) Rename init and destroy methods to mount and unmount
  * [#1827](https://github.com/sebnitu/vrembem/pull/1827) Convert to using double quotes instead of single for JS formatting
* `core`, `drawer`, `modal`, `popover`
  * [#1861](https://github.com/sebnitu/vrembem/pull/1861) Refactor cssVar core function to not require the double dash
* `core`, `section`, `table`
  * [#1848](https://github.com/sebnitu/vrembem/pull/1848) Migrate the section component to new theme method
* `dialog`, `table`
  * [#1839](https://github.com/sebnitu/vrembem/pull/1839) Migrate the table component to new theme method
* `card`, `checkbox`, `core`, `dialog`, `notice`, `radio`, `switch`
  * [#1834](https://github.com/sebnitu/vrembem/pull/1834) Update the mixin names for outputting a theme's CSS variables
* `base`, `core`
  * [#1833](https://github.com/sebnitu/vrembem/pull/1833) Improve inline code styles
* `dialog`
  * [#1832](https://github.com/sebnitu/vrembem/pull/1832) Migrate the dialog component to new theme method
* `button`, `card`, `checkbox`, `core`, `radio`, `switch`
  * [#1819](https://github.com/sebnitu/vrembem/pull/1819) Apply new BEM and CSS Variable functions/mixins to components
* `button`, `checkbox`, `core`, `input`, `table`
  * [#1809](https://github.com/sebnitu/vrembem/pull/1809) Refactor palette get function to support hsl with alpha returns
* `base`, `card`, `core`
  * [#1769](https://github.com/sebnitu/vrembem/pull/1769) Refactor card component and apply new docs format

### :books: Documentation
* Other
  * [#1849](https://github.com/sebnitu/vrembem/pull/1849) Migrate drawer, modal and popover documentation to new format
  * [#1838](https://github.com/sebnitu/vrembem/pull/1838) Fix error on Get Started page by adding drawer element conditional check
  * [#1836](https://github.com/sebnitu/vrembem/pull/1836) Add skip to main content link in navibar
  * [#1820](https://github.com/sebnitu/vrembem/pull/1820) Package documentation state
  * [#1818](https://github.com/sebnitu/vrembem/pull/1818) Minor improvements to documentation UI
  * [#1810](https://github.com/sebnitu/vrembem/pull/1810) Update docs UI to improve DocBlock
  * [#1780](https://github.com/sebnitu/vrembem/pull/1780) Fix Astro hydration mismatch and remove Vue from docs
  * [#1771](https://github.com/sebnitu/vrembem/pull/1771) Add missing component value in astro directive
  * [#1770](https://github.com/sebnitu/vrembem/pull/1770) Add documentation for packages index
* `base`
  * [#1847](https://github.com/sebnitu/vrembem/pull/1847) Add sr-only class to base module
* `checkbox`, `core`, `radio`, `switch`
  * [#1817](https://github.com/sebnitu/vrembem/pull/1817) Apply CSS Variables to Checkbox, Radio and Switch form controls
* `checkbox`, `core`
  * [#1788](https://github.com/sebnitu/vrembem/pull/1788) Update checkbox documentation and expanded documentation features
* `button`
  * [#1781](https://github.com/sebnitu/vrembem/pull/1781) Button variable fixes and documentation update

### :hammer: Chore
* `modal`
  * [#1768](https://github.com/sebnitu/vrembem/pull/1768) Improve ESlint config


## v4.0.0-next.7 (2024-04-07)

### :books: Documentation
* `button`, `core`, `notice`, `table`, `utility`
  * [#1537](https://github.com/sebnitu/vrembem/pull/1537) Improve customization documentation

### :hammer: Chore
* [#1694](https://github.com/sebnitu/vrembem/pull/1694) Correctly update the version of Astro being used


## v4.0.0-next.6 (2024-02-01)

### :tada: New Feature
* `button`, `core`
  * [#1538](https://github.com/sebnitu/vrembem/pull/1538) Add CSS variable support to button component

### :hammer: Chore
* [#1693](https://github.com/sebnitu/vrembem/pull/1693) Bump to current year 2024


## v4.0.0-next.5 (2023-10-03)

### :house: Refactor
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`
  * [#1485](https://github.com/sebnitu/vrembem/pull/1485) Refactor level component to use gap property

### :books: Documentation
* [#1484](https://github.com/sebnitu/vrembem/pull/1484) Update code example markup and styles
* [#1466](https://github.com/sebnitu/vrembem/pull/1466) Add "Suggest changes to this page" link to bottom of content
* [#1465](https://github.com/sebnitu/vrembem/pull/1465) Add page navigation to docs


## 4.0.0-next.4 (2023-09-09)

### :tada: New Feature
* `core`, `notice`, `vrembem`
  * [#1455](https://github.com/sebnitu/vrembem/pull/1455) Add component theming support
* `utility`
  * [#1453](https://github.com/sebnitu/vrembem/pull/1453) Add new overflow utility
* `base`, `core`
  * [#1443](https://github.com/sebnitu/vrembem/pull/1443) Improve the typography and default styles of the type module
* `core`
  * [#1432](https://github.com/sebnitu/vrembem/pull/1432) Create new theme API for better light/dark mode support
* `core`, `drawer`, `modal`, `popover`
  * [#1379](https://github.com/sebnitu/vrembem/pull/1379) Add transition function for using css var transition duration
* `drawer`, `modal`
  * [#1374](https://github.com/sebnitu/vrembem/pull/1374) Introduction of indeterminate state for better handling of inline state.
  * [#1365](https://github.com/sebnitu/vrembem/pull/1365) Add the ability to set a custom screen for modals and modal drawers

### :bug: Bug Fix
* `dialog`, `popover`
  * [#1433](https://github.com/sebnitu/vrembem/pull/1433) Add background and foreground theme to popover and dialog components
* `core`, `drawer`, `icon`, `modal`, `popover`, `utility`, `vrembem`
  * [#1358](https://github.com/sebnitu/vrembem/pull/1358) Updated templates and components for new Astro docs

### :house: Refactor
* `drawer`, `modal`, `popover`
  * [#1363](https://github.com/sebnitu/vrembem/pull/1363) Refactor the register and deregister functionality

### :books: Documentation
* `docs`
  * [#1454](https://github.com/sebnitu/vrembem/pull/1454) Bump astro to 3.0 and migrate templates as needed
  * [#1448](https://github.com/sebnitu/vrembem/pull/1448) Refactor layout state to use props instead of global state module
  * [#1434](https://github.com/sebnitu/vrembem/pull/1434) Add shared state using layout store
  * [#1431](https://github.com/sebnitu/vrembem/pull/1431) Add theme switcher for dark and light modes
  * [#1430](https://github.com/sebnitu/vrembem/pull/1430) Add styles for toolbar and improve mobile styles
  * [#1414](https://github.com/sebnitu/vrembem/pull/1414) Add "Back to top" button and scroll spy module
  * [#1413](https://github.com/sebnitu/vrembem/pull/1413) Add active state to "on this page" menu based on scroll position
  * [#1412](https://github.com/sebnitu/vrembem/pull/1412) Add header anchors to page content
  * [#1393](https://github.com/sebnitu/vrembem/pull/1393) Add active states to navigation (navibar, drawer, aside) menus
* `core`, `popover`
  * [#1380](https://github.com/sebnitu/vrembem/pull/1380) Add a "on this page" section to packages collection
* `core`, `drawer`, `icon`, `modal`, `popover`, `utility`, `vrembem`
  * [#1358](https://github.com/sebnitu/vrembem/pull/1358) Updated templates and components for new Astro docs

### :hammer: Chore
* `core`
  * [#1364](https://github.com/sebnitu/vrembem/pull/1364) Remove deprecated event listeners IE11 support


## 4.0.0-next.3 (2023-07-27)

### :hammer: Chore
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1344](https://github.com/sebnitu/vrembem/pull/1344) Add back lerna-changelog and remove changesets


## 4.0.0-next.2 (2023-07-22)

### :fire: Breaking Changes
* `checkbox`, `icon-action`
  * [#1328](https://github.com/sebnitu/vrembem/pull/1328) Removes the icon-action component and checkbox component JavaScript

### :books: Documentation
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1328](https://github.com/sebnitu/vrembem/pull/1328) Added vite index templates to all packages and a root index for running a multi-page dev server. This update also:
    * Removes the icon-action component
    * Removes the checkbox component JavaScript

### :bug: Bug Fix
* `core`, `modal`, `drawer`
  * [#1330](https://github.com/sebnitu/vrembem/pull/1330) Fix transition bug when child elements transition event bubbles


## 4.0.0-next.1 (2023-07-20)

### :hammer: Chore
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1323](https://github.com/sebnitu/vrembem/pull/1323) Added exports map for SCSS files. These are used when importing SCSS files within the context of JavaScript.


## v4.0.0-next.0 (2023-04-20)

### :hammer: Chore
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1192](https://github.com/sebnitu/vrembem/pull/1192) Remove the coveralls dependency


## v4.0.0-alpha.0 (2023-02-17)

### :tada: New Feature
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#891](https://github.com/sebnitu/vrembem/pull/891) New palette and theme modules

### :house: Refactor
* `card`, `modal`, `section`
  * [#900](https://github.com/sebnitu/vrembem/pull/900) Refactor modal screen styles and how they are applied
* `base`
  * [#899](https://github.com/sebnitu/vrembem/pull/899) Rename base module to normalize
* `button-group`, `vrembem`
  * [#898](https://github.com/sebnitu/vrembem/pull/898) Deprecate button-group
* `breadcrumb`, `drawer`, `grid`, `input`, `modal`, `popover`, `vrembem`
  * [#897](https://github.com/sebnitu/vrembem/pull/897) Deprecate breadcrumb

### :books: Documentation
* `base`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#1107](https://github.com/sebnitu/vrembem/pull/1107) Migrate docs from Jekyll to Astro

### :hammer: Chore
* `core`
  * [#944](https://github.com/sebnitu/vrembem/pull/944) Add palette, theme and root manifest to npm files field


<!-- v3 -->


## v3.0.14 (2023-07-22)

### :bug: Bug Fix
* `core`
  * [#1334](https://github.com/sebnitu/vrembem/pull/1334) Fix transition bug when child elements transition event bubbles


## v3.0.13 (2023-07-11)

### :hammer: Chore
* Dependency bumps
* [#1193](https://github.com/sebnitu/vrembem/pull/1193) Remove the coveralls dependency


## v3.0.12 (2023-01-02)

### :hammer: Chore
* [#1080](https://github.com/sebnitu/vrembem/pull/1080) Bump to current year


## v3.0.11 (2022-12-20)

### :bug: Bug Fix
* `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#1075](https://github.com/sebnitu/vrembem/pull/1075) Remove touchend events from modal and drawer click handling


## v3.0.10 (2022-07-10)

### :bug: Bug Fix
* `core`
  * [#943](https://github.com/sebnitu/vrembem/pull/943) Add core root.scss to the NPM files field


## v3.0.9 (2022-07-10)

### :bug: Bug Fix
* `core`, `vrembem`
  * [#942](https://github.com/sebnitu/vrembem/pull/942) Fix core Sass module order and move root manifest


## v3.0.8 (2022-05-01)

### :house: Refactor
* `core`, `drawer`, `modal`
  * [#895](https://github.com/sebnitu/vrembem/pull/895) Remove the use of proxies in favor of modules


## v3.0.7 (2022-04-28)

### :hammer: Chore
* `core`
  * [#894](https://github.com/sebnitu/vrembem/pull/894) Remove console log


## v3.0.6 (2022-04-28)

### :bug: Bug Fix
* `core`, `drawer`
  * [#893](https://github.com/sebnitu/vrembem/pull/893) Fix support for proxy polyfill and available traps


## v3.0.5 (2022-04-22)

### :house: Refactor
* `base`, `card`, `core`, `dialog`, `drawer`, `modal`, `notice`, `popover`, `table`, `utility`
  * [#890](https://github.com/sebnitu/vrembem/pull/890) Refactor core module, theme variables and removal of unused functions and mixins
* `popover`
  * [#888](https://github.com/sebnitu/vrembem/pull/888) Refactor custom properties output in popover component

### :books: Documentation
* `drawer`, `grid`, `input`, `modal`, `popover`, `utility`
  * [#889](https://github.com/sebnitu/vrembem/pull/889) Update example templates


## v3.0.4 (2022-04-21)

### :bug: Bug Fix
* `popover`
  * [#886](https://github.com/sebnitu/vrembem/pull/886) Fix missing aria-describedby check in close and handler functions


## v3.0.3 (2022-04-21)

### :bug: Bug Fix
* `drawer`
  * [#884](https://github.com/sebnitu/vrembem/pull/884) Fix drawer class variables default

### :house: Refactor
* `core`, `drawer`, `popover`, `vrembem`
  * [#883](https://github.com/sebnitu/vrembem/pull/883) Update custom property output methodology

### :books: Documentation
* [#885](https://github.com/sebnitu/vrembem/pull/885) Update docs css dir to scss


## v3.0.2 (2022-04-21)

### :house: Refactor
* `checkbox`, `core`, `drawer`, `modal`, `popover`
  * [#881](https://github.com/sebnitu/vrembem/pull/881) Rename css directories to scss

### :hammer: Chore
* [#882](https://github.com/sebnitu/vrembem/pull/882) Run build on push to main branch


## v3.0.1 (2022-04-21)

### :bug: Bug Fix
* `core`, `drawer`, `popover`
  * [#880](https://github.com/sebnitu/vrembem/pull/880) Trim custom property values and create getPrefix module


## v3.0.0 (2022-04-06)

### :tada: New Feature
* `core`, `drawer`, `modal`, `popover`
  * [#866](https://github.com/sebnitu/vrembem/pull/866) Refactor and improve the drawer JS module
    * Better alignment of drawer component with the BEM methodology. Specifically in regards to required structure elements who's naming implies them being elements of the drawer block, they're now their own class definitions. These classes can now also be customized using the `$class-frame` and `$class-main` variables.
    * `Breakpoint` has been refactored and made into a core module. This module creates and tracks a media query list object and runs a passed handler anytime the match property changes.
    * `FocusTrap` has been refactored and has a more coherent API. This module creates and handles focus trap implementations.
    * You can now pass custom configurations to a specific drawer using the `data-drawer-config` data attribute. Takes a JSON object as its value.
    * Drawer local storage feature has been refactored and now uses the new `localStore` module which handles creating and updating a `localStorage` object using a proxy that is tracked as a global drawer property.
    * Refactored and now shared `updateGlobalState` module that handles setting overflow and inert states.
    * Styles for drawers have been updated to now slide in from the left by default. To switch positioning to the right of the viewport, apply the `drawer_switch` modifier. This replaced the use of `drawer_pos_[key]` modifiers. Non-positioned drawers are no longer supported.
    * Added support for multi-attribute triggers with space separated ID lists as the value. This allows for better management of multi-drawer apps/websites that open from the same side.
    * Better handling of initial state of drawers.
    * Better handling of focus management. Each drawer trigger is now tracked on a per-drawer basis.
    * Drawer mode is now handled using the collection entry API `entry.mode` property to more easily track and switch drawer modes between `'inline'` and `'modal'`.

### :fire: Breaking Changes
* `core`, `drawer`, `modal`, `popover`
  * [#866](https://github.com/sebnitu/vrembem/pull/866) Refactor and improve the drawer JS module
    * **Class changes**
      * `drawer__wrapper` => `drawer-frame`
      * `drawer__main` => `drawer-main`
      * `drawer_pos_left` => deprecated: Drawers are now positioned left by default.
      * `drawer_pos_right` => `drawer_switch`
    * **CSS variable changes**
      * `$wrapper-height: 100%;` => `$frame-height: 100vh;`
    * **Option changes**
      * `dataDrawer` => `selectorDrawer`: Takes a valid CSS selector string.
      * `dataDialog` => `selectorDialog`: Takes a valid CSS selector string.
      * `dataFocus` => `selectorFocus`: Takes a valid CSS selector string (defaults to`[data-focus]`).
      * `stateSave` => `store`
      * `stateKey` => `storeKey`: Default value has been changed from `'DrawerState'` => `'VB:DrawerState'`
    * **API changes**
      * `setTabindex()` => deprecated. Tabindex is now managed on drawer registration.
      * `stateSet()` => deprecated
      * `stateSave()` => deprecated
      * `stateClear()` => deprecated
      * `switchToDefault()` => deprecated
      * `switchToModal()` => deprecated
    * **Events**
      * `drawer:toDefault` and `drawer:toModal` events have been deprecated in favor of `drawer:switchMode` which is emitted whenever a drawer's mode changes. To check the mode state, use `event.target` and check for the `drawer_modal` class, or get the collection entry and check `entry.mode` property for current state.


<!-- v2 -->


## v2.0.0 (2022-03-17)

### :tada: New Feature
* `core`, `drawer`, `modal`, `popover`
  * [#853](https://github.com/sebnitu/vrembem/pull/853) Refactor and improve the modal JS module
    * Modal stacking: multiple modals can now be open at the same time. Use `data-modal-replace` trigger or `modal.replace()` method for support of close to open functionality between modals.
    * Teleport: moveModal has been removed in favor of a teleport and teleportReturn API that are now attached to each collection entries modal object.
    * Better handling of accessibility attributes for modals (`role` and `aria-modal`).
    * Better handling of modal specific configurations.
    * Better handling of modal initial and document global states.

### :fire: Breaking Changes
* `core`, `drawer`, `modal`, `popover`
  * [#853](https://github.com/sebnitu/vrembem/pull/853) Refactor and improve the modal JS module
    * Modals now require an `id` attribute instead of the `data-modal` data attribute. The dialog data attribute `data-modal-dialog` has also been deprecated and is no longer required.
    * **Option changes**
      * `moveModals.ref` => `teleport`: Takes a valid CSS selector string.
      * `moveModals.type` => `teleportMethod`: Method options include `'after'`, `'before'`, `'append'` and `'prepend'`.
      * `dataModal` => `selectorModal`: Takes a valid CSS selector string.
      * `dataDialog` => `selectorDialog`: Takes a valid CSS selector string.
      * `dataRequired` => `selectorRequired`: Takes a valid CSS selector string.
      * `dataFocus` => `selectorFocus`: Takes a valid CSS selector string (defaults to`[data-focus]`).


<!-- v1 -->


## v1.42.1 (2022-03-09)

### :tada: New Feature
* `modal`
  * [#857](https://github.com/sebnitu/vrembem/pull/857) Allow configuring a modal on a per-modal basis


## v1.42.0 (2022-02-25)

### :tada: New Feature
* `popover`
  * [#852](https://github.com/sebnitu/vrembem/pull/852) Accessible popover tooltip support using aria-describedby

### :books: Documentation
* [#850](https://github.com/sebnitu/vrembem/pull/850) Update docs popover implementation


## v1.41.0 (2022-02-25)

### :tada: New Feature
* `popover`
  * [#838](https://github.com/sebnitu/vrembem/pull/838) Further refactor Popover JS module and improve a11y

### :hammer: Chore
* [#849](https://github.com/sebnitu/vrembem/pull/849) Add lint, test and coveralls to deploy workflow
* [#845](https://github.com/sebnitu/vrembem/pull/845) Refactor gh-actions and add new deploy flow


## v1.40.3 (2022-02-25)

### :bug: Bug Fix
* `drawer`
  * [#844](https://github.com/sebnitu/vrembem/pull/844) Add IE11 mediaQueryList event listener support


## v1.40.2 (2022-02-21)

### :house: Refactor
* `checkbox`, `core`, `drawer`, `modal`, `popover`
  * [#832](https://github.com/sebnitu/vrembem/pull/832) Refactor JS modules


## v1.40.1 (2022-02-18)

### :bug: Bug Fix
* `core`, `drawer`
  * [#831](https://github.com/sebnitu/vrembem/pull/831) Add option to disable core root output and update docs for drawer breakpoints


## v1.40.0 (2022-02-18)

### :tada: New Feature
* `popover`
  * [#830](https://github.com/sebnitu/vrembem/pull/830) Add trigger memory support for popover component


## v1.39.0 (2022-02-16)

### :tada: New Feature
* `core`, `drawer`, `popover`
  * [#815](https://github.com/sebnitu/vrembem/pull/815) Use custom properties for sharing values between CSS and JavaScript

### :hammer: Chore
* [#824](https://github.com/sebnitu/vrembem/pull/824) Bump node js to the most current version
* [#822](https://github.com/sebnitu/vrembem/pull/822) Update github workflows build node versions to match tool-version


## v1.38.0 (2022-02-05)

### :tada: New Feature
* `popover`, `tooltip`, `vrembem`
  * [#788](https://github.com/sebnitu/vrembem/pull/788) Merge tooltip into the popover component as a modifier


## v1.37.0 (2021-11-29)

### :tada: New Feature
* `drawer`, `modal`
  * [#771](https://github.com/sebnitu/vrembem/pull/771) Attach a components module to custom events detail
* `core`
  * [#770](https://github.com/sebnitu/vrembem/pull/770) Add refresh functionality to the focus trap module


## v1.36.1 (2021-09-25)

### :house: Refactor
* `core`
  * [#713](https://github.com/sebnitu/vrembem/pull/713) Move focusable selectors into array and join when needed


## v1.36.0 (2021-07-29)

### :tada: New Feature
* `grid`, `level`
  * [#684](https://github.com/sebnitu/vrembem/pull/684) Add new level nowrap modifier


## v1.35.2 (2021-07-29)

### :bug: Bug Fix
* `level`
  * [#683](https://github.com/sebnitu/vrembem/pull/683) Fix max-width for children elements of the level component


## v1.35.1 (2021-07-27)

### :house: Refactor
* `modal`
  * [#681](https://github.com/sebnitu/vrembem/pull/681) Update modal size scale to more usable values


## v1.35.0 (2021-07-27)

### :tada: New Feature
* `modal`
  * [#680](https://github.com/sebnitu/vrembem/pull/680) Add more size modifiers to modal component


## v1.34.2 (2021-07-19)

### :house: Refactor
* `button`, `icon-action`, `input`
  * [#668](https://github.com/sebnitu/vrembem/pull/668) Use box-shadows instead of outline on form control components


## v1.34.1 (2021-07-15)

### :house: Refactor
* `button`, `icon-action`
  * [#667](https://github.com/sebnitu/vrembem/pull/667) Update the subtle button and icon-action styles


## v1.34.0 (2021-07-15)

### :tada: New Feature
* `button`, `checkbox`, `core`, `icon-action`, `input`, `radio`, `switch`
  * [#665](https://github.com/sebnitu/vrembem/pull/665) Improve focus states and internal variant generation logic on form-control components

### :house: Refactor
* `popover`
  * [#666](https://github.com/sebnitu/vrembem/pull/666) Update popover arrow size default and fix missing docs argument


## v1.33.2 (2021-07-13)

### :tada: New Feature
* `base`, `button`, `checkbox`, `core`, `icon-action`, `menu`, `radio`, `switch`
  * [#664](https://github.com/sebnitu/vrembem/pull/664) Improve focus and focus-visible styles of form-control components


## v1.33.1 (2021-07-12)

### :house: Refactor
* `button`, `icon-action`
  * [#660](https://github.com/sebnitu/vrembem/pull/660) Update button and icon-action styles and deprecate `button_outline_[value]` modifier


## v1.33.0 (2021-07-10)

### :tada: New Feature
* `button`
  * [#657](https://github.com/sebnitu/vrembem/pull/657) Add new state modifier to button component
* `utility`
  * [#656](https://github.com/sebnitu/vrembem/pull/656) Add the position module to utilities


## v1.32.2 (2021-06-27)

### :hammer: Chore
* `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `popover`, `radio`, `section`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#642](https://github.com/sebnitu/vrembem/pull/642) Add homepage value to package json files


## v1.32.1 (2021-06-26)

### :bug: Bug Fix
* `dialog`, `drawer`, `modal`
  * [#640](https://github.com/sebnitu/vrembem/pull/640) Change zindex variable names to z-index

### :books: Documentation
* `drawer`, `modal`
  * [#641](https://github.com/sebnitu/vrembem/pull/641) Update modal and drawer docs to include missing JS API parameter docs


## v1.32.0 (2021-06-26)

### :fire: Breaking Changes
* `base`, `core`, `dropdown`, `popover`, `vrembem`
  * [#614](https://github.com/sebnitu/vrembem/pull/614) Refactor dropdown component, rename to popover and implement popper js

### :tada: New Feature
* `base`, `core`, `dropdown`, `popover`, `vrembem`
  * [#614](https://github.com/sebnitu/vrembem/pull/614) Refactor dropdown component, rename to popover and implement popper js


## v1.31.2 (2021-06-14)

### :bug: Bug Fix
* `menu`
  * [#624](https://github.com/sebnitu/vrembem/pull/624) Fix menu text element overflow bug

### :books: Documentation
* `drawer`, `grid`, `input`, `modal`, `utility`, `vrembem`
  * [5be1181](https://github.com/sebnitu/vrembem/commit/5be1181eed118dda6dbfb9156095071febe27e0f) Remove extra `/` from favicon href in example files


## v1.31.1 (2021-06-12)

### :bug: Bug Fix
* `menu`
  * Run build and ensure correct assets are being used in unpkg source

### :house: Refactor
* `drawer`, `modal`
  * [#621](https://github.com/sebnitu/vrembem/pull/621) Use KeyboardEvent.key instead of the deprecated KeyboardEvent.keyCode


## v1.31.0 (2021-06-01)

### :fire: Breaking Changes
* `menu`
  * [#607](https://github.com/sebnitu/vrembem/pull/607) Audit and refactor menu component
    * Menu now stacks as the default styles and removes the `menu_stack_[value]` modifier
    * Adds the new `menu_inline_[value]` modifier for making a menu inline (horizontal styles)
    * Adds new `menu_size_[value]` modifier and matches sizing scale to other form-control components
    * Refactors, renames and deprecates a number of menu variables

### :house: Refactor
* `menu`
  * [#607](https://github.com/sebnitu/vrembem/pull/607) Audit and refactor menu component

### :books: Documentation
* `input`
  * [#613](https://github.com/sebnitu/vrembem/pull/613) Add missing mixin documentation for input component


## v1.30.1 (2021-05-29)

### :tada: New Feature
* `button`, `utility`
  * [#606](https://github.com/sebnitu/vrembem/pull/606) Add background-clip-[value] utilities and border-color-transparent


## v1.30.0 (2021-05-29)

### :tada: New Feature
* `modal`
  * [#602](https://github.com/sebnitu/vrembem/pull/602) Apply init/destroy EventListeners feature to modal component

### :bug: Bug Fix
* `core`, `drawer`, `modal`
  * [#603](https://github.com/sebnitu/vrembem/pull/603) Fix setTabindex from removing tabindex attributes when set to false

### :house: Refactor
* `button`, `icon-action`
  * [#604](https://github.com/sebnitu/vrembem/pull/604) Use the color module scale method instead of darken function
* `drawer`
  * [#605](https://github.com/sebnitu/vrembem/pull/605) Update MediaQueryList to use addEventListener instead of the deprecated addListener


## v1.29.0 (2021-05-28)

### :tada: New Feature
* `base`, `checkbox`, `radio`, `switch`
  * [#600](https://github.com/sebnitu/vrembem/pull/600) Add size modifiers to checkbox, radio and switch components
* `button`, `checkbox`, `core`, `input`, `menu`, `radio`, `switch`
  * [#599](https://github.com/sebnitu/vrembem/pull/599) Add form-control size variables to core that form-control components inherit


## v1.28.0 (2021-05-26)

### :house: Refactor
* `button`, `core`, `input`, `notice`
  * [#580](https://github.com/sebnitu/vrembem/pull/580) Audit and refactor the input and button components
* `core`
  * [#594](https://github.com/sebnitu/vrembem/pull/594) Migrate the use of slash to math.div
* `icon-action`, `notice`
  * [#590](https://github.com/sebnitu/vrembem/pull/590) Rename type modifier to state to be more accurate

### :books: Documentation
* `drawer`, `grid`, `modal`, `utility`, `vrembem`
  * [#595](https://github.com/sebnitu/vrembem/pull/595) Update example templates


## v1.27.0 (2021-05-23)

### :tada: New Feature
* `drawer`
  * [#587](https://github.com/sebnitu/vrembem/pull/587) Add ability to disable event listeners on init

### :books: Documentation
* `drawer`, `modal`
  * [#579](https://github.com/sebnitu/vrembem/pull/579) Add copy about tabindex -1 to modal and fix typos


## v1.26.0 (2021-05-10)

### :house: Refactor
* `icon-action`
  * [#574](https://github.com/sebnitu/vrembem/pull/574) Audit and refactor the icon-action component
* `table`
  * [#575](https://github.com/sebnitu/vrembem/pull/575) Audit and refactor the table component

### :books: Documentation
* `card`, `dialog`
  * [#573](https://github.com/sebnitu/vrembem/pull/573) Add README docs for dialog component
* `card`
  * [#572](https://github.com/sebnitu/vrembem/pull/572) Add README docs for card component
* `base`, `breadcrumb`, `button-group`, `button`, `checkbox`, `drawer`, `grid`, `icon`, `level`, `media`, `modal`, `notice`, `radio`, `section`, `switch`
  * [#571](https://github.com/sebnitu/vrembem/pull/571) Fix copy on shared table descriptions
* `switch`
  * [#556](https://github.com/sebnitu/vrembem/pull/556) Add README docs for switch component
* `checkbox`, `radio`
  * [#555](https://github.com/sebnitu/vrembem/pull/555) Add README docs for radio component


## v1.25.2 (2021-04-17)

### :books: Documentation
* `breadcrumb`
  * [#551](https://github.com/sebnitu/vrembem/pull/551) Add breadcrumb component README documentation


## v1.25.1 (2021-04-06)

### :books: Documentation
* `button`, `grid`, `media`, `notice`
  * [#544](https://github.com/sebnitu/vrembem/pull/544) Add button readme docs


## v1.25.0 (2021-03-14)

### :tada: New Feature
* `icon`
  * [#521](https://github.com/sebnitu/vrembem/pull/521) Add new icon size modifier

### :bug: Bug Fix
* `drawer`
  * [#524](https://github.com/sebnitu/vrembem/pull/524) Fix drawer initial state when local storage returns an empty object

### :books: Documentation
* `button-group`
  * [#522](https://github.com/sebnitu/vrembem/pull/522) Fix reference links in button-group docs


## v1.24.2 (2021-02-08)

### :hammer: Chore
* [#476](https://github.com/sebnitu/vrembem/pull/476) Update sink task
* [#478](https://github.com/sebnitu/vrembem/pull/478) chore: setup initial workflow build and remove travis config


## v1.24.1 (2020-10-23)

### :house: Refactor
* `section`
  * [#434](https://github.com/sebnitu/vrembem/pull/434) Audit and refactor section component


## v1.24.0 (2020-10-19)

### :tada: New Feature
* `container`, `utility`, `vrembem`
  * [#432](https://github.com/sebnitu/vrembem/pull/432) Deprecate container component in favor of new max-width and updated margin-auto utilities


## v1.23.0 (2020-09-26)

### :tada: New Feature
* `utility`
  * [#409](https://github.com/sebnitu/vrembem/pull/409) Add default direction variants for padding and margin utilities


## v1.22.3 (2020-09-23)

### :house: Refactor
* `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `container`, `core`, `dialog`, `drawer`, `dropdown`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `radio`, `section`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#401](https://github.com/sebnitu/vrembem/pull/401) Add microbundle to output more optimal bundles


## v1.22.2 (2020-09-14)

### :house: Refactor
* `checkbox`, `core`, `drawer`, `modal`, `vrembem`
  * [#394](https://github.com/sebnitu/vrembem/pull/394) Optimize bundles


## v1.22.1 (2020-09-13)

### :house: Refactor
* `checkbox`, `core`, `drawer`, `modal`, `vrembem`
  * [#393](https://github.com/sebnitu/vrembem/pull/393) Add esm bundle and update pkg module fields


## v1.22.0 (2020-09-12)

### :tada: New Feature
* `utility`, `vrembem`
  * [#391](https://github.com/sebnitu/vrembem/pull/391) Add more flexbox utilities


## v1.21.0 (2020-09-10)

### :tada: New Feature
* `core`, `utility`, `vrembem`
  * [#390](https://github.com/sebnitu/vrembem/pull/390) Split font properties into their own utility module


## v1.20.0 (2020-09-06)

### :bug: Bug Fix
* `level`, `vrembem`
  * [#379](https://github.com/sebnitu/vrembem/pull/379) Give level children max-width of 100% to fix overflow

### :house: Refactor
* `grid`, `utility`, `vrembem`
  * [#378](https://github.com/sebnitu/vrembem/pull/378) Move span to the grid component and refactor


## v1.19.0 (2020-09-05)

### :tada: New Feature
* `base`, `button-group`, `button`, `card`, `checkbox`, `core`, `grid`, `icon-action`, `level`, `media`, `menu`, `notice`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#370](https://github.com/sebnitu/vrembem/pull/370) Add new flex-gap and gap modules

### :house: Refactor
* `icon-action`, `notice`, `vrembem`
  * [#377](https://github.com/sebnitu/vrembem/pull/377) Refactored notice component to remove unneeded complexity


## v1.18.2 (2020-09-03)

### :tada: New Feature
* `core`
  * [#372](https://github.com/sebnitu/vrembem/pull/372) Add new gap mixin to core


## v1.18.1 (2020-09-03)

### :tada: New Feature
* `core`
  * [#371](https://github.com/sebnitu/vrembem/pull/371) Add the new gap and gap-map variables to core


## v1.18.0 (2020-08-31)

### :tada: New Feature
* `base`, `button`, `card`, `core`, `dialog`, `dropdown`, `icon-action`, `input`, `notice`, `table`, `utility`, `vrembem`
  * [#364](https://github.com/sebnitu/vrembem/pull/364) Add new heading-scale variable map and heading-levels mixin

### :house: Refactor
* `base`, `core`, `utility`
  * [#364](https://github.com/sebnitu/vrembem/pull/364) Also includes the following changes:
    * Remove the text-lead utility.
    * Adds better variable overrides to the base component.
    * Fix core line-height variable values.
    * Fix core padding-lg variable values.


## v1.17.0 (2020-08-28)

### :tada: New Feature
* `level`, `vrembem`
  * [#361](https://github.com/sebnitu/vrembem/pull/361) Add sibling selector to zero out top margins for level components
  * [#352](https://github.com/sebnitu/vrembem/pull/352) Add new x-gap and y-gap level modifiers
* `media`, `vrembem`
  * [#355](https://github.com/sebnitu/vrembem/pull/355) Add gap-x and gap-y modifiers to the media component
* `grid`, `level`, `vrembem`
  * [#354](https://github.com/sebnitu/vrembem/pull/354) Add gap-x and gap-y modifiers to grid component

### :bug: Bug Fix
* `base`, `vrembem`
  * [#358](https://github.com/sebnitu/vrembem/pull/358) Add better li element margins

### :house: Refactor
* `button-group`, `grid`, `media`, `vrembem`
  * [#362](https://github.com/sebnitu/vrembem/pull/362) Refactor the button-group component
* `notice`, `utility`, `vrembem`
  * [#359](https://github.com/sebnitu/vrembem/pull/359) Change hori and vert padding/margin class names to x/y
* `media`, `vrembem`
  * [#355](https://github.com/sebnitu/vrembem/pull/355) Add gap-x and gap-y modifiers to the media component
* `grid`, `vrembem`
  * [#353](https://github.com/sebnitu/vrembem/pull/353) Refactor grid component break modifier to stack for library consistency


## v1.16.0 (2020-08-26)

### :tada: New Feature
* `utility`, `vrembem`
  * [#351](https://github.com/sebnitu/vrembem/pull/351) Add specific side application utilities for radius


## v1.15.5 (2020-08-24)

### :house: Refactor
* `core`, `modal`, `vrembem`
  * [#339](https://github.com/sebnitu/vrembem/pull/339) Change the order or args in moveElement module


## v1.15.4 (2020-08-23)

### :house: Refactor
* `arrow`, `base`, `notice`, `vrembem`
  * [#338](https://github.com/sebnitu/vrembem/pull/338) Merge arrow component as a base module


## v1.15.3 (2020-08-22)

### :house: Refactor
* `panel`, `vrembem`
  * [#336](https://github.com/sebnitu/vrembem/pull/336) Deprecate the panel component


## v1.15.2 (2020-08-22)

### :tada: New Feature
* `base`, `core`, `grid`, `media`, `notice`, `utility`, `vrembem`
  * [#335](https://github.com/sebnitu/vrembem/pull/335) Add ability to pass map key to spacing mixin and update spacing map units from rem to em


## 1.15.1 (2020-08-20)

### :tada: New Feature
* `base`, `drawer`, `modal`, `notice`, `vrembem`
  * [#331](https://github.com/sebnitu/vrembem/pull/331) Add @vrembem/core to vrembem forwards

### :books: Documentation
* Other
  * [#328](https://github.com/sebnitu/vrembem/pull/328) Add roadmap
* `checkbox`, `drawer`, `modal`
  * [#323](https://github.com/sebnitu/vrembem/pull/323) Fix autoInit description typo in docs


## v1.15.0 (2020-08-16)

### :tada: New Feature
* `media`, `vrembem`
  * [#321](https://github.com/sebnitu/vrembem/pull/321) Add improved styles for combined media modifiers 

### :bug: Bug Fix
* `core`, `drawer`, `modal`, `vrembem`
  * [#322](https://github.com/sebnitu/vrembem/pull/322) Add inner item check before storing and returning scroll position 

### :house: Refactor
* `checkbox`, `core`, `drawer`, `modal`, `vrembem`
  * [#320](https://github.com/sebnitu/vrembem/pull/320) Modular component scripts 

### :books: Documentation
* `core`, `drawer`, `modal`, `vrembem`
  * [#322](https://github.com/sebnitu/vrembem/pull/322) Improve styles on documentation website 


## v1.14.9 (2020-08-15)

### :bug: Bug Fix
* `modal`, `vrembem`
  * [#319](https://github.com/sebnitu/vrembem/pull/319) Change the order of methods run on init 


## v1.14.8 (2020-08-13)

### :bug: Bug Fix
* `checkbox`, `core`, `drawer`, `modal`, `vrembem`
  * [#312](https://github.com/sebnitu/vrembem/pull/312) Update package entries and bundle output 


## v1.14.7 (2020-08-12)

### :bug: Bug Fix
* `modal`, `vrembem`
  * [#308](https://github.com/sebnitu/vrembem/pull/308) Retain scroll position when getFocusable is called 


## v1.14.6 (2020-08-11)

### :bug: Bug Fix
* `checkbox`, `drawer`, `modal`, `vrembem`
  * [#302](https://github.com/sebnitu/vrembem/pull/302) Refactor constructors 


## v1.14.5 (2020-08-11)

### :bug: Bug Fix
* `core`, `drawer`, `modal`, `vrembem`
  * [#301](https://github.com/sebnitu/vrembem/pull/301) Add main field to core package.json 


## v1.14.4 (2020-08-09)

### :house: Refactor
* `dismissible`, `vrembem`
  * [#295](https://github.com/sebnitu/vrembem/pull/295) Deprecate the dismissible component 


## v1.14.3 (2020-08-09)

### :bug: Bug Fix
* `checkbox`, `dismissible`, `drawer`, `modal`
  * [#294](https://github.com/sebnitu/vrembem/pull/294) Use consistent namespace for iife bundles 


## v1.14.2 (2020-08-09)

### :bug: Bug Fix
* `checkbox`, `core`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#293](https://github.com/sebnitu/vrembem/pull/293) Fix package exports and bundles 


## v1.14.1 (2020-08-07)

### :bug: Bug Fix
* `drawer`, `modal`, `vrembem`
  * [#292](https://github.com/sebnitu/vrembem/pull/292) Add touch event for modal screen 


## v1.14.0 (2020-08-07)

### :tada: New Feature
* `drawer`, `modal`, `vrembem`
  * [#290](https://github.com/sebnitu/vrembem/pull/290) Improve accessibility for drawer component in modal drawer state 
* `modal`, `vrembem`
  * [#289](https://github.com/sebnitu/vrembem/pull/289) Improve modal component error handling 
* `dialog`, `vrembem`
  * [#288](https://github.com/sebnitu/vrembem/pull/288) Add spacing for children of header and footer dialog elements 


## v1.13.1 (2020-08-02)

### :bug: Bug Fix
* `modal`, `vrembem`
  * [#280](https://github.com/sebnitu/vrembem/pull/280) Fix modal hidden focusable bug 


## v1.13.0 (2020-08-01)

### :tada: New Feature
* `modal`, `vrembem`
  * [#279](https://github.com/sebnitu/vrembem/pull/279) Add modal focus trap feature 


## v1.12.0 (2020-07-29)

### :tada: New Feature
* `utility`, `vrembem`
  * [#270](https://github.com/sebnitu/vrembem/pull/270) Adds left and right margin-auto utility classes 


## v1.11.0 (2020-07-26)

### :tada: New Feature
* `utility`
  * [#267](https://github.com/sebnitu/vrembem/pull/267) Add output vars to utility component 


## v1.10.0 (2020-07-25)

### :tada: New Feature
* `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `dropdown`, `icon-action`, `input`, `menu`, `modal`, `notice`, `panel`, `radio`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#265](https://github.com/sebnitu/vrembem/pull/265) Add output variables to better control base output 


## v1.9.0 (2020-07-21)

### :tada: New Feature
* `drawer`, `vrembem`
  * [#262](https://github.com/sebnitu/vrembem/pull/262) Add data drawer open 


## v1.8.4 (2020-07-17)

### :books: Documentation
* [#249](https://github.com/sebnitu/vrembem/pull/249) Improve root README with CDN usage documentation 

### :tada: New Feature
* `modal`, `vrembem`
  * [#255](https://github.com/sebnitu/vrembem/pull/255) Improve modal component by adding toggleOverflow and transition options 


## v1.8.3 (2020-07-12)

### :white_check_mark: Testing
* `checkbox`, `core`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#242](https://github.com/sebnitu/vrembem/pull/242) Improve test coverage 


## v1.8.2 (2020-07-07)

### :house: Refactor
* `drawer`, `vrembem`
  * [#238](https://github.com/sebnitu/vrembem/pull/238) Refactor drawer breakpoint methods 


## v1.8.1 (2020-07-05)

### :books: Documentation
* `vrembem`
  * [#234](https://github.com/sebnitu/vrembem/pull/234) Add scroll-stash to docs and cleanup imports 


## v1.8.0 (2020-06-27)

### :tada: New Feature
* `drawer`, `vrembem`
  * [#228](https://github.com/sebnitu/vrembem/pull/228) Add width and max-width variables to Drawer component 


## v1.7.3 (2020-06-21)

### :bug: Bug Fix
* `menu`, `vrembem`
  * [#211](https://github.com/sebnitu/vrembem/pull/211) Remove relative positioning from menu items 

### :house: Refactor
* `arrow`, `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `container`, `core`, `dialog`, `dismissible`, `drawer`, `dropdown`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `panel`, `radio`, `section`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#207](https://github.com/sebnitu/vrembem/pull/207) Update deprecated rollup plugins 


## v1.7.2 (2020-06-16)

### :tada: New Feature
* `checkbox`, `core`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#206](https://github.com/sebnitu/vrembem/pull/206) New drawer breakpoint API and custom events 


## v1.7.1 (2020-06-14)

### :house: Refactor
* `grid`, `utility`
  * [#201](https://github.com/sebnitu/vrembem/pull/201) Add readme docs 
  * [6d959b6](https://github.com/sebnitu/vrembem/commit/6d959b629de5fec7c5cab87c56a4057b3cd33f3b) imp: remove redundant prefix vars from utility 
  * [3739fb4](https://github.com/sebnitu/vrembem/commit/3739fb46d041d40460aa9b2d9794a29d8a96e81f) imp: add optional corner variants to radius utility and update docs 

### :books: Documentation
* `grid`, `table`, `utility`, `vrembem`
  * [#201](https://github.com/sebnitu/vrembem/pull/201) Add readme docs 


## v1.7.0 (2020-06-13)

### :fire: Breaking Changes
* `dismissible`, `span`, `utility`, `vrembem`
  * [#200](https://github.com/sebnitu/vrembem/pull/200) Convert span to a utility and remove span package 
* `base`, `dismissible`, `dropdown`, `menu`, `notice`, `span`, `utility`, `vrembem`
  * [#199](https://github.com/sebnitu/vrembem/pull/199) Remove utility naming convention from utility classes 

### :house: Refactor
* `dismissible`, `span`, `utility`, `vrembem`
  * [#200](https://github.com/sebnitu/vrembem/pull/200) Convert span to a utility and remove span package 
* `base`, `dismissible`, `dropdown`, `menu`, `notice`, `span`, `utility`, `vrembem`
  * [#199](https://github.com/sebnitu/vrembem/pull/199) Remove utility naming convention from utility classes 


## v1.6.0 (2020-06-12)

### :fire: Breaking Changes
* `checkbox`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#196](https://github.com/sebnitu/vrembem/pull/196) Add drawer and modal custom events 

### :tada: New Feature
* `checkbox`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#196](https://github.com/sebnitu/vrembem/pull/196) Add drawer and modal custom events 

### :bug: Bug Fix
* `input`, `vrembem`
  * [#195](https://github.com/sebnitu/vrembem/pull/195) fix: add appearance none to root input component 


## v1.5.4 (2020-06-10)

### :books: Documentation
* Other
  * [#194](https://github.com/sebnitu/vrembem/pull/194) Improve UX of docs drawer menu 
* `core`, `drawer`, `vrembem`
  * [#191](https://github.com/sebnitu/vrembem/pull/191) Update documentation for drawer component 

### :bug: Bug Fix
* `core`, `drawer`, `vrembem`
  * [#189](https://github.com/sebnitu/vrembem/pull/189) Use the same variable name for breakpoints in both Sass and JS 

### :house: Refactor
* `table`, `vrembem`
  * [#193](https://github.com/sebnitu/vrembem/pull/193) Make mobile-label styles less heavy 


## v1.5.3 (2020-06-08)

### :books: Documentation
* `arrow`, `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `container`, `core`, `dialog`, `dismissible`, `drawer`, `dropdown`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `panel`, `radio`, `section`, `span`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#185](https://github.com/sebnitu/vrembem/pull/185) Add links between readme and web documentation 


## v1.5.2 (2020-06-07)

### :bug: Bug Fix
* `vrembem`
  * [#184](https://github.com/sebnitu/vrembem/pull/184) Fix repository directory value 


## v1.5.1 (2020-06-07)

### :books: Documentation
* [#176](https://github.com/sebnitu/vrembem/pull/176) Add changelog 

### :tada: New Feature
* `core`, `table`, `vrembem`
  * [#177](https://github.com/sebnitu/vrembem/pull/177) Add responsive table modifier 

### :house: Refactor
* `button-group`, `button`, `core`, `grid`, `media`, `menu`, `span`, `table`, `utility`, `vrembem`
  * [#182](https://github.com/sebnitu/vrembem/pull/182) Make component breakpoints override-able on a per component basis  

### :house: Refactor
* `core`
  * [#181](https://github.com/sebnitu/vrembem/pull/181) Core functions to use built-in modules 
* `base`, `button-group`, `button`, `card`, `checkbox`, `core`, `grid`, `icon-action`, `media`, `menu`, `radio`, `section`, `span`, `switch`, `table`, `utility`, `vrembem`
  * [#180](https://github.com/sebnitu/vrembem/pull/180) Use sass:map in core mixins 


## v1.5.0 (2020-06-06)

### :tada: New Feature
* `arrow`, `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `container`, `core`, `dialog`, `drawer`, `dropdown`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `panel`, `radio`, `section`, `span`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#173](https://github.com/sebnitu/vrembem/pull/173) Add custom prefix support to BEM class naming 


## v1.4.0 (2020-06-01)

### :tada: New Feature
* `button-group`, `vrembem`
  * [#167](https://github.com/sebnitu/vrembem/pull/167) Add breakpoint modifiers to button-group component and more other improvements  
