<div class="type" markdown="1">

<div class="flag">
  <span>Usage</span>
</div>

{% if page.usage.npm %}
```
npm install {{ page.usage.npm }}
```
{% endif %}

{% if page.usage.scss %}
```scss
@import '{{ page.usage.scss }}';
```
{% endif %}

{% if page.usage.js %}
```js
import {{ page.title }} from '{{ page.usage.js }}'
```
{% endif %}

</div>
