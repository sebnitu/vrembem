# Roadmap

This document describes the current status and upcoming milestones of the Vrembem project.

## The Road to v2

Milestones to reach before Vrembem is ready for it's v2 release.

- [ ] All available components should be in a ✅ stable state.
- [ ] Documentation should be fully completed for all components.

## Component Status

__Status Labels:__

- ✅ __Stable__ - A fully tested and developed component. Likely won't have breaking changes.
- 🤔 __Audit__ - Needs further review.
- 📐 __Refactor__ - Worth keeping, but needs to be re-written. High likelyhood for breaking changes.
- 🔗 __Merge__ - Possibly merge with an existing component or rolled into `base`/`utility` packages.
- 🚫 __Deprecate__ - Doesn't see much use. High chance of being deprecated.

| #   | Component      | Status | Notes                                                                                                                                                                                           |
| --- | -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `base`         | ✅      | Very stable with strong existing patterns. Can only grow.                                                                                                                                       |
| 2   | `breadcrumb`   | ✅      | This is fine.                                                                                                                                                                                   |
| 3   | `button`       | ✅      | The staple of any component library.                                                                                                                                                            |
| 4   | `button-group` | 🤔      | This feels very similar to `level`, maybe merge? Are these specific usecases that can't be covered by `level`?                                                                                  |
| 5   | `card`         | ✅      | Extremely versatile container component.                                                                                                                                                        |
| 6   | `checkbox`     | ✅      | Staple form control.                                                                                                                                                                            |
| 7   | `container`    | 🔗      | This could be handled by `utility` with the introduction of a `max-width` utility.                                                                                                              |
| 8   | `core`         | ✅      | Very well established root variables, mixins and functions. Can only grow.                                                                                                                      |
| 9   | `dialog`       | ✅      | Similar to `card`, extremely versatile container component. Used in both `drawer` and `modal` for composition.                                                                                  |
| 10  | `drawer`       | ✅      | Super stable component and pattern. maybe audit the need for `drawer__wrapper` and `drawer__main` since they're the only component elements that sit outside the base `drawer` component class. |
| 11  | `dropdown`     | 🔗      | This—along with `tooltip`—could be merged into a more generic component. Maybe `popover`?                                                                                                       |
| 12  | `grid`         | ✅      | Well established pattern. Won't change much.                                                                                                                                                    |
| 13  | `icon`         | 🤔      | I like the idea of having an `icon` component. Should audit the existing modifiers though.                                                                                                      |
| 14  | `icon-action`  | 🔗      | Maybe merge this into a `button` modifier.                                                                                                                                                      |
| 15  | `input`        | ✅      | Staple form control.                                                                                                                                                                            |
| 16  | `level`        | ✅      | Base styles are well done and very stable. Worth exploring modifier changes for inclusion of `button-group` component.                                                                          |
| 17  | `media`        | ✅      | Super versatile layout component.                                                                                                                                                               |
| 18  | `menu`         | ✅      | Super versatile component with well established patterns. Won't change much.                                                                                                                    |
| 19  | `modal`        | ✅      | Super stable component and pattern.                                                                                                                                                             |
| 20  | `notice`       | 📐      | A staple component. Currently not a fan of the need for `notice__body`, should be reconsidered.                                                                                                 |
| 21  | `radio`        | ✅      | Staple form control.                                                                                                                                                                            |
| 22  | `section`      | 🤔      | There is a need for `__background` and `__screen` elements within a container, not sure if this fills that need. `card` uses similar styles.                                                    |
| 23  | `switch`       | ✅      | Staple form control.                                                                                                                                                                            |
| 24  | `table`        | ✅      | Table styles are important.                                                                                                                                                                     |
| 25  | `tooltip`      | 🔗      | This—along with `dropdown`—could be merged into a more generic component. Maybe `popover`?                                                                                                      |
| 26  | `utility`      | ✅      | Very stable with strong existing patterns. Can only grow.                                                                                                                                       |

__🔗 Merged Components:__

- `arrow` - Merged into `base` as a new module.


__🚫 Deprecated Components:__

- `panel` - Deprecated for being too generic.
