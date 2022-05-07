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
| 2   | `button`       | ✅      | The staple of any component library.                                                                                                                                                            |
| 3   | `button-group` | ✅      | Has been audited. There's enough unique modifiers to keep this it's own component.                                                                                                              |
| 4   | `card`         | ✅      | Extremely versatile container component.                                                                                                                                                        |
| 5   | `checkbox`     | ✅      | Staple form control.                                                                                                                                                                            |
| 6   | `core`         | ✅      | Very well established root variables, mixins and functions. Can only grow.                                                                                                                      |
| 7   | `dialog`       | ✅      | Similar to `card`, extremely versatile container component. Used in both `drawer` and `modal` for composition.                                                                                  |
| 8   | `drawer`       | ✅      | Super stable component and pattern. maybe audit the need for `drawer__wrapper` and `drawer__main` since they're the only component elements that sit outside the base `drawer` component class. |
| 9   | `grid`         | ✅      | Well established pattern. Won't change much.                                                                                                                                                    |
| 10  | `icon`         | ✅      | I like the idea of having an `icon` component. Should audit the existing modifiers though.                                                                                                      |
| 11  | `icon-action`  | ✅      | Maybe merge this into a `button` modifier.                                                                                                                                                      |
| 12  | `input`        | ✅      | Staple form control.                                                                                                                                                                            |
| 13  | `level`        | ✅      | Base styles are well done and very stable. Worth exploring modifier changes for inclusion of `button-group` component.                                                                          |
| 14  | `media`        | ✅      | Super versatile layout component.                                                                                                                                                               |
| 15  | `menu`         | ✅      | Super versatile component with well established patterns. Won't change much.                                                                                                                    |
| 16  | `modal`        | ✅      | Super stable component and pattern.                                                                                                                                                             |
| 17  | `notice`       | ✅      | A staple component. Has been refactored and removed unneeded complexity.                                                                                                                        |
| 18  | `popover`      | ✅      | Renamed to `popover` from `dropdown`. Complete refactor to be primarily a container component for better composition.                                                                           |
| 19  | `radio`        | ✅      | Staple form control.                                                                                                                                                                            |
| 20  | `section`      | ✅      | There is a need for `__background` and `__screen` elements within a container, not sure if this fills that need. `card` uses similar styles.                                                    |
| 21  | `switch`       | ✅      | Staple form control.                                                                                                                                                                            |
| 22  | `table`        | ✅      | Table styles are important.                                                                                                                                                                     |
| 23  | `utility`      | ✅      | Very stable with strong existing patterns. Can only grow.                                                                                                                                       |

**🔗 Merged Components:**

- `arrow` - Merged into `base` as a new module.

**🚫 Deprecated Components:**

- `breadcrumb` - Deprecated in favor of general utility classes.
- `dropdown` - Renamed to `popover` during refactor.
- `panel` - Deprecated for being too generic.
- `container` - Deprecate in favor of `max-width` and `margin-auto` utilities.
- `tooltip` - Deprecate in favor of rolling into `popover` as a modifier `popover_tooltip`.
