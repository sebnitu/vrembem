<!-- <Navbar> -->
<!--
  Includes:
  * Navbar
  * Container
  * Menu
  * Dropdown
  * Input
  * Input-group
  * Button
  * Icon
  * Arrow
  * Tooltip
-->
<div class="navbar navbar_theme_inverted">
  <div class="navbar__container container">
    <div class="navbar__item">
      <ul class="menu menu_theme_inverted">
        <li class="menu__item">
          <a href="#" class="menu__link menu__link_icon">
            <svg role="img" class="icon">
              <use xlink:href="#github"></use>
            </svg>
          </a>
        </li>
        <li class="menu__sep"></li>
        <li class="menu__item">
          <label class="input-group input-group_gap">
            <div class="input-group__item input-group__item_grow_none button button_color_inverted">This repository</div>
            <input type="text" class="input-group__item input input_color_inverted" placeholder="Search" />
          </label>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Pull request</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Issues</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Marketplace</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Explore</a>
        </li>
      </ul>
    </div>
    <div class="navbar__item">
      <ul class="menu menu_theme_inverted">
        <li class="menu__item">
          <a href="#" class="menu__link menu__link_icon tooltip tooltip_pos_down-right" data-tooltip="You have no unread notifications">
            <svg role="img" class="icon">
              <use xlink:href="#bell"></use>
            </svg>
          </a>
        </li>
        <li class="menu__item dropdown on-hover">
          <a href="#" class="menu__link menu__link_icon dropdown__trigger">
            <svg role="img" class="icon">
              <use xlink:href="#plus-circle"></use>
            </svg>
            <span class="arrow"></span>
          </a>
          <ul class="dropdown__menu dropdown__menu_pos_switch">
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">New repository</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Import repository</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">New gist</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">New organization</a>
            </li>
          </ul>
        </li>
        <li class="menu__item dropdown on-hover">
          <a href="#" class="menu__link menu__link_icon dropdown__trigger">
            <svg role="img" class="icon">
              <use xlink:href="#user"></use>
            </svg>
            <span class="arrow"></span>
          </a>
          <ul class="dropdown__menu dropdown__menu_pos_switch">
            <li class="dropdown__item">
              <div class="dropdown__content text_subtle">
                Signed in as <strong>username</strong>
              </div>
            </li>
            <li class="dropdown__sep"></li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Your profile</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Your stars</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Your gists</a>
            </li>
            <li class="dropdown__sep"></li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Help</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Settings</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Sign out</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</div>
<!-- </Navbar> -->

<!-- <Section> -->
<!--
  Includes:
  * Section
  * Container
  * Spacing
  * Grid
  * Breadcrumb
  * Button
  * Button-group
  * Icon
  * Dropdown
  * Menu
-->
<div class="section section_background section_border_bottom section_padding_bottom-none">
  <div class="container spacing">
    <div class="grid">
      <div class="grid__item level">
        <svg role="img" class="icon">
          <use xlink:href="#book"></use>
        </svg>
        <ul class="breadcrumb breadcrumb_size_large">
          <li class="breadcrumb__item">
            <a href="#" class="breadcrumb__link">username</a>
          </li>
          <li class="breadcrumb__item">
            <a href="#" class="breadcrumb__link">project</a>
          </li>
        </ul>
      </div>
      <div class="grid__item grid__item_size_auto level">
        <div class="button-group">
          <div class="button-group__item button dropdown on-hover">
            <svg role="img" class="icon">
              <use xlink:href="#eye"></use>
            </svg>
            <span>Unwatch</span>
            <span class="arrow"></span>
            <ul class="dropdown__menu dropdown__menu_size_large">
              <li class="dropdown__item">
                <div class="dropdown__content">
                  <h3>Notifications</h3>
                </div>
              </li>
              <li class="dropdown__sep"></li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link dropdown__link_align_top">
                  <svg role="img" class="icon icon_size_large text_subtle">
                    <use xlink:href="#circle"></use>
                  </svg>
                  <div>
                    <h2 class="dropdown__title">Not Watching</h2>
                    <p>Be notified when participating or @mentioned.</p>
                  </div>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link dropdown__link_align_top">
                  <svg role="img" class="icon icon_size_large">
                    <use xlink:href="#check-circle"></use>
                  </svg>
                  <div>
                    <h2 class="dropdown__title">Watching</h2>
                    <p>Be notified of all conversations.</p>
                  </div>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link dropdown__link_align_top">
                  <svg role="img" class="icon icon_size_large text_subtle">
                    <use xlink:href="#circle"></use>
                  </svg>
                  <div>
                    <h2 class="dropdown__title">Ignore</h2>
                    <p>Never be notified.</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <button class="button-group__item button">
            <span>1</span>
          </button>
        </div>
        <div class="button-group">
          <button class="button-group__item button">
            <svg role="img" class="icon">
              <use xlink:href="#star"></use>
            </svg>
            <span>Star</span>
          </button>
          <button class="button-group__item button">
            <span>0</span>
          </button>
        </div>
        <div class="button-group">
          <button class="button-group__item button">
            <svg role="img" class="icon">
              <use xlink:href="#git-branch"></use>
            </svg>
            <span>Fork</span>
          </button>
          <button class="button-group__item button">
            <span>0</span>
          </button>
        </div>
      </div>
    </div><!-- .grid -->
    <ul class="menu menu_theme_tabs" style="border-bottom: none;">
      <li class="menu__item">
        <a href="#" class="menu__link is-active">
          <svg role="img" class="icon">
            <use xlink:href="#code"></use>
          </svg>
          <span>Code</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          <svg role="img" class="icon">
            <use xlink:href="#alert-circle"></use>
          </svg>
          <span>Issues</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          <svg role="img" class="icon">
            <use xlink:href="#git-pull-request"></use>
          </svg>
          <span>Pull requests</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          <svg role="img" class="icon">
            <use xlink:href="#grid"></use>
          </svg>
          <span>Projects</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          <svg role="img" class="icon">
            <use xlink:href="#book-open"></use>
          </svg>
          <span>Wiki</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          <svg role="img" class="icon">
            <use xlink:href="#pie-chart"></use>
          </svg>
          <span>Insights</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          <svg role="img" class="icon">
            <use xlink:href="#settings"></use>
          </svg>
          <span>Settings</span>
        </a>
      </li>
    </ul>
  </div><!-- .container -->
</div><!-- .section -->
<!-- </Section> -->

<!-- <Section> -->
<!--
  Includes:
  * Section
-->
<div class="section">
  <div class="container spacing">
    <div class="grid">
      <div class="grid__item spacing spacing_size_small">
        <p>Some project description goes here...</p>
        <p class="level">
          <a href="#" class="badge badge_color_primary badge_link">css</a>
          <a href="#" class="badge badge_color_primary badge_link">components</a>
          <a href="#" class="badge badge_color_primary badge_link">library</a>
          <a href="#" class="badge badge_color_primary badge_link">framework</a>
          <a href="#" class="badge badge_color_primary badge_link">design</a>
          <span><a href="#" class="text_size_small text_link">Manage topics</a></span>
        </p>
      </div>
      <div class="grid__item grid__item_size_auto">
        <button class="button">Edit</button>
      </div>
    </div><!-- .grid -->
    <div class="box spacing spacing_size_small">
      <ul class="menu menu_full">
        <li class="menu__item">
          <a href="#" class="menu__link">
            <svg role="img" class="icon">
              <use xlink:href="#git-commit"></use>
            </svg>
            <span>873 commits</span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            <svg role="img" class="icon">
              <use xlink:href="#git-branch"></use>
            </svg>
            <span>2 branch</span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            <svg role="img" class="icon">
              <use xlink:href="#tag"></use>
            </svg>
            <span>52 releases</span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            <svg role="img" class="icon">
              <use xlink:href="#users"></use>
            </svg>
            <span>6 contributor</span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            <svg role="img" class="icon">
              <use xlink:href="#clipboard"></use>
            </svg>
            <span>MIT</span>
          </a>
        </li>
      </ul>
      <hr class="divider" />
      <ul class="menu menu_full">
        <li class="menu__item">
          <a href="#" class="menu__link">
            <span class="badge badge_dot badge_color_purple"></span>
            <span>CSS <span class="text_subtle">84.1%</span></span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            <span class="badge badge_dot badge_color_blue"></span>
            <span>JavaScript <span class="text_subtle">12.7%</span></span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            <span class="badge badge_dot badge_color_green"></span>
            <span>Ruby <span class="text_subtle">3.2%</span></span>
          </a>
        </li>
      </ul>
    </div><!-- .box -->
    <div>
      <div class="grid">
        <div class="grid__item level">
          <div class="dropdown on-hover">
            <button class="dropdown__trigger button">
              <span>Branch: master</span>
              <span class="arrow"></span>
            </button>
            <ul class="dropdown__menu">
              <li class="dropdown__item">
                <div class="dropdown__content">
                  <h3>Switch branches/tags</h3>
                </div>
              </li>
              <li class="dropdown__sep"></li>
              <li class="dropdown__item">
                <div class="dropdown__content" style="padding-bottom: 0; margin-bottom: 0.5em; border-bottom: 1px solid #e0e0e0">
                  <form>
                    <input type="text" class="input" placeholder="Find or create a branch..." />
                  </form>
                  <ul class="menu menu_theme_tabs" style="border-bottom: none;">
                    <li class="menu__item">
                      <a href="#" class="menu__link is-active">
                        <span>Branches</span>
                      </a>
                    </li>
                    <li class="menu__item">
                      <a href="#" class="menu__link">
                        <span>Tags</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link is-active">
                  <svg role="img" class="icon">
                    <use xlink:href="#check-circle"></use>
                  </svg>
                  <span>master</span>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link">
                  <svg role="img" class="icon">
                    <use xlink:href="#circle"></use>
                  </svg>
                  <span>feat/some-update</span>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link">
                  <svg role="img" class="icon">
                    <use xlink:href="#circle"></use>
                  </svg>
                  <span>update/some-update</span>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link">
                  <svg role="img" class="icon">
                    <use xlink:href="#circle"></use>
                  </svg>
                  <span>bug/some-update</span>
                </a>
              </li>
            </ul>
          </div>
          <button class="button">
            <span>New pull request</span>
          </button>
        </div>
        <div class="grid__item grid__item_size_auto level">
          <div class="button-group">
            <button class="button-group__item button">
              <span>Create new file</span>
            </button>
            <button class="button-group__item button">
              <span>Upload files</span>
            </button>
            <button class="button-group__item button">
              <span>Find file</span>
            </button>
          </div>
          <div class="dropdown on-hover">
            <button class="dropdown__trigger button button_color_primary">
              <span>Clone or download</span>
              <span class="arrow"></span>
            </button>
            <ul class="dropdown__menu dropdown__menu_size_auto dropdown__menu_pos_switch">
              <li class="dropdown__item">
                <div class="dropdown__content">
                  <div class="level level_justify_split">
                    <div class="level">
                      <h3>Clone with HTTPS</h3>
                      <a href="#" class="level">
                        <svg role="img" class="icon">
                          <use xlink:href="#help-circle"></use>
                        </svg>
                      </a>
                    </div>
                    <a href="#" class="text_link">Use SSH</a>
                  </div>
                  <p>Use Git or checkout with SVN using the web URL</p>
                  <form>
                    <div class="input-group">
                      <input type="text" class="input-group__item input" value="https://github.com/username/ProjectNames.git" readonly />
                      <button class="input-group__item input-group__item_grow_none button">
                        <svg role="img" class="icon">
                          <use xlink:href="#clipboard"></use>
                        </svg>
                      </button>
                    </div>
                  </form>
                  <div class="button-group">
                    <button class="button-group__item button">Open in Desktop</button>
                    <button class="button-group__item button">Download Zip</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div><!-- .container -->
</div><!-- .section -->
<!-- </Section> -->

<!-- <Section> -->
<!--
  Includes:
  * Section
-->
<div class="section">
  <div class="container">
    <p>...</p>
  </div><!-- .container -->
</div><!-- .section -->
<!-- </Section> -->

<!-- <Section> -->
<!--
  Includes:
  * Section
-->
<footer class="section text_size_small">
  <div class="container">
    <div class="level level_justify_split">
      <div class="level">
        <p>&copy; 2018 GitHub, Inc.</p>
        <ul class="menu">
          <li class="menu__item">
            <a href="#" class="menu__link">Terms</a>
          </li>
          <li class="menu__item">
            <a href="#" class="menu__link">Privacy</a>
          </li>
          <li class="menu__item">
            <a href="#" class="menu__link">Security</a>
          </li>
          <li class="menu__item">
            <a href="#" class="menu__link">Status</a>
          </li>
          <li class="menu__item">
            <a href="#" class="menu__link">Help</a>
          </li>
        </ul>
      </div>
      <a href="#" class="button button_color_fade button_icon">
        <svg role="img" class="icon">
          <use xlink:href="#github"></use>
        </svg>
      </a>
      <ul class="menu">
        <li class="menu__item">
          <a href="#" class="menu__link">Contact GitHub</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">API</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Training</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Shop</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Blog</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">About</a>
        </li>
      </ul>
    </div>
  </div><!-- .container -->
</footer><!-- .section -->
<!-- </Section> -->
