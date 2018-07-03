---
layout: base
title: GitHub
---

<!-- <Section> -->
<!--
  Includes:
  * Section
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
<div class="section section_size_sm bg_primary">
  <div class="section__container container">

    <div class="grid grid_flatten">

      <div class="grid__item">
        <ul class="menu menu_theme_inverted">
          <li class="menu__item">
            <a href="#" class="menu__link menu__link_icon">
              {% include icon.html icon="anchor" %}
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
      </div><!-- .grid__item -->

      <div class="grid__item size_auto">
        <ul class="menu menu_theme_inverted">
          <li class="menu__item">
            <a href="#" class="menu__link menu__link_icon tooltip tooltip_pos_down-right" data-tooltip="You have no unread notifications">
              {% include icon.html icon="bell" %}
            </a>
          </li>
          <li class="menu__item dropdown on-hover">
            <a href="#" class="menu__link menu__link_icon dropdown__trigger">
              {% include icon.html icon="plus-circle" %}
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
              {% include icon.html icon="user" %}
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
      </div><!-- .grid__item -->

    </div><!-- .grid -->

  </div><!-- .container -->
</div><!-- .section -->
<!-- </Section> -->

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
<div class="section section_size_sm bg_shade">
  <div class="container spacing">
    <div class="grid">
      <div class="grid__item level">
        {% include icon.html icon="book" %}
        <ul class="breadcrumb breadcrumb_size_large">
          <li class="breadcrumb__item">
            <a href="#" class="breadcrumb__link">username</a>
          </li>
          <li class="breadcrumb__item">
            <a href="#" class="breadcrumb__link">project</a>
          </li>
        </ul>
      </div>
      <div class="grid__item size_auto level">
        <div class="button-group">
          <div class="button-group__item button dropdown on-hover">
            {% include icon.html icon="eye" %}
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
                  {% include icon.html icon="circle" %}
                  <div>
                    <h2 class="dropdown__title">Not Watching</h2>
                    <p>Be notified when participating or @mentioned.</p>
                  </div>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link dropdown__link_align_top">
                  {% include icon.html icon="check-circle" %}
                  <div>
                    <h2 class="dropdown__title">Watching</h2>
                    <p>Be notified of all conversations.</p>
                  </div>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link dropdown__link_align_top">
                  {% include icon.html icon="circle" %}
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
            {% include icon.html icon="star" %}
            <span>Star</span>
          </button>
          <button class="button-group__item button">
            <span>0</span>
          </button>
        </div>
        <div class="button-group">
          <button class="button-group__item button">
            {% include icon.html icon="git-branch" %}
            <span>Fork</span>
          </button>
          <button class="button-group__item button">
            <span>0</span>
          </button>
        </div>
      </div>
    </div><!-- .grid -->

    <ul class="menu menu_full">
      <li class="menu__item">
        <a href="#" class="menu__link is-active">
          {% include icon.html icon="code" %}
          <span>Code</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="alert-circle" %}
          <span>Issues</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="git-pull-request" %}
          <span>Pull requests</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="grid" %}
          <span>Projects</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="book-open" %}
          <span>Wiki</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="pie-chart" %}
          <span>Insights</span>
        </a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">
          {% include icon.html icon="settings" %}
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
<div class="section section_size_sm">
  <div class="container spacing">
    <div class="grid">
      <div class="grid__item spacing spacing_size_small">
        <p>Some project description goes here...</p>
        <p class="level level_spacing_xs">
          <a href="#" class="badge badge_color_primary badge_link">css</a>
          <a href="#" class="badge badge_color_primary badge_link">components</a>
          <a href="#" class="badge badge_color_primary badge_link">library</a>
          <a href="#" class="badge badge_color_primary badge_link">framework</a>
          <a href="#" class="badge badge_color_primary badge_link">design</a>
          <span><a href="#" class="text_size_small text_link">Manage topics</a></span>
        </p>
      </div>
      <div class="grid__item size_auto">
        <button class="button">Edit</button>
      </div>
    </div><!-- .grid -->
    <div class="section section_size_sm bg_shade-light spacing">
      <ul class="menu menu_full">
        <li class="menu__item">
          <a href="#" class="menu__link">
            {% include icon.html icon="git-commit" %}
            <span>873 commits</span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            {% include icon.html icon="git-branch" %}
            <span>2 branch</span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            {% include icon.html icon="tag" %}
            <span>52 releases</span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            {% include icon.html icon="users" %}
            <span>6 contributor</span>
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            {% include icon.html icon="clipboard" %}
            <span>MIT</span>
          </a>
        </li>
      </ul>
      <hr class="hr" />
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
                  {% include icon.html icon="check-circle" %}
                  <span>master</span>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link">
                  {% include icon.html icon="circle" %}
                  <span>feat/some-update</span>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link">
                  {% include icon.html icon="circle" %}
                  <span>update/some-update</span>
                </a>
              </li>
              <li class="dropdown__item">
                <a href="#" class="dropdown__link">
                  {% include icon.html icon="circle" %}
                  <span>bug/some-update</span>
                </a>
              </li>
            </ul>
          </div>
          <button class="button">
            <span>New pull request</span>
          </button>
        </div>
        <div class="grid__item size_auto level">
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
                  <div class="level justify_split">
                    <div class="level">
                      <h3>Clone with HTTPS</h3>
                      <a href="#" class="level">
                        {% include icon.html icon="help-circle" %}
                      </a>
                    </div>
                    <a href="#" class="text_link">Use SSH</a>
                  </div>
                  <p>Use Git or checkout with SVN using the web URL</p>
                  <form>
                    <div class="input-group">
                      <input type="text" class="input-group__item input" value="https://github.com/username/ProjectNames.git" readonly />
                      <button class="input-group__item input-group__item_grow_none button">
                        {% include icon.html icon="clipboard" %}
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
<div class="section section_size_sm">
  <div class="container">

    <div class="b radius">
      <div class="p_1 bg_shade-light radius_t level justify_between">
        <span class="level">
          <img class="radius" src="https://picsum.photos/20/20/?random" width="20" height="20" />
          <span>
            <strong>sebnitu</strong> Merge branch 'master' of <a class="link" href="#">http://github.com/sebnitu/vrembem</a>
          </span>
        </span>
        <span>
          Lastest commit 7597aa1 26 days ago
        </span>
      </div>
      <div class="grid bt m_0">
        <div class="grid__item size_2 level">
          {% include icon.html icon="folder" %}
          <span>css</span>
        </div>
        <div class="grid__item">
          Updated version
        </div>
        <div class="grid__item size_auto">
          26 days ago
        </div>
      </div>
      <div class="grid bt m_0">
        <div class="grid__item size_2 level">
          {% include icon.html icon="folder" %}
          <span>scss</span>
        </div>
        <div class="grid__item">
          Updated version
        </div>
        <div class="grid__item size_auto">
          26 days ago
        </div>
      </div>
      <div class="grid bt m_0">
        <div class="grid__item size_2 level">
          {% include icon.html icon="folder" %}
          <span>src</span>
        </div>
        <div class="grid__item">
          Updated version
        </div>
        <div class="grid__item size_auto">
          26 days ago
        </div>
      </div>

      <div class="grid bt m_0">
        <div class="grid__item size_2 level">
          {% include icon.html icon="file" %}
          <span>.gitignore</span>
        </div>
        <div class="grid__item">
          Added demo to the ignored directories
        </div>
        <div class="grid__item size_auto">
          5 months ago
        </div>
      </div>
      <div class="grid bt m_0">
        <div class="grid__item size_2 level">
          {% include icon.html icon="file" %}
          <span>LICENSE</span>
        </div>
        <div class="grid__item">
          Updated the year
        </div>
        <div class="grid__item size_auto">
          4 months ago
        </div>
      </div>
      <div class="grid bt m_0">
        <div class="grid__item size_2 level">
          {% include icon.html icon="file" %}
          <span>README.md</span>
        </div>
        <div class="grid__item">
          Updated imports section
        </div>
        <div class="grid__item size_auto">
          4 months ago
        </div>
      </div>
      <div class="grid bt m_0">
        <div class="grid__item size_2 level">
          {% include icon.html icon="file" %}
          <span>package.json</span>
        </div>
        <div class="grid__item">
          Merge branch 'master' of http://github.com/sebnitu/vrembem
        </div>
        <div class="grid__item size_auto">
          26 days ago
        </div>
      </div>
      <div class="grid bt m_0">
        <div class="grid__item size_2 level">
          {% include icon.html icon="file" %}
          <span>yarn.lock</span>
        </div>
        <div class="grid__item">
          Updated packages
        </div>
        <div class="grid__item size_auto">
          4 months ago
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
<div class="section section_size_sm">
  <div class="container">

    <div class="b radius">
      <div class="bg_shade-light p_1 level level_spacing_xs">
        {% include icon.html icon="book-open" %}
        <span>README.md</span>
      </div>
      <div class="bt p_3 type">
        <h1>Vrembem</h1>
        <p>A CSS component library based on the BEM methodology.</p>
        <h2>Usage</h2>
        <p>A quick way to start using Vrembem now is to install it via a package manager.</p>
        <code><pre># Using NPM
npm install vrembem

# Using Yarn
yarn add vrembem</pre></code>
      </div>
    </div>

    <hr class="hr mt_3" />

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
    <div class="grid justify_between">
      <div class="grid__item size_auto level">
        <ul class="menu">
          <li class="menu__item">
            <span class="menu__text">&copy; {{ site.year }}</span>
          </li>
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
      <div class="grid__item size_auto">
        <a href="#" class="button button_color_fade button_icon">
          {% include icon.html icon="anchor" %}
        </a>
      </div>
      <div class="grid__item size_auto">
        <ul class="menu">
          <li class="menu__item">
            <a href="#" class="menu__link">Contact Us</a>
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
    </div><!-- .grid -->
  </div><!-- .container -->
</footer><!-- .section -->
<!-- </Section> -->
