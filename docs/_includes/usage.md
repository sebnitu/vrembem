<div class="type spacing" markdown="1">

{% if page.usage.npm %}
```
npm install {{ page.package }}
```
{% endif %}

{% if page.usage.scss %}
```scss
@use "{{ page.package }}";
```
{% endif %}

{% if page.usage.js %}
```js
import { {{ page.title }} } from '{{ page.package }}';
```
{% endif %}

</div>
