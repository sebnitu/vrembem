---
layout: article
title: "A Registration Form"
description: "This is a description about the registration form."
include:
  css: "styles.css"
---

<form class="form spacing">

  <div class="field">
    <label class="field__label" for="firstName">Username</label>
    <input class="input" type="text" name="firstName" id="firstName" required>
  </div>

  <div class="field">
    <label class="field__label" for="emailAddress">Email address</label>
    <input class="input" type="email" name="emailAddress" id="emailAddress" required>
  </div>

  <div class="field">
    <label class="field__label" for="password">
      <p><strong>Password</strong></p>
      <p class="field__hint" id="passwordhint">Must contain 8+ characters with at least 1 number and 1 uppercase letter.</p>
    </label>
    <input class="input" type="password" name="password" id="password" aria-describedby="passwordhint" required>
  </div>

  <div class="field field_action">
    <div class="field__group">
      <input class="button button_color_primary" type="submit" value="Register">
      <a class="link link_subtle" href="#">Cancel</a>
    </div>
  </div>

</form>
