<div class="type" markdown="1">

{% comment %}
<div class="flag">
  <span>Usage</span>
</div>
{% endcomment %}

{% if page.usage.npm %}
{% if page.title == "Vrembem" %}
```
npm install {{ page.usage.npm }}
```
{% else %}
```
npm install @vrembem/{{ page.usage.npm }}
```
{% endif %}
{% endif %}

{% if page.usage.scss and page.title != "Core" and page.title != "Vrembem" %}
```scss
@use "@vrembem/{{ page.usage.scss }}";
```
{% endif %}

{% if page.usage.js and page.title != "Core" and page.title != "Vrembem" %}
```js
import { {{ page.title }} } from "@vrembem/{{ page.usage.js }}"
```
{% endif %}

</div>
