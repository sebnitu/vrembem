<div class="type" markdown="1">

{% comment %}
<div class="flag">
  <span>Usage</span>
</div>
{% endcomment %}

{% if page.usage.npm %}
```
npm install {{ page.usage.npm }}
```
{% endif %}

{% if page.usage.scss and page.title != "Core" %}
```scss
@import "{{ page.usage.scss }}";
```
{% endif %}

{% if page.usage.js and page.title != "Core" %}
```js
import { {{ page.title }} } from "{{ page.usage.js }}"
```
{% endif %}

</div>
