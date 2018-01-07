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
  * Breadcrumb
  * Button
  * Button-group
  * Icon
  * Dropdown
  * Menu
-->
<div class="section section_background section_border_bottom section_padding_bottom-none">
  <div class="container container_flex">
    <div class="container__item">
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
    <div class="container__item">
      <div class="button-group">
        <div class="button-group__item button button_outline dropdown on-hover">
          <svg role="img" class="icon">
            <use xlink:href="#eye"></use>
          </svg>
          <span>Unwatch</span>
          <span class="arrow"></span>
          <ul class="dropdown__menu dropdown__menu_size_large">
            <li class="dropdown__item">
              <div class="dropdown__content text_subtle">Notifications</div>
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
        <button class="button-group__item button button_outline">
          <span>1</span>
        </button>
      </div>
      <div class="button-group">
        <button class="button-group__item button button_outline">
          <svg role="img" class="icon">
            <use xlink:href="#star"></use>
          </svg>
          <span>Star</span>
        </button>
        <button class="button-group__item button button_outline">
          <span>0</span>
        </button>
      </div>
      <div class="button-group">
        <button class="button-group__item button button_outline">
          <svg role="img" class="icon">
            <use xlink:href="#git-branch"></use>
          </svg>
          <span>Fork</span>
        </button>
        <button class="button-group__item button button_outline">
          <span>0</span>
        </button>
      </div>
    </div>
  </div>
  <div class="container">
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
  </div>
</div>
<!-- </Section> -->

<!-- <Section> -->
<!--
  Includes:
  * Section
-->
<!-- </Section> -->
<div class="section">
  <div class="container">
    <div>
      <button class="button button_size_small">Edit</button>
      <p class="text_lead">Some project description goes here...</p>
      <p>
        <a href="#" class="badge">css</a>
        <a href="#" class="badge">components</a>
        <a href="#" class="badge">library</a>
        <a href="#" class="badge">framework</a>
        <a href="#" class="badge">design</a>
        <a href="#" class="text_link">Manage topics</a>
      </p>
    </div>
  </div>
</div>
