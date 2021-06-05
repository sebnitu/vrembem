# Roadmap

This document describes the current status and upcoming milestones of the Vrembem project.

## The Road to v2

Milestones to reach before Vrembem is ready for it's v2 release.

- [ ] All available components should be in a ✅ stable state.
- [ ] Documentation should be fully completed for all components.

## Component Status

**Status Labels:**

- ✅ __Stable__ - A fully tested and developed component. Likely won't have breaking changes.
- 🤔 __Audit__ - Needs further review.
- 📐 __Refactor__ - Worth keeping, but needs to be re-written. High likelihood for breaking changes.
- 🔗 __Merge__ - Possibly merge with an existing component or rolled into `base`/`utility` packages.
- 🚫 __Deprecate__ - Doesn't see much use. High chance of being deprecated.

| #   | Component      | Status | Notes                                                                                                                                                                                           |
| --- | -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `base`         | ✅      | Very stable with strong existing patterns. Can only grow.                                                                                                                                       |
| 2   | `breadcrumb`   | ✅      | This is fine.                                                                                                                                                                                   |
| 3   | `button`       | ✅      | The staple of any component library.                                                                                                                                                            |
| 4   | `button-group` | ✅      | Has been audited. There's enough unique modifiers to keep this it's own component.                                                                                                              |
| 5   | `card`         | ✅      | Extremely versatile container component.                                                                                                                                                        |
| 6   | `checkbox`     | ✅      | Staple form control.                                                                                                                                                                            |
| 7   | `core`         | ✅      | Very well established root variables, mixins and functions. Can only grow.                                                                                                                      |
| 8   | `dialog`       | ✅      | Similar to `card`, extremely versatile container component. Used in both `drawer` and `modal` for composition.                                                                                  |
| 9   | `drawer`       | ✅      | Super stable component and pattern. maybe audit the need for `drawer__wrapper` and `drawer__main` since they're the only component elements that sit outside the base `drawer` component class. |
| 10  | `grid`         | ✅      | Well established pattern. Won't change much.                                                                                                                                                    |
| 11  | `icon`         | ✅      | I like the idea of having an `icon` component. Should audit the existing modifiers though.                                                                                                      |
| 12  | `icon-action`  | ✅      | Maybe merge this into a `button` modifier.                                                                                                                                                      |
| 13  | `input`        | ✅      | Staple form control.                                                                                                                                                                            |
| 14  | `level`        | ✅      | Base styles are well done and very stable. Worth exploring modifier changes for inclusion of `button-group` component.                                                                          |
| 15  | `media`        | ✅      | Super versatile layout component.                                                                                                                                                               |
| 16  | `menu`         | ✅      | Super versatile component with well established patterns. Won't change much.                                                                                                                    |
| 17  | `modal`        | ✅      | Super stable component and pattern.                                                                                                                                                             |
| 18  | `notice`       | ✅      | A staple component. Has been refactored and removed unneeded complexity.                                                                                                                        |
| 19  | `popover`      | 📐      | Renamed to `popover` from `dropdown`. Complete refactor to be primarily a container component for better composition.                                                                           |
| 20  | `radio`        | ✅      | Staple form control.                                                                                                                                                                            |
| 21  | `section`      | ✅      | There is a need for `__background` and `__screen` elements within a container, not sure if this fills that need. `card` uses similar styles.                                                    |
| 22  | `switch`       | ✅      | Staple form control.                                                                                                                                                                            |
| 23  | `table`        | ✅      | Table styles are important.                                                                                                                                                                     |
| 24  | `tooltip`      | 📐      | Audit and refactor.                                                                                                                                                                             |
| 25  | `utility`      | ✅      | Very stable with strong existing patterns. Can only grow.                                                                                                                                       |

**🔗 Merged Components:**

- `arrow` - Merged into `base` as a new module.

**🚫 Deprecated Components:**

- `dropdown` - Renamed to `popover` during refactor.
- `panel` - Deprecated for being too generic.
- `container` - Deprecate in favor of `max-width` and `margin-auto` utilities.
