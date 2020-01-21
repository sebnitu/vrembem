---
layout: article
title: Utility
description: "The utility component provides a set of atomic classes that specialize in a single function."
category: simple
usage:
  npm: "utility"
  scss: "utility"
---

{% include flag.html heading="background" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch-group">
    <div class="swatch background_primary_lighter"></div>
    <div class="swatch background_primary_light"></div>
    <div class="swatch background_primary"></div>
    <div class="swatch background_primary_dark"></div>
    <div class="swatch background_primary_darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_secondary_lighter"></div>
    <div class="swatch background_secondary_light"></div>
    <div class="swatch background_secondary"></div>
    <div class="swatch background_secondary_dark"></div>
    <div class="swatch background_secondary_darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_shade_light"></div>
    <div class="swatch background_shade"></div>
    <div class="swatch background_shade_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_night_light"></div>
    <div class="swatch background_night"></div>
    <div class="swatch background_night_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_info_lighter"></div>
    <div class="swatch background_info_light"></div>
    <div class="swatch background_info"></div>
    <div class="swatch background_info_dark"></div>
    <div class="swatch background_info_darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_success_lighter"></div>
    <div class="swatch background_success_light"></div>
    <div class="swatch background_success"></div>
    <div class="swatch background_success_dark"></div>
    <div class="swatch background_success_darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_caution_lighter"></div>
    <div class="swatch background_caution_light"></div>
    <div class="swatch background_caution"></div>
    <div class="swatch background_caution_dark"></div>
    <div class="swatch background_caution_darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_danger_lighter"></div>
    <div class="swatch background_danger_light"></div>
    <div class="swatch background_danger"></div>
    <div class="swatch background_danger_dark"></div>
    <div class="swatch background_danger_darker"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_black"></div>
    <div class="swatch border border_left_0 background_white"></div>
    <div class="swatch border border_left_0 background_transparent"></div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="background_primary_lighter"></div>
<div class="background_primary_light"></div>
<div class="background_primary"></div>
<div class="background_primary_dark"></div>
<div class="background_primary_darker"></div>
...
```
{% include demo_close.html %}

{% include flag.html heading="border" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background_shade_light border"></div>
  <div class="swatch background_shade_light border_top"></div>
  <div class="swatch background_shade_light border_right"></div>
  <div class="swatch background_shade_light border_bottom"></div>
  <div class="swatch background_shade_light border_left"></div>
</div>
{% include demo_switch.html %}
```html
<div class="border"></div>
<div class="border_top"></div>
<div class="border_right"></div>
<div class="border_bottom"></div>
<div class="border_left"></div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background_shade_light border border_0"></div>
  <div class="swatch background_shade_light border border_top_0"></div>
  <div class="swatch background_shade_light border border_right_0"></div>
  <div class="swatch background_shade_light border border_bottom_0"></div>
  <div class="swatch background_shade_light border border_left_0"></div>
</div>
{% include demo_switch.html %}
```html
<div class="border_0"></div>
<div class="border_top_0"></div>
<div class="border_right_0"></div>
<div class="border_bottom_0"></div>
<div class="border_left_0"></div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background_shade_light border border_color_light"></div>
  <div class="swatch background_shade_light border"></div>
  <div class="swatch background_shade_light border border_color_dark"></div>
  <div class="swatch background_shade_light border border_color_darker"></div>
</div>
{% include demo_switch.html %}
```html
<div class="border border_color_light"></div>
<div class="border"></div>
<div class="border border_color_dark"></div>
<div class="border border_color_darker"></div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="padding radius background_night">
  <div class="swatch-group">
    <div class="swatch border border_color_invert-light"></div>
    <div class="swatch border border_color_invert"></div>
    <div class="swatch border border_color_invert-dark"></div>
    <div class="swatch border border_color_invert-darker"></div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="border border_color_invert-light"></div>
<div class="border border_color_invert"></div>
<div class="border border_color_invert-dark"></div>
<div class="border border_color_invert-darker"></div>
```
{% include demo_close.html %}

{% include flag.html heading="radius" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background_secondary radius"></div>
  <div class="swatch background_secondary radius_square"></div>
  <div class="swatch background_secondary radius_circle"></div>
</div>
{% include demo_switch.html %}
```html
<div class="radius"></div>
<div class="radius_square"></div>
<div class="radius_circle"></div>
```
{% include demo_close.html %}

{% include flag.html heading="elevate" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="padding_lg background_shade radius">
  <div class="swatch-group">
    <div class="swatch background_white elevate"></div>
    <div class="swatch background_white elevate_flat"></div>
    <div class="swatch background_white elevate_1dp"></div>
    <div class="swatch background_white elevate_4dp"></div>
    <div class="swatch background_white elevate_8dp"></div>
    <div class="swatch background_white elevate_16dp"></div>
    <div class="swatch background_white elevate_24dp"></div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="elevate"></div>
<div class="elevate_flat"></div>
<div class="elevate_1dp"></div>
<div class="elevate_4dp"></div>
<div class="elevate_8dp"></div>
<div class="elevate_16dp"></div>
<div class="elevate_24dp"></div>
```
{% include demo_close.html %}

{% include flag.html heading="color" %}

{% include demo_open.html class_grid="grid_break" class_parent="spacing" %}
<div class="padding radius background_shade_light">
  <div class="swatch-group">
    <span class="color">Color</span>
    <span class="color_subtle">Color light</span>
    <span class="color_primary_lighter">Color primary</span>
    <span class="color_primary_light">Color primary</span>
    <span class="color_primary">Color primary</span>
    <span class="color_primary_dark">Color primary</span>
    <span class="color_primary_darker">Color primary</span>
    <span class="color_secondary_lighter">Color secondary</span>
    <span class="color_secondary_light">Color secondary</span>
    <span class="color_secondary">Color secondary</span>
    <span class="color_secondary_dark">Color secondary</span>
    <span class="color_secondary_darker">Color secondary</span>
    <span class="color_shade_light">Color shade</span>
    <span class="color_shade">Color shade</span>
    <span class="color_shade_dark">Color shade</span>
    <span class="color_night_light">Color night</span>
    <span class="color_night">Color night</span>
    <span class="color_night_dark">Color night</span>
    <span class="color_info_lighter">Color info</span>
    <span class="color_info_light">Color info</span>
    <span class="color_info">Color info</span>
    <span class="color_info_dark">Color info</span>
    <span class="color_info_darker">Color info</span>
    <span class="color_success_lighter">Color success</span>
    <span class="color_success_light">Color success</span>
    <span class="color_success">Color success</span>
    <span class="color_success_dark">Color success</span>
    <span class="color_success_darker">Color success</span>
    <span class="color_caution_lighter">Color caution</span>
    <span class="color_caution_light">Color caution</span>
    <span class="color_caution">Color caution</span>
    <span class="color_caution_dark">Color caution</span>
    <span class="color_caution_darker">Color caution</span>
    <span class="color_danger_lighter">Color danger</span>
    <span class="color_danger_light">Color danger</span>
    <span class="color_danger">Color danger</span>
    <span class="color_danger_dark">Color danger</span>
    <span class="color_danger_darker">Color danger</span>
    <span class="color_black">Color black</span>
    <span class="color_white">Color white</span>
    <span class="color_transparent">Color transparent</span>
  </div>
</div>
<div class="padding radius background_night">
  <div class="swatch-group">
    <span class="color_invert">Color invert</span>
    <span class="color_invert_subtle">Color invert dark</span>
    <span class="color_primary_lighter">Color primary</span>
    <span class="color_primary_light">Color primary</span>
    <span class="color_primary">Color primary</span>
    <span class="color_primary_dark">Color primary</span>
    <span class="color_primary_darker">Color primary</span>
    <span class="color_secondary_lighter">Color secondary</span>
    <span class="color_secondary_light">Color secondary</span>
    <span class="color_secondary">Color secondary</span>
    <span class="color_secondary_dark">Color secondary</span>
    <span class="color_secondary_darker">Color secondary</span>
    <span class="color_shade_light">Color shade</span>
    <span class="color_shade">Color shade</span>
    <span class="color_shade_dark">Color shade</span>
    <span class="color_night_light">Color night</span>
    <span class="color_night">Color night</span>
    <span class="color_night_dark">Color night</span>
    <span class="color_info_lighter">Color info</span>
    <span class="color_info_light">Color info</span>
    <span class="color_info">Color info</span>
    <span class="color_info_dark">Color info</span>
    <span class="color_info_darker">Color info</span>
    <span class="color_success_lighter">Color success</span>
    <span class="color_success_light">Color success</span>
    <span class="color_success">Color success</span>
    <span class="color_success_dark">Color success</span>
    <span class="color_success_darker">Color success</span>
    <span class="color_caution_lighter">Color caution</span>
    <span class="color_caution_light">Color caution</span>
    <span class="color_caution">Color caution</span>
    <span class="color_caution_dark">Color caution</span>
    <span class="color_caution_darker">Color caution</span>
    <span class="color_danger_lighter">Color danger</span>
    <span class="color_danger_light">Color danger</span>
    <span class="color_danger">Color danger</span>
    <span class="color_danger_dark">Color danger</span>
    <span class="color_danger_darker">Color danger</span>
    <span class="color_black">Color black</span>
    <span class="color_white">Color white</span>
    <span class="color_transparent">Color transparent</span>
  </div>
</div>
{% include demo_switch.html %}
```html
<span class="color"></span>
<span class="color_subtle"></span>
<span class="color_primary_light"></span>
<span class="color_primary"></span>
<span class="color_primary_dark"></span>
...
```
{% include demo_close.html %}

{% include flag.html heading="display" %}

<div class="spacing">
  <div class="type spacing">
    <p>Display utilities allow you to quickly toggle the display property on an element with an optional breakpoint conditional.</p>
    <pre><code>.display_<span class="color_success">{property}</span>_<span class="color_danger">{breakpoint}</span></code></pre>
  </div>
  <div>
    <div class="grid grid_break_xs">
      <div class="grid__item grid__item_fill">
        <div class="card">
          <div class="card__header">
            <code class="color_success">{property}</code>
          </div>
          <div class="card__body spacing">
            <ul class="list list_between">
              <li class="list__item"><code>inline</code></li>
              <li class="list__item"><code>flex</code></li>
              <li class="list__item"><code>inline-flex</code></li>
              <li class="list__item"><code>block</code></li>
              <li class="list__item"><code>inline-block</code></li>
              <li class="list__item"><code>none</code></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid__item grid__item_fill">
        <div class="card">
          <div class="card__header">
            <code class="color_danger">{breakpoint}</code>
          </div>
          <div class="card__body">
            <ul class="list list_between">
              <li class="list__item">
                <code>xs <span class="color_subtle">...480px</span></code>
              </li>
              <li class="list__item">
                <code>sm <span class="color_subtle">...620px</span></code>
              </li>
              <li class="list__item">
                <code>md <span class="color_subtle">...760px</span></code>
              </li>
              <li class="list__item">
                <code>lg <span class="color_subtle">...990px</span></code>
              </li>
              <li class="list__item">
                <code>xl <span class="color_subtle">...1380px</span></code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_gap_sm">
  <div class="grid__item grid__item_fill span_auto">
    <div class="notice notice_state_info flex_align_center">
      {% include icon.html icon="eye" %}
    </div>
  </div>
  <div class="grid__item">
    <div class="notice notice_state_success display_block display_none_xs">
      <p>Small Mobile</p>
    </div>
    <div class="notice notice_state_success display_none display_block_xs display_none_sm">
      <p>Small Mobile &rarr; Mobile</p>
    </div>
    <div class="notice notice_state_success display_none display_block_sm display_none_md">
      <p>Mobile &rarr; Tablet</p>
    </div>
    <div class="notice notice_state_success display_none display_block_md display_none_lg">
      <p>Tablet &rarr; Desktop</p>
    </div>
    <div class="notice notice_state_success display_none display_block_lg display_none_xl">
      <p>Desktop &rarr; Large Desktop</p>
    </div>
    <div class="notice notice_state_success display_none display_block_xl">
      <p>Large Desktop</p>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="display_block display_none_xs">
  <p>Small Mobile</p>
</div>
<div class="display_none display_block_xs display_none_sm">
  <p>Small Mobile &rarr; Mobile</p>
</div>
<div class="display_none display_block_sm display_none_md">
  <p>Mobile &rarr; Tablet</p>
</div>
<div class="display_none display_block_md display_none_lg">
  <p>Tablet &rarr; Desktop</p>
</div>
<div class="display_none display_block_lg display_none_xl">
  <p>Desktop &rarr; Large Desktop</p>
</div>
<div class="display_none display_block_xl">
  <p>Large Desktop</p>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="flex" %}

{% include demo_open.html class_grid="grid_break" class_parent="spacing" %}
<div class="flex flex_justify_between flex_align_end border padding_xs">
  <div class="swatch box margin_xs"></div>
  <div class="swatch box margin_xs" style="height: auto"></div>
  <div class="swatch box margin_xs" style="height: auto"></div>
</div>
<div class="flex flex_justify_end flex_align_stretch border padding_xs">
  <div class="swatch box margin_xs" style="height: auto"></div>
  <div class="swatch box margin_xs" style="height: auto"></div>
  <div class="swatch box margin_xs"></div>
</div>
<div class="flex flex_justify_center flex_align_center border padding_xs">
  <div class="swatch box margin_xs" style="height: auto"></div>
  <div class="swatch box margin_xs" style="height: auto"></div>
  <div class="swatch box margin_xs"></div>
</div>
<div class="flex flex_items_equal border padding_xs">
  <div class="swatch box margin_xs"></div>
  <div class="swatch box margin_xs"></div>
  <div class="swatch box margin_xs"></div>
</div>
{% include demo_switch.html %}
```html
<div class="flex flex_justify_between flex_align_end"></div>
<div class="flex flex_justify_end flex_align_stretch"></div>
<div class="flex flex_justify_center flex_align_center"></div>
<div class="flex flex_items_equal"></div>
```
{% include demo_close.html %}

{% include flag.html heading="margin" %}

<div class="spacing">
  <div class="type spacing">
    <p>Add margin to an element using directional and size modifiers.</p>
    <pre><code>.margin
.margin_<span class="color_danger">{size}</span>
.margin_<span class="color_success">{direction}</span>_<span class="color_danger">{size}</span></code></pre>
  </div>
  <div>
    <div class="grid grid_break_xs">
      <div class="grid__item grid__item_fill">
        <div class="card">
          <div class="card__header">
            <code class="color_success">{direction}</code>
          </div>
          <div class="card__body spacing">
            <ul class="list list_between">
              <li class="list__item"><code>top</code></li>
              <li class="list__item"><code>right</code></li>
              <li class="list__item"><code>bottom</code></li>
              <li class="list__item"><code>left</code></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid__item grid__item_fill">
        <div class="card">
          <div class="card__header">
            <code class="color_danger">{size}</code>
          </div>
          <div class="card__body">
            <ul class="list list_between">
              <li class="list__item">
                <code>0 <span class="color_subtle">...0</span></code>
              </li>
              <li class="list__item">
                <code>xs <span class="color_subtle">...0.5rem</span></code>
              </li>
              <li class="list__item">
                <code>sm <span class="color_subtle">...1rem</span></code>
              </li>
              <li class="list__item">
                <code>md <span class="color_subtle">...1.5rem</span></code>
              </li>
              <li class="list__item">
                <code>lg <span class="color_subtle">...2rem</span></code>
              </li>
              <li class="list__item">
                <code>xl <span class="color_subtle">...3rem</span></code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{% include flag.html heading="padding" %}

<div class="spacing">
  <div class="type spacing">
    <p>Add padding to an element using directional and size modifiers.</p>
    <pre><code>.padding
.padding_<span class="color_danger">{size}</span>
.padding_<span class="color_success">{direction}</span>_<span class="color_danger">{size}</span></code></pre>
  </div>
  <div>
    <div class="grid grid_break_xs">
      <div class="grid__item grid__item_fill">
        <div class="card">
          <div class="card__header">
            <code class="color_success">{direction}</code>
          </div>
          <div class="card__body spacing">
            <ul class="list list_between">
              <li class="list__item"><code>top</code></li>
              <li class="list__item"><code>right</code></li>
              <li class="list__item"><code>bottom</code></li>
              <li class="list__item"><code>left</code></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid__item grid__item_fill">
        <div class="card">
          <div class="card__header">
            <code class="color_danger">{size}</code>
          </div>
          <div class="card__body">
            <ul class="list list_between">
              <li class="list__item">
                <code>0 <span class="color_subtle">...0</span></code>
              </li>
              <li class="list__item">
                <code>xs <span class="color_subtle">...0.5rem</span></code>
              </li>
              <li class="list__item">
                <code>sm <span class="color_subtle">...1rem</span></code>
              </li>
              <li class="list__item">
                <code>md <span class="color_subtle">...1.5rem</span></code>
              </li>
              <li class="list__item">
                <code>lg <span class="color_subtle">...2rem</span></code>
              </li>
              <li class="list__item">
                <code>xl <span class="color_subtle">...3rem</span></code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{% include flag.html heading="spacing" %}

{% include demo_open.html class_grid="grid_break" class_parent="spacing" %}
<div class="border padding spacing">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

<div class="border padding spacing_xl">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
{% include demo_switch.html %}
```html
<div class="spacing">...</div>
<div class="spacing_xl">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="text" %}

{% include demo_open.html %}
<ul class="list list_between">
  <li class="list__item">
    <p class="text_size_sm">Text size small</p>
  </li>
  <li class="list__item">
    <p class="text_size_lg">Text size large</p>
  </li>
  <li class="list__item">
    <p class="text_capitalize">Text capitalize</p>
  </li>
  <li class="list__item">
    <p class="text_lowercase">Text lowercase</p>
  </li>
  <li class="list__item">
    <p class="text_uppercase">Text uppercase</p>
  </li>
  <li class="list__item">
    <p class="text_align_left">Text align left</p>
  </li>
  <li class="list__item">
    <p class="text_align_center">Text align center</p>
  </li>
  <li class="list__item">
    <p class="text_align_right">Text align right</p>
  </li>
  <li class="list__item">
    <p class="text_bold">Text bold</p>
  </li>
  <li class="list__item">
    <p><strong>Strong tag <span class="text_normal">with normal text</span></strong></p>
  </li>
  <li class="list__item">
    <p class="text_italic">Text italic</p>
  </li>
  <li class="list__item">
    <p class="text_strike">Text strike</p>
  </li>
  <li class="list__item">
    <p class="text_underline">Text underline</p>
  </li>
  <li class="list__item">
    <p class="text_underline_dotted">Text underline dotted</p>
  </li>
  <li class="list__item">
    <p class="text_underline_dashed">Text underline dashed</p>
  </li>
  <li class="list__item">
    <p class="text_wrap">Text wrap</p>
  </li>
  <li class="list__item">
    <p class="text_nowrap">Text nowrap</p>
  </li>
  <li class="list__item">
    <p class="text_overflow_ellipsis">Text overflow ellipsis text overflow ellipsis text overflow ellipsis text overflow ellipsis</p>
  </li>
  <li class="list__item">
    <p class="text_lead">Text lead</p>
  </li>
</ul>
{% include demo_switch.html %}
```html
<!-- Size -->
<p class="text_size_sm">...</p>
<p class="text_size_lg">...</p>

<!-- Transform -->
<p class="text_capitalize">...</p>
<p class="text_lowercase">...</p>
<p class="text_uppercase">...</p>

<!-- Align -->
<p class="text_align_left">...</p>
<p class="text_align_center">...</p>
<p class="text_align_right">...</p>

<!-- Weight & Style -->
<p class="text_bold">...</p>
<p class="text_normal">...</p>
<p class="text_italic">...</p>

<!-- Decoration -->
<p class="text_strike">...</p>
<p class="text_underline">...</p>
<p class="text_underline_dotted">...</p>
<p class="text_underline_dashed">...</p>

<!-- Wrap -->
<p class="text_wrap">...</p>
<p class="text_nowrap">...</p>
<p class="text_overflow_ellipsis">...</p>

<!-- Other -->
<p class="text_lead">...</p>
```
{% include demo_close.html %}
