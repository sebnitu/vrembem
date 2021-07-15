---
layout: page
title: Example
description: "A page to show component composition examples."
permalink: /example
---

## Form Controls

<form class="gap-y">
  <div class="gap-y-sm">
    <label for="address_street">Street address</label>
    <input class="input" type="text" name="address[street]" id="address_street">
  </div>
  <div>
    <div class="grid grid_gap-y_sm grid_stack_sm">
      <div class="grid__item gap-y-sm">
        <label for="address_city">City</label>
        <input class="input" type="text" name="address[city]" id="address_city">
      </div>
      <div class="grid__item gap-y-sm">
        <label for="address_state">State</label>
        <select class="input input_type_select" name="address[state]" id="address_state">
          <option></option>
          <option>Washington</option>
          <option>Oregon</option>
          <option>California</option>
        </select>
      </div>
      <div class="grid__item gap-y-sm">
        <label for="address_zip">Zip</label>
        <input class="input" type="text" name="address[zip]" id="address_zip">
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid_gap-y_sm grid_stack_sm">
      <div class="grid__item gap-y-sm">
        <label for="form_info">Info</label>
        <div>
          <div class="grid grid_gap_xs">
            <div class="grid__item">
              <input class="input input_state_info" type="text" name="form[info]" id="form_info">
            </div>
            <div class="grid__item grid__item_auto">
              <button type="button" class="button button_state_info">Button</button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid__item gap-y-sm">
        <label for="form_info">Success</label>
        <div>
          <div class="grid grid_gap_xs">
            <div class="grid__item">
              <input class="input input_state_success" type="text" name="form[success]" id="form_success">
            </div>
            <div class="grid__item grid__item_auto">
              <button type="button" class="button button_state_success">Button</button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid__item gap-y-sm">
        <label for="form_info">Caution</label>
        <div>
          <div class="grid grid_gap_xs">
            <div class="grid__item">
              <input class="input input_state_caution" type="text" name="form[caution]" id="form_caution">
            </div>
            <div class="grid__item grid__item_auto">
              <button type="button" class="button button_state_caution">Button</button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid__item gap-y-sm">
        <label for="form_info">Danger</label>
        <div>
          <div class="grid grid_gap_xs">
            <div class="grid__item">
              <input class="input input_state_danger" type="text" name="form[danger]" id="form_danger">
            </div>
            <div class="grid__item grid__item_auto">
              <button type="button" class="button button_state_danger">Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid_gap-y_sm grid_stack_sm">
      <div class="grid__item gap-y-sm">
        <label>Checkbox</label>
        <div>
          {% include checkbox.html checked="" %}
          {% include checkbox.html indeterminate="true" %}
          {% include checkbox.html %}
        </div>
      </div>
      <div class="grid__item gap-y-sm">
        <label for="form-radio">Radio</label>
        <div>
          {% include radio.html name="form-radio" checked="" %}
          {% include radio.html name="form-radio" %}
        </div>
      </div>
      <div class="grid__item gap-y-sm">
        <label>Switch</label>
        <div>
          {% include switch.html %}
          {% include switch.html checked="" %}
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="grid grid_gap-x_xs grid_stack_sm">
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_icon button_size_sm button_color_secondary">
          {% include icon.html icon="anchor" %}
        </button>
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_size_sm button_color_secondary">
          {% include icon.html icon="anchor" %}
          <span>Button</span>
        </button>
      </div>
      <div class="grid__item">
        <input class="input input_size_sm" type="text">
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_size_sm">
          <span>Button</span>
          {% include icon.html icon="anchor" %}
        </button>
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_icon button_size_sm">
          {% include icon.html icon="anchor" %}
        </button>
      </div>
    </div>
    <div class="grid grid_gap-x_xs grid_stack_sm">
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_icon button_color_secondary">
          {% include icon.html icon="anchor" %}
        </button>
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_color_secondary">
          {% include icon.html icon="anchor" %}
          <span>Button</span>
        </button>
      </div>
      <div class="grid__item">
        <input class="input" type="text">
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button">
          <span>Button</span>
          {% include icon.html icon="anchor" %}
        </button>
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_icon">
          {% include icon.html icon="anchor" %}
        </button>
      </div>
    </div>
    <div class="grid grid_gap-x_xs grid_stack_sm">
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_icon button_size_lg button_color_secondary">
          {% include icon.html icon="anchor" %}
        </button>
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_size_lg button_color_secondary">
          {% include icon.html icon="anchor" %}
          <span>Button</span>
        </button>
      </div>
      <div class="grid__item">
        <input class="input input_size_lg" type="text">
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_size_lg">
          <span>Button</span>
          {% include icon.html icon="anchor" %}
        </button>
      </div>
      <div class="grid__item grid__item_auto">
        <button type="button" class="button button_icon button_size_lg">
          {% include icon.html icon="anchor" %}
        </button>
      </div>
    </div>
  </div>
</form>

## Button

<div class="padding">
  <div class="level">
    <button class="button">Button</button>
    <button class="button button_subtle">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_secondary">Button</button>
    <button class="button button_state_info">Button</button>
    <button class="button button_state_success">Button</button>
    <button class="button button_state_caution">Button</button>
    <button class="button button_state_danger">Button</button>
  </div>
</div>

<div class="padding radius background-night">
  <div class="level">
    <button class="button button_invert">Button</button>
    <button class="button button_subtle button_invert">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_secondary">Button</button>
    <button class="button button_state_info">Button</button>
    <button class="button button_state_success">Button</button>
    <button class="button button_state_caution">Button</button>
    <button class="button button_state_danger">Button</button>
  </div>
</div>

<div class="padding">
  <div class="level">
    <button class="button is-loading">Button</button>
    <button class="button is-loading button_subtle">Button</button>
    <button class="button is-loading button_color_primary">Button</button>
    <button class="button is-loading button_color_secondary">Button</button>
    <button class="button is-loading button_state_info">Button</button>
    <button class="button is-loading button_state_success">Button</button>
    <button class="button is-loading button_state_caution">Button</button>
    <button class="button is-loading button_state_danger">Button</button>
  </div>
</div>

<div class="padding radius background-night">
  <div class="level">
    <button class="button is-loading button_invert">Button</button>
    <button class="button is-loading button_subtle button_invert">Button</button>
    <button class="button is-loading button_color_primary">Button</button>
    <button class="button is-loading button_color_secondary">Button</button>
    <button class="button is-loading button_state_info">Button</button>
    <button class="button is-loading button_state_success">Button</button>
    <button class="button is-loading button_state_caution">Button</button>
    <button class="button is-loading button_state_danger">Button</button>
  </div>
</div>

## Icon-action

<div class="padding">
  <div class="level">
    <button class="icon-action">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action icon-action_subtle">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action icon-action_subtle">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action icon-action_subtle">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action icon-action_state_info">
      {% include icon.html icon="anchor" %}
    </button>
    <button class="icon-action icon-action_state_success">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action icon-action_state_caution">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action icon-action_state_danger">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>

<div class="padding radius background-night">
  <div class="level">
    <button class="icon-action icon-action_invert">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action icon-action_invert">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action icon-action_invert">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action icon-action_subtle icon-action_invert">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action icon-action_subtle icon-action_invert">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action icon-action_subtle icon-action_invert">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action icon-action_state_info">
      {% include icon.html icon="anchor" %}
    </button>
    <button class="icon-action icon-action_state_success">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action icon-action_state_caution">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action icon-action_state_danger">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>

<div class="padding">
  <div class="level">
    <button class="icon-action is-loading">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action is-loading">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action is-loading">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action is-loading icon-action_subtle">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action is-loading icon-action_subtle">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action is-loading icon-action_subtle">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action is-loading icon-action_state_info">
      {% include icon.html icon="anchor" %}
    </button>
    <button class="icon-action is-loading icon-action_state_success">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action is-loading icon-action_state_caution">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action is-loading icon-action_state_danger">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>

<div class="padding radius background-night">
  <div class="level">
    <button class="icon-action is-loading icon-action_invert">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action is-loading icon-action_invert">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action is-loading icon-action_invert">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action is-loading icon-action_subtle icon-action_invert">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action is-loading icon-action_subtle icon-action_invert">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action is-loading icon-action_subtle icon-action_invert">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action is-loading icon-action_state_info">
      {% include icon.html icon="anchor" %}
    </button>
    <button class="icon-action is-loading icon-action_state_success">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button class="icon-action is-loading icon-action_state_caution">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action is-loading icon-action_state_danger">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
