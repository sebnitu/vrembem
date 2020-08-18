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
| 1   | `arrow`        | 🔗      | Maybe move into `core` mixins and class output in `utility`?                                                                                                                                    |
| 2   | `base`         | ✅      | Very stable with strong existing patterns. Can only grow.                                                                                                                                       |
| 3   | `breadcrumb`   | ✅      | This is fine.                                                                                                                                                                                   |
| 4   | `button`       | ✅      | The staple of any component library.                                                                                                                                                            |
| 5   | `button-group` | 🤔      | This feels very similar to `level`, maybe merge? Are these specific usecases that can't be covered by `level`?                                                                                  |
| 6   | `card`         | ✅      | Extremely versatile container component.                                                                                                                                                        |
| 7   | `checkbox`     | ✅      | Staple form control.                                                                                                                                                                            |
| 8   | `container`    | 🔗      | This could be handled by `utility` with the introduction of a `max-width` utility.                                                                                                              |
| 9   | `core`         | ✅      | Very well established root variables, mixins and functions. Can only grow.                                                                                                                      |
| 10  | `dialog`       | ✅      | Similar to `card`, extremely versatile container component. Used in both `drawer` and `modal` for composition.                                                                                  |
| 11  | `drawer`       | ✅      | Super stable component and pattern. maybe audit the need for `drawer__wrapper` and `drawer__main` since they're the only component elements that sit outside the base `drawer` component class. |
| 12  | `dropdown`     | 🔗      | This—along with `tooltip`—could be merged into a more generic component. Maybe `popover`?                                                                                                       |
| 13  | `grid`         | ✅      | Well established pattern. Won't change much.                                                                                                                                                    |
| 14  | `icon`         | 🤔      | I like the idea of having an `icon` component. Should audit the existing modifiers though.                                                                                                      |
| 15  | `icon-action`  | 🔗      | Maybe merge this into a `button` modifier.                                                                                                                                                      |
| 16  | `input`        | ✅      | Staple form control.                                                                                                                                                                            |
| 17  | `level`        | ✅      | Base styles are well done and very stable. Worth exploring modifier changes for inclusion of `button-group` component.                                                                          |
| 18  | `media`        | ✅      | Super versatile layout component.                                                                                                                                                               |
| 19  | `menu`         | ✅      | Super versatile component with well established patterns. Won't change much.                                                                                                                    |
| 20  | `modal`        | ✅      | Super stable component and pattern.                                                                                                                                                             |
| 21  | `notice`       | 📐      | A staple component. Currently not a fan of the need for `notice__body`, should be reconsidered.                                                                                                 |
| 22  | `panel`        | 🚫      | This is too generic.                                                                                                                                                                            |
| 23  | `radio`        | ✅      | Staple form control.                                                                                                                                                                            |
| 24  | `section`      | 🤔      | There is a need for `__background` and `__screen` elements within a container, not sure if this fills that need. `card` uses similar styles.                                                    |
| 25  | `switch`       | ✅      | Staple form control.                                                                                                                                                                            |
| 26  | `table`        | ✅      | Table styles are important.                                                                                                                                                                     |
| 27  | `tooltip`      | 🔗      | This—along with `dropdown`—could be merged into a more generic component. Maybe `popover`?                                                                                                      |
| 28  | `utility`      | ✅      | Very stable with strong existing patterns. Can only grow.                                                                                                                                       |
