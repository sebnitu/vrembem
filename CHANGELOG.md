# Changelog

This document logs all notable changes to the Vrembem project.

__Tags:__

- :fire: `breaking:` Breaking Changes
- :tada: `feat:` New Feature
- :bug: `fix:` Bug Fix
- :white_check_mark: `test:` Testing
- :books: `docs:` Documentation
- :hammer: `chore:` Chore
- :house: `refactor:` Refactor

<!--
Commit template:
chore(release): add v1.25.0 to CHANGELOG.md
-->
<!-- ADD-NEW-CHANGELOG-HERE -->

## v1.25.0 (2021-03-14)

#### :tada: New Feature
* `icon`
  * [#521](https://github.com/sebnitu/vrembem/pull/521) Add new icon size modifier

#### :bug: Bug Fix
* `drawer`
  * [#524](https://github.com/sebnitu/vrembem/pull/524) Fix drawer initial state when local storage returns an empty object

#### :books: Documentation
* `button-group`
  * [#522](https://github.com/sebnitu/vrembem/pull/522) Fix reference links in button-group docs


## v1.24.2 (2021-02-08)

#### :hammer: Chore
* [#476](https://github.com/sebnitu/vrembem/pull/476) Update sink task
* [#478](https://github.com/sebnitu/vrembem/pull/478) chore: setup initial workflow build and remove travis config


## v1.24.1 (2020-10-23)

#### :house: Refactor
* `section`
  * [#434](https://github.com/sebnitu/vrembem/pull/434) Audit and refactor section component


## v1.24.0 (2020-10-19)

#### :tada: New Feature
* `container`, `utility`, `vrembem`
  * [#432](https://github.com/sebnitu/vrembem/pull/432) Deprecate container component in favor of new max-width and updated margin-auto utilities


## v1.23.0 (2020-09-26)

#### :tada: New Feature
* `utility`
  * [#409](https://github.com/sebnitu/vrembem/pull/409) Add default direction variants for padding and margin utilities


## v1.22.3 (2020-09-23)

#### :house: Refactor
* `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `container`, `core`, `dialog`, `drawer`, `dropdown`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `radio`, `section`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#401](https://github.com/sebnitu/vrembem/pull/401) Add microbundle to output more optimal bundles


## v1.22.2 (2020-09-14)

#### :house: Refactor
* `checkbox`, `core`, `drawer`, `modal`, `vrembem`
  * [#394](https://github.com/sebnitu/vrembem/pull/394) Optimize bundles


## v1.22.1 (2020-09-13)

#### :house: Refactor
* `checkbox`, `core`, `drawer`, `modal`, `vrembem`
  * [#393](https://github.com/sebnitu/vrembem/pull/393) Add esm bundle and update pkg module fields


## v1.22.0 (2020-09-12)

#### :tada: New Feature
* `utility`, `vrembem`
  * [#391](https://github.com/sebnitu/vrembem/pull/391) Add more flexbox utilities


## v1.21.0 (2020-09-10)

#### :tada: New Feature
* `core`, `utility`, `vrembem`
  * [#390](https://github.com/sebnitu/vrembem/pull/390) Split font properties into their own utility module


## v1.20.0 (2020-09-06)

#### :bug: Bug Fix
* `level`, `vrembem`
  * [#379](https://github.com/sebnitu/vrembem/pull/379) Give level children max-width of 100% to fix overflow

#### :house: Refactor
* `grid`, `utility`, `vrembem`
  * [#378](https://github.com/sebnitu/vrembem/pull/378) Move span to the grid component and refactor


## v1.19.0 (2020-09-05)

#### :tada: New Feature
* `base`, `button-group`, `button`, `card`, `checkbox`, `core`, `grid`, `icon-action`, `level`, `media`, `menu`, `notice`, `radio`, `section`, `switch`, `table`, `utility`, `vrembem`
  * [#370](https://github.com/sebnitu/vrembem/pull/370) Add new flex-gap and gap modules

#### :house: Refactor
* `icon-action`, `notice`, `vrembem`
  * [#377](https://github.com/sebnitu/vrembem/pull/377) Refactored notice component to remove unneeded complexity


## v1.18.2 (2020-09-03)

#### :tada: New Feature
* `core`
  * [#372](https://github.com/sebnitu/vrembem/pull/372) Add new gap mixin to core


## v1.18.1 (2020-09-03)

#### :tada: New Feature
* `core`
  * [#371](https://github.com/sebnitu/vrembem/pull/371) Add the new gap and gap-map variables to core


## v1.18.0 (2020-08-31)

#### :tada: New Feature
* `base`, `button`, `card`, `core`, `dialog`, `dropdown`, `icon-action`, `input`, `notice`, `table`, `utility`, `vrembem`
  * [#364](https://github.com/sebnitu/vrembem/pull/364) Add new heading-scale variable map and heading-levels mixin

#### :house: Refactor
* `base`, `core`, `utility`
  * [#364](https://github.com/sebnitu/vrembem/pull/364) Also includes the following changes:
    * Remove the text-lead utility.
    * Adds better variable overrides to the base component.
    * Fix core line-height variable values.
    * Fix core padding-lg variable values.


## v1.17.0 (2020-08-28)

#### :tada: New Feature
* `level`, `vrembem`
  * [#361](https://github.com/sebnitu/vrembem/pull/361) Add sibling selector to zero out top margins for level components
  * [#352](https://github.com/sebnitu/vrembem/pull/352) Add new x-gap and y-gap level modifiers
* `media`, `vrembem`
  * [#355](https://github.com/sebnitu/vrembem/pull/355) Add gap-x and gap-y modifiers to the media component
* `grid`, `level`, `vrembem`
  * [#354](https://github.com/sebnitu/vrembem/pull/354) Add gap-x and gap-y modifiers to grid component

#### :bug: Bug Fix
* `base`, `vrembem`
  * [#358](https://github.com/sebnitu/vrembem/pull/358) Add better li element margins

#### :house: Refactor
* `button-group`, `grid`, `media`, `vrembem`
  * [#362](https://github.com/sebnitu/vrembem/pull/362) Refactor the button-group component
* `notice`, `utility`, `vrembem`
  * [#359](https://github.com/sebnitu/vrembem/pull/359) Change hori and vert padding/margin class names to x/y
* `media`, `vrembem`
  * [#355](https://github.com/sebnitu/vrembem/pull/355) Add gap-x and gap-y modifiers to the media component
* `grid`, `vrembem`
  * [#353](https://github.com/sebnitu/vrembem/pull/353) Refactor grid component break modifier to stack for library consistency


## v1.16.0 (2020-08-26)

#### :tada: New Feature
* `utility`, `vrembem`
  * [#351](https://github.com/sebnitu/vrembem/pull/351) Add specific side application utilities for radius


## v1.15.5 (2020-08-24)

#### :house: Refactor
* `core`, `modal`, `vrembem`
  * [#339](https://github.com/sebnitu/vrembem/pull/339) Change the order or args in moveElement module


## v1.15.4 (2020-08-23)

#### :house: Refactor
* `arrow`, `base`, `notice`, `vrembem`
  * [#338](https://github.com/sebnitu/vrembem/pull/338) Merge arrow component as a base module


## v1.15.3 (2020-08-22)

#### :house: Refactor
* `panel`, `vrembem`
  * [#336](https://github.com/sebnitu/vrembem/pull/336) Deprecate the panel component


## v1.15.2 (2020-08-22)

#### :tada: New Feature
* `base`, `core`, `grid`, `media`, `notice`, `utility`, `vrembem`
  * [#335](https://github.com/sebnitu/vrembem/pull/335) Add ability to pass map key to spacing mixin and update spacing map units from rem to em


## 1.15.1 (2020-08-20)

#### :tada: New Feature
* `base`, `drawer`, `modal`, `notice`, `vrembem`
  * [#331](https://github.com/sebnitu/vrembem/pull/331) Add @vrembem/core to vrembem forwards

#### :books: Documentation
* Other
  * [#328](https://github.com/sebnitu/vrembem/pull/328) Add roadmap
* `checkbox`, `drawer`, `modal`
  * [#323](https://github.com/sebnitu/vrembem/pull/323) Fix autoInit description typo in docs


## v1.15.0 (2020-08-16)

#### :tada: New Feature
* `media`, `vrembem`
  * [#321](https://github.com/sebnitu/vrembem/pull/321) Add improved styles for combined media modifiers 

#### :bug: Bug Fix
* `core`, `drawer`, `modal`, `vrembem`
  * [#322](https://github.com/sebnitu/vrembem/pull/322) Add inner item check before storing and returning scroll position 

#### :house: Refactor
* `checkbox`, `core`, `drawer`, `modal`, `vrembem`
  * [#320](https://github.com/sebnitu/vrembem/pull/320) Modular component scripts 

#### :books: Documentation
* `core`, `drawer`, `modal`, `vrembem`
  * [#322](https://github.com/sebnitu/vrembem/pull/322) Improve styles on documentation website 


## v1.14.9 (2020-08-15)

#### :bug: Bug Fix
* `modal`, `vrembem`
  * [#319](https://github.com/sebnitu/vrembem/pull/319) Change the order of methods run on init 


## v1.14.8 (2020-08-13)

#### :bug: Bug Fix
* `checkbox`, `core`, `drawer`, `modal`, `vrembem`
  * [#312](https://github.com/sebnitu/vrembem/pull/312) Update package entries and bundle output 


## v1.14.7 (2020-08-12)

#### :bug: Bug Fix
* `modal`, `vrembem`
  * [#308](https://github.com/sebnitu/vrembem/pull/308) Retain scroll position when getFocusable is called 


## v1.14.6 (2020-08-11)

#### :bug: Bug Fix
* `checkbox`, `drawer`, `modal`, `vrembem`
  * [#302](https://github.com/sebnitu/vrembem/pull/302) Refactor constructors 


## v1.14.5 (2020-08-11)

#### :bug: Bug Fix
* `core`, `drawer`, `modal`, `vrembem`
  * [#301](https://github.com/sebnitu/vrembem/pull/301) Add main field to core package.json 


## v1.14.4 (2020-08-09)

#### :house: Refactor
* `dismissible`, `vrembem`
  * [#295](https://github.com/sebnitu/vrembem/pull/295) Deprecate the dismissible component 


## v1.14.3 (2020-08-09)

#### :bug: Bug Fix
* `checkbox`, `dismissible`, `drawer`, `modal`
  * [#294](https://github.com/sebnitu/vrembem/pull/294) Use consistent namespace for iife bundles 


## v1.14.2 (2020-08-09)

#### :bug: Bug Fix
* `checkbox`, `core`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#293](https://github.com/sebnitu/vrembem/pull/293) Fix package exports and bundles 


## v1.14.1 (2020-08-07)

#### :bug: Bug Fix
* `drawer`, `modal`, `vrembem`
  * [#292](https://github.com/sebnitu/vrembem/pull/292) Add touch event for modal screen 


## v1.14.0 (2020-08-07)

#### :tada: New Feature
* `drawer`, `modal`, `vrembem`
  * [#290](https://github.com/sebnitu/vrembem/pull/290) Improve accessibility for drawer component in modal drawer state 
* `modal`, `vrembem`
  * [#289](https://github.com/sebnitu/vrembem/pull/289) Improve modal component error handling 
* `dialog`, `vrembem`
  * [#288](https://github.com/sebnitu/vrembem/pull/288) Add spacing for children of header and footer dialog elements 


## v1.13.1 (2020-08-02)

#### :bug: Bug Fix
* `modal`, `vrembem`
  * [#280](https://github.com/sebnitu/vrembem/pull/280) Fix modal hidden focusable bug 


## v1.13.0 (2020-08-01)

#### :tada: New Feature
* `modal`, `vrembem`
  * [#279](https://github.com/sebnitu/vrembem/pull/279) Add modal focus trap feature 


## v1.12.0 (2020-07-29)

#### :tada: New Feature
* `utility`, `vrembem`
  * [#270](https://github.com/sebnitu/vrembem/pull/270) Adds left and right margin-auto utility classes 


## v1.11.0 (2020-07-26)

#### :tada: New Feature
* `utility`
  * [#267](https://github.com/sebnitu/vrembem/pull/267) Add output vars to utility component 


## v1.10.0 (2020-07-25)

#### :tada: New Feature
* `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `core`, `dialog`, `drawer`, `dropdown`, `icon-action`, `input`, `menu`, `modal`, `notice`, `panel`, `radio`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#265](https://github.com/sebnitu/vrembem/pull/265) Add output variables to better control base output 


## v1.9.0 (2020-07-21)

#### :tada: New Feature
* `drawer`, `vrembem`
  * [#262](https://github.com/sebnitu/vrembem/pull/262) Add data drawer open 


## v1.8.4 (2020-07-17)

#### :books: Documentation
* [#249](https://github.com/sebnitu/vrembem/pull/249) Improve root README with CDN usage documentation 

#### :tada: New Feature
* `modal`, `vrembem`
  * [#255](https://github.com/sebnitu/vrembem/pull/255) Improve modal component by adding toggleOverflow and transition options 


## v1.8.3 (2020-07-12)

#### :white_check_mark: Testing
* `checkbox`, `core`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#242](https://github.com/sebnitu/vrembem/pull/242) Improve test coverage 


## v1.8.2 (2020-07-07)

#### :house: Refactor
* `drawer`, `vrembem`
  * [#238](https://github.com/sebnitu/vrembem/pull/238) Refactor drawer breakpoint methods 


## v1.8.1 (2020-07-05)

#### :books: Documentation
* `vrembem`
  * [#234](https://github.com/sebnitu/vrembem/pull/234) Add scroll-stash to docs and cleanup imports 


## v1.8.0 (2020-06-27)

#### :tada: New Feature
* `drawer`, `vrembem`
  * [#228](https://github.com/sebnitu/vrembem/pull/228) Add width and max-width variables to Drawer component 


## v1.7.3 (2020-06-21)

#### :bug: Bug Fix
* `menu`, `vrembem`
  * [#211](https://github.com/sebnitu/vrembem/pull/211) Remove relative positioning from menu items 

#### :house: Refactor
* `arrow`, `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `container`, `core`, `dialog`, `dismissible`, `drawer`, `dropdown`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `panel`, `radio`, `section`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#207](https://github.com/sebnitu/vrembem/pull/207) Update deprecated rollup plugins 


## v1.7.2 (2020-06-16)

#### :tada: New Feature
* `checkbox`, `core`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#206](https://github.com/sebnitu/vrembem/pull/206) New drawer breakpoint API and custom events 


## v1.7.1 (2020-06-14)

#### :house: Refactor
* `grid`, `utility`
  * [#201](https://github.com/sebnitu/vrembem/pull/201) Add readme docs 
  * [6d959b6](https://github.com/sebnitu/vrembem/commit/6d959b629de5fec7c5cab87c56a4057b3cd33f3b) imp: remove redundant prefix vars from utility 
  * [3739fb4](https://github.com/sebnitu/vrembem/commit/3739fb46d041d40460aa9b2d9794a29d8a96e81f) imp: add optional corner variants to radius utility and update docs 

#### :books: Documentation
* `grid`, `table`, `utility`, `vrembem`
  * [#201](https://github.com/sebnitu/vrembem/pull/201) Add readme docs 


## v1.7.0 (2020-06-13)

#### :fire: Breaking Changes
* `dismissible`, `span`, `utility`, `vrembem`
  * [#200](https://github.com/sebnitu/vrembem/pull/200) Convert span to a utlity and remove span package 
* `base`, `dismissible`, `dropdown`, `menu`, `notice`, `span`, `utility`, `vrembem`
  * [#199](https://github.com/sebnitu/vrembem/pull/199) Remove utility naming convention from utility classes 

#### :house: Refactor
* `dismissible`, `span`, `utility`, `vrembem`
  * [#200](https://github.com/sebnitu/vrembem/pull/200) Convert span to a utlity and remove span package 
* `base`, `dismissible`, `dropdown`, `menu`, `notice`, `span`, `utility`, `vrembem`
  * [#199](https://github.com/sebnitu/vrembem/pull/199) Remove utility naming convention from utility classes 


## v1.6.0 (2020-06-12)

#### :fire: Breaking Changes
* `checkbox`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#196](https://github.com/sebnitu/vrembem/pull/196) Add drawer and modal custom events 

#### :tada: New Feature
* `checkbox`, `dismissible`, `drawer`, `modal`, `vrembem`
  * [#196](https://github.com/sebnitu/vrembem/pull/196) Add drawer and modal custom events 

#### :bug: Bug Fix
* `input`, `vrembem`
  * [#195](https://github.com/sebnitu/vrembem/pull/195) fix: add appearance none to root input component 


## v1.5.4 (2020-06-10)

#### :books: Documentation
* Other
  * [#194](https://github.com/sebnitu/vrembem/pull/194) Improve UX of docs drawer menu 
* `core`, `drawer`, `vrembem`
  * [#191](https://github.com/sebnitu/vrembem/pull/191) Update documentation for drawer component 

#### :bug: Bug Fix
* `core`, `drawer`, `vrembem`
  * [#189](https://github.com/sebnitu/vrembem/pull/189) Use the same variable name for breakpoints in both Sass and JS 

#### :house: Refactor
* `table`, `vrembem`
  * [#193](https://github.com/sebnitu/vrembem/pull/193) Make mobile-label styles less heavy 


## v1.5.3 (2020-06-08)

#### :books: Documentation
* `arrow`, `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `container`, `core`, `dialog`, `dismissible`, `drawer`, `dropdown`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `panel`, `radio`, `section`, `span`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#185](https://github.com/sebnitu/vrembem/pull/185) Add links between readme and web documentation 


## v1.5.2 (2020-06-07)

#### :bug: Bug Fix
* `vrembem`
  * [#184](https://github.com/sebnitu/vrembem/pull/184) Fix repository directory value 


## v1.5.1 (2020-06-07)

#### :books: Documentation
* [#176](https://github.com/sebnitu/vrembem/pull/176) Add changelog 

#### :tada: New Feature
* `core`, `table`, `vrembem`
  * [#177](https://github.com/sebnitu/vrembem/pull/177) Add responsive table modifier 

#### :house: Refactor
* `button-group`, `button`, `core`, `grid`, `media`, `menu`, `span`, `table`, `utility`, `vrembem`
  * [#182](https://github.com/sebnitu/vrembem/pull/182) Make component breakpoints override-able on a per component basis  

#### :house: Refactor
* `core`
  * [#181](https://github.com/sebnitu/vrembem/pull/181) Core functions to use built-in modules 
* `base`, `button-group`, `button`, `card`, `checkbox`, `core`, `grid`, `icon-action`, `media`, `menu`, `radio`, `section`, `span`, `switch`, `table`, `utility`, `vrembem`
  * [#180](https://github.com/sebnitu/vrembem/pull/180) Use sass:map in core mixins 


## v1.5.0 (2020-06-06)

#### :tada: New Feature
* `arrow`, `base`, `breadcrumb`, `button-group`, `button`, `card`, `checkbox`, `container`, `core`, `dialog`, `drawer`, `dropdown`, `grid`, `icon-action`, `icon`, `input`, `level`, `media`, `menu`, `modal`, `notice`, `panel`, `radio`, `section`, `span`, `switch`, `table`, `tooltip`, `utility`, `vrembem`
  * [#173](https://github.com/sebnitu/vrembem/pull/173) Add custom prefix support to BEM class naming 


## v1.4.0 (2020-06-01)

#### :tada: New Feature
* `button-group`, `vrembem`
  * [#167](https://github.com/sebnitu/vrembem/pull/167) Add breakpoint modifiers to button-group component and more other improvements  
