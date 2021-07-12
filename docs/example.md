---
layout: page
title: Example
description: "The requested URL was not found."
permalink: /example
---

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
    <button class="button button_color_primary">Submit Form</button>
  </div>
</form>
