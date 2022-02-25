# Changelog

All notable changes to this project will be documented in this file.

**Tags**

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools and libraries such as documentation generation

<!--
Release flow:
1. Run `npm run unreleased`
2. Update CHANGELOG with details from UNRELEASED and commit with msg:
  - `chore(release): add v1.1.2 to CHANGELOG.md`
3. Run npm version with option [<newversion> | major | minor | patch | from-git | ... ]
  - `npm version patch -m "chore(release): bump to v%s" && npm publish`
-->
<!-- ADD-NEW-CHANGELOG-ENTRY-HERE -->


## [1.1.2](https://github.com/sebnitu/scroll-stash/compare/v1.1.1...v1.1.2) (2021-06-14)

### Chore
* add npm ci to sink task and run build ([aa9b10f](https://github.com/sebnitu/scroll-stash/commit/aa9b10f))
* remove travis and add github build action (#260) ([c2cbeb7](https://github.com/sebnitu/scroll-stash/commit/c2cbeb7)), closes [#260](https://github.com/sebnitu/scroll-stash/issues/260)


## [1.1.1](https://github.com/sebnitu/scroll-stash/compare/v1.1.0...v1.1.1) (2020-09-14)

### Chore
* switch bundler from rollup to microbundle ([66fd68b](https://github.com/sebnitu/scroll-stash/commit/66fd68b))
* update babel config to produce correct output ([672219d](https://github.com/sebnitu/scroll-stash/commit/672219d))
* update docs pointing to new entries ([f51c23e](https://github.com/sebnitu/scroll-stash/commit/f51c23e))

### Refactor
* update handler ref to be private function ([28cdc92](https://github.com/sebnitu/scroll-stash/commit/28cdc92))


## [1.1.0](https://github.com/sebnitu/scroll-stash/compare/v1.0.13...v1.1.0) (2020-09-13)

### Chore
* add esm bundle and remove unused deps ([441a328](https://github.com/sebnitu/scroll-stash/commit/441a328))
* clean up rollup config ([e501fe9](https://github.com/sebnitu/scroll-stash/commit/e501fe9))
* run npm update to bump deps ([3bc6daa](https://github.com/sebnitu/scroll-stash/commit/3bc6daa))

### Refactor
* build in custom throttle and remove lodash dep ([1c1a2de](https://github.com/sebnitu/scroll-stash/commit/1c1a2de))
* move index into src ([58f9dde](https://github.com/sebnitu/scroll-stash/commit/58f9dde))


## [1.0.13](https://github.com/sebnitu/scroll-stash/compare/v1.0.12...v1.0.13) (2020-09-04)

### Refactor
* remove the vrembem camelcase dependency ([ce367ba](https://github.com/sebnitu/scroll-stash/commit/ce367ba))


## [1.0.12](https://github.com/sebnitu/scroll-stash/compare/v1.0.11...v1.0.12) (2020-08-13)

### Bug Fixes
* import es6 module directly for tree shaking ([7f16d69](https://github.com/sebnitu/scroll-stash/commit/7f16d69))
* move vrembem/core from devDeps to deps ([9aecb29](https://github.com/sebnitu/scroll-stash/commit/9aecb29))


## [1.0.11](https://github.com/sebnitu/scroll-stash/compare/v1.0.10...v1.0.11) (2020-08-15)

### Refactor
* update composition and entry file ([a909933](https://github.com/sebnitu/scroll-stash/commit/a909933))


## [1.0.10](https://github.com/sebnitu/scroll-stash/compare/v1.0.9...v1.0.10) (2020-08-13)

### Bug Fixes
* remove cjs and iife bundles in favor of umd ([2298059](https://github.com/sebnitu/scroll-stash/commit/2298059))


## [1.0.9](https://github.com/sebnitu/scroll-stash/compare/v1.0.8...v1.0.9) (2020-08-12)

### Bug Fixes
* change main entry to es module ([222c08f](https://github.com/sebnitu/scroll-stash/commit/222c08f))
* remove type because it breaks build ([7ef5a7a](https://github.com/sebnitu/scroll-stash/commit/7ef5a7a))


## [1.0.8](https://github.com/sebnitu/scroll-stash/compare/v1.0.7...v1.0.8) (2020-08-12)

### Bug Fixes
* add modules entry field ([6372786](https://github.com/sebnitu/scroll-stash/commit/6372786))

### Documentation
* update docs with new keyword ([0d44c39](https://github.com/sebnitu/scroll-stash/commit/0d44c39))


## [1.0.7](https://github.com/sebnitu/scroll-stash/compare/v1.0.6...v1.0.7) (2020-08-12)

### Refactor
* Refactor ScrollStash to be in Class syntax (#93) ([784179b](https://github.com/sebnitu/scroll-stash/commit/784179b)), closes [#93](https://github.com/sebnitu/scroll-stash/issues/93)


## [1.0.6](https://github.com/sebnitu/scroll-stash/compare/v1.0.5...v1.0.6) (2020-08-09)

### Bug Fixes
* convert constructor to a functional instantiation (#77) ([e834822](https://github.com/sebnitu/scroll-stash/commit/e834822)), closes [#77](https://github.com/sebnitu/scroll-stash/issues/77)


## [1.0.5](https://github.com/sebnitu/scroll-stash/compare/v1.0.4...v1.0.5) (2020-08-08)

### Bug Fixes
* revert to default export for script api ([efc662d](https://github.com/sebnitu/scroll-stash/commit/efc662d))


## [1.0.4](https://github.com/sebnitu/scroll-stash/compare/v1.0.3...v1.0.4) (2020-08-08)

### Bug Fixes
* fix rollup bundles by using separate entries ([fb24d30](https://github.com/sebnitu/scroll-stash/commit/fb24d30))


## [1.0.3](https://github.com/sebnitu/scroll-stash/compare/v1.0.2...v1.0.3) (2020-08-08)

### Bug Fixes
* update cjs bundle file name ([20a58bf](https://github.com/sebnitu/scroll-stash/commit/20a58bf))


## [1.0.2](https://github.com/sebnitu/scroll-stash/compare/v1.0.1...v1.0.2) (2020-08-08)

### Refactor
* Update package exports (#76) ([1d76515](https://github.com/sebnitu/scroll-stash/commit/1d76515)), closes [#76](https://github.com/sebnitu/scroll-stash/issues/76)


## [1.0.1](https://github.com/sebnitu/scroll-stash/compare/v1.0.0...v1.0.1) (2020-07-31)

### Refactor
* move lodash modules to dep from devDep ([83f6396](https://github.com/sebnitu/scroll-stash/commit/83f6396))


## [1.0.0](https://github.com/sebnitu/scroll-stash/compare/v0.2.6...v1.0.0) (2020-07-19)

### Bug Fixes
* add throttleDelay to prevent extra save trigger ([b793ca4](https://github.com/sebnitu/scroll-stash/commit/b793ca430d5676f4d9b748f8df970c2c3951caec))
* lodash isEmpty import ([ba11357](https://github.com/sebnitu/scroll-stash/commit/ba113579bfa1babee9633a712c24093213ffc686))

### Features
* add ability to set options via init api call ([8bfe014](https://github.com/sebnitu/scroll-stash/commit/8bfe0148b78579bf29e9d4111d0a4a859a7a30be))
* add anchorGet method to api ([2f579af](https://github.com/sebnitu/scroll-stash/commit/2f579af0dc8476e74ca581dc9ecfc1dec433c2d8))
* add anchorShow return details and anchorInView method ([05dd39f](https://github.com/sebnitu/scroll-stash/commit/05dd39fbaf38d1d926d15ed91847b0d7eb3c5ffb))
* add positionCenter to anchor alignment options ([0c0abbb](https://github.com/sebnitu/scroll-stash/commit/0c0abbb5f353a479eeeb7543b3172f8e9fc01a4d))

### Refactor
* combine throttle and run methods into handler ([69b372c](https://github.com/sebnitu/scroll-stash/commit/69b372c))
* convert default settings into a module ([aa5d0cb](https://github.com/sebnitu/scroll-stash/commit/aa5d0cb))
* convert getAnchor into a module ([3a163d6](https://github.com/sebnitu/scroll-stash/commit/3a163d6))
* convert getPosition and getPos* to modules ([c6abe84](https://github.com/sebnitu/scroll-stash/commit/c6abe84))
* convert set and save scrollPosition methods into modules ([15b43e5](https://github.com/sebnitu/scroll-stash/commit/15b43e5))
* convert showAnchor into a module ([bf7570c](https://github.com/sebnitu/scroll-stash/commit/bf7570c))
* group features into the same module files ([f0d7174](https://github.com/sebnitu/scroll-stash/commit/f0d7174))
* move anchor api into the anchor property ([93d243a](https://github.com/sebnitu/scroll-stash/commit/93d243a))
* move and rename index to core in src ([42897de](https://github.com/sebnitu/scroll-stash/commit/42897de))
* remove custom throttle in favor of lodash implementation ([acde91b](https://github.com/sebnitu/scroll-stash/commit/acde91b))
* remove private showAnchor method and use api instead ([089665a](https://github.com/sebnitu/scroll-stash/commit/089665a))
* remove unneeded const ([dd8c27b](https://github.com/sebnitu/scroll-stash/commit/dd8c27b))
* revert some changes to init ([3043259](https://github.com/sebnitu/scroll-stash/commit/3043259))


## [0.2.6](https://github.com/sebnitu/scroll-stash/compare/v0.2.5...v0.2.6) (2020-07-17)

### Features
* add the alignment option ([2d65f4b](https://github.com/sebnitu/scroll-stash/commit/2d65f4b))

### Refactor
* Refactor show anchor functionality (#41) ([7071ac1](https://github.com/sebnitu/scroll-stash/commit/7071ac1)), closes [#41](https://github.com/sebnitu/scroll-stash/issues/41)
  * move the anchor query logic into it's own method ([4563c1a](https://github.com/sebnitu/scroll-stash/commit/4563c1a))
  * remove redundant conditionals around showAnchor calls ([12da5a2](https://github.com/sebnitu/scroll-stash/commit/12da5a2))
  * move posTop and posBot into their own get methods ([b9e0fa5](https://github.com/sebnitu/scroll-stash/commit/b9e0fa5))
  * move the nearest position logic into its own get method ([feea05c](https://github.com/sebnitu/scroll-stash/commit/feea05c))
  * clean up custom event dispatch ([33356b6](https://github.com/sebnitu/scroll-stash/commit/33356b6))

### Documentation
* update readme content order ([8c85687](https://github.com/sebnitu/scroll-stash/commit/8c85687))


## [0.2.5](https://github.com/sebnitu/scroll-stash/compare/v0.2.4...v0.2.5) (2020-07-15)

### Bug Fixes
* anchor event no longer incorrectly fire when anchors are in view ([1e4d9ba](https://github.com/sebnitu/scroll-stash/commit/1e4d9ba))

### Refactor
* use shorthand to add top bot adjust ([40fe158](https://github.com/sebnitu/scroll-stash/commit/40fe158))

### Tests
* Improve test coverage (#40) ([5642648](https://github.com/sebnitu/scroll-stash/commit/5642648)), closes [#40](https://github.com/sebnitu/scroll-stash/issues/40)


## [0.2.4](https://github.com/sebnitu/scroll-stash/compare/v0.2.3...v0.2.4) (2020-07-14)

### Bug Fixes
* fixed conditional logic on data anchor ([9837c83](https://github.com/sebnitu/scroll-stash/commit/9837c83))


## [0.2.3](https://github.com/sebnitu/scroll-stash/compare/v0.2.2...v0.2.3) (2020-07-13)

### Chore
* add release flow to changelog and update version scripts ([4160d51](https://github.com/sebnitu/scroll-stash/commit/4160d51))

### Documentation
* add coverage badge to readme ([dbda049](https://github.com/sebnitu/scroll-stash/commit/dbda049))


## [0.2.2](https://github.com/sebnitu/scroll-stash/compare/v0.2.1...v0.2.2) (2020-07-13)

### Tests
* add a few unit tests via jsdom env (#35) ([7db0b3e](https://github.com/sebnitu/scroll-stash/commit/7db0b3e)), closes [#35](https://github.com/sebnitu/scroll-stash/issues/35)
* update test script ([6c669de](https://github.com/sebnitu/scroll-stash/commit/6c669de))


## [0.2.1](https://github.com/sebnitu/scroll-stash/compare/v0.2.0...v0.2.1) (2020-07-04)

### Tests
* Add headless browser testing ([#19](https://github.com/sebnitu/scroll-stash/pull/19)) ([c96ac3c](https://github.com/sebnitu/scroll-stash/commit/c96ac3c7f0b41ab8fb42fb785243cb65eee43047))


## [0.2.0](https://github.com/sebnitu/scroll-stash/compare/v0.1.2...v0.2.0) (2020-06-22)

### Features
* add custom events for saved, applied and anchor ([ba34a8c](https://github.com/sebnitu/scroll-stash/commit/ba34a8c5dc759b9d3580995a9cbf883dfa462607))


## [0.1.2](https://github.com/sebnitu/scroll-stash/compare/v0.1.0...v0.1.2) (2020-06-21)

### Bug Fixes
* show active top and bottom element padding ([a4f76ec](https://github.com/sebnitu/scroll-stash/commit/a4f76ec3c26f0db3ad8f253b05e0f1147d77a095))

### Features
* add optional stash-anchor data attr for manually overriding anchor ([c1dc586](https://github.com/sebnitu/scroll-stash/commit/c1dc5860713232d517bbf5dea734f8653c940176))
* add support for multiple scroll-stash elements ([8c82b37](https://github.com/sebnitu/scroll-stash/commit/8c82b37e16409e7422a9b677211225b39c493fd7))


## [0.1.1](https://github.com/sebnitu/scroll-stash/compare/v0.1.0...v0.1.1) (2020-06-21)

### Features
* add support for multiple scroll-stash elements ([8c82b37](https://github.com/sebnitu/scroll-stash/commit/8c82b37e16409e7422a9b677211225b39c493fd7))

### Refactor
* refactor the show active functionality ([50b46d5](https://github.com/sebnitu/scroll-stash/commit/50b46d5d89196754d64b80b6d25e29a9a6615f6f))


## [0.1.0](https://github.com/sebnitu/scroll-stash/compare/v0.1.0) (2020-06-17)

### Features
* first commit: ported over the initial prototype from [Vrembem](https://vrembem.com) docs ([ee64dcf](https://github.com/sebnitu/scroll-stash/commit/ee64dcfee8a37060fb644cba31115418473bad59))
