---
layout: page
title: Login
---

<div class="section">
  <div class="container">

    <form class="spacing_md bg_shade-light radius p_3 mx_auto" style="max-width: 30rem;">
      <div class="spacing text_align_center">
        {% include icon.html icon="anchor" class="icon_size_lg" %}
        <h2 class="h2">Sign In</h2>
      </div>
      <hr class="hr" />
      <div class="spacing_xs">
        <label for="login-username">Username</label>
        <input id="login-username" class="input" placeholder="" type="text" />
      </div>
      <div class="spacing_xs">
        <label for="login-password">Password</label>
        <input id="login-password" class="input" placeholder="" type="password" />
      </div>
      <div class="level justify_between">
        <button class="button button_color_primary">Log in</button>
        <label class="level level_spacing_xs">
          <input type="checkbox" />
          <span>Remember Me</span>
        </label>
      </div>
      <div class="text_align_center spacing_xs">
        <p>Not registered? <a href="#" class="link">Creat an account</a></p>
        <p><a href="#" class="link">Forgot your username or password?</a></p>
      </div>
    </form>

  </div>
</div>
