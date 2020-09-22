<div class="type gap-y" markdown="1">

{% if page.usage.npm %}
```sh
npm install {{ page.package }}
```
{% endif %}

{% if page.usage.scss %}
```scss
@use "{{ page.package }}";
```
{% endif %}

{% if page.usage.js %}
{% if page.title == 'Vrembem' %}
```js
import * from '{{ page.package }}';
```
{% else %}
```js
import {{ page.title }} from '{{ page.package }}';
```
{% endif %}
{% endif %}

</div>
