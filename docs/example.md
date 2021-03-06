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
  <div class="margin-top-xl">
    <div class="level">
      <button type="button" class="button button_color_primary">Button</button>
      <button type="button" class="button">Button</button>
    </div>
  </div>
</form>

## Buttons

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

## Icon-action

<div class="padding">
  <div class="level">
    <button type="button" class="icon-action">
      {% include icon.html icon="x" %}
    </button>
    <button type="button" class="icon-action">
      {% include icon.html icon="minus" %}
    </button>
    <button type="button" class="icon-action">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button type="button" class="icon-action icon-action_subtle">
      {% include icon.html icon="x" %}
    </button>
    <button type="button" class="icon-action icon-action_subtle">
      {% include icon.html icon="minus" %}
    </button>
    <button type="button" class="icon-action icon-action_subtle">
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
    <button type="button" class="icon-action icon-action_invert">
      {% include icon.html icon="x" %}
    </button>
    <button type="button" class="icon-action icon-action_invert">
      {% include icon.html icon="minus" %}
    </button>
    <button type="button" class="icon-action icon-action_invert">
      {% include icon.html icon="maximize-2" %}
    </button>
    <button type="button" class="icon-action icon-action_subtle icon-action_invert">
      {% include icon.html icon="x" %}
    </button>
    <button type="button" class="icon-action icon-action_subtle icon-action_invert">
      {% include icon.html icon="minus" %}
    </button>
    <button type="button" class="icon-action icon-action_subtle icon-action_invert">
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

## Menu

<div class="gap-y">
  <ul class="menu menu_inline">
    <li class="menu__item">
      <button class="menu__action">Undo</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Redo</button>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <button class="menu__action">Cut</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Copy</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Paste</button>
    </li>
  </ul>
  <ul class="menu">
    <li class="menu__item">
      <button class="menu__action">Undo</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Redo</button>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <button class="menu__action">Cut</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Copy</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Paste</button>
    </li>
  </ul>
</div>
