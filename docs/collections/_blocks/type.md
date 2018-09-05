---
layout: page
title: Type
desc: "The type utility component is used for displaying formatted text like you would see in a blog post or document."
---

<h2 class="h2"><code>type</code></h2>

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="type">
      <h1>h1 Heading <code>inline code</code></h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et erat diam. Nullam tincidunt metus leo, id <a href="#">this is a link</a> imperdiet diam pulvinar vel. Etiam nec ultricies quam. Maecenas eu commodo nulla, at sagittis erat. Ut sit <code>inline code</code> amet viverra lacus, ac feugiat augue. Morbi ultricies quam sed diam dignissim blandit. Phasellus <mark>lobortis lorem a mi dapibus, sit amet rutrum augue sollicitudin</mark>.</p>

      <h2>h2 Heading</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et erat diam. Nullam tincidunt metus leo, id <a href="#">this is a link</a> imperdiet diam pulvinar vel. Etiam nec ultricies quam. Maecenas eu commodo nulla, at sagittis erat. Ut sit amet viverra lacus, ac feugiat augue. Morbi ultricies quam sed diam dignissim blandit. Phasellus lobortis lorem a mi dapibus, sit amet rutrum augue sollicitudin.</p>

      <table>
      <thead>
      <tr>
      <th>Tables</th>
      <th>Are</th>
      <th>Cool</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>col 3 is</td>
      <td>right-aligned</td>
      <td>$1600</td>
      </tr>
      <tr>
      <td>col 2 is</td>
      <td>centered</td>
      <td>$12</td>
      </tr>
      <tr>
      <td>zebra stripes</td>
      <td>are neat</td>
      <td>$1</td>
      </tr>
      <tr>
      <td>col 3 is</td>
      <td>right-aligned</td>
      <td>$1600</td>
      </tr>
      <tr>
      <td>col 2 is</td>
      <td>centered</td>
      <td>$12</td>
      </tr>
      <tr>
      <td>zebra stripes</td>
      <td>are neat</td>
      <td>$1</td>
      </tr>
      </tbody>
      </table>

      <h3>h3 Heading</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et erat diam. Nullam tincidunt metus leo, id <a href="#">this is a link</a> imperdiet diam pulvinar vel. Etiam nec ultricies quam. Maecenas eu commodo nulla, at sagittis erat. Ut sit amet viverra lacus, ac feugiat augue. Morbi ultricies quam sed diam dignissim blandit. Phasellus lobortis lorem a mi dapibus, sit amet rutrum augue sollicitudin.</p>

      <h4>h4 Heading</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et erat diam. Nullam tincidunt metus leo, id <a href="#">this is a link</a> imperdiet diam pulvinar vel. Etiam nec ultricies quam. Maecenas eu commodo nulla, at sagittis erat. Ut sit amet viverra lacus, ac feugiat augue. Morbi ultricies quam sed diam dignissim blandit. Phasellus lobortis lorem a mi dapibus, sit amet rutrum augue sollicitudin.</p>

      <h5>h5 Heading</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et erat diam. Nullam tincidunt metus leo, id <a href="#">this is a link</a> imperdiet diam pulvinar vel. Etiam nec ultricies quam. Maecenas eu commodo nulla, at sagittis erat. Ut sit amet viverra lacus, ac feugiat augue. Morbi ultricies quam sed diam dignissim blandit. Phasellus lobortis lorem a mi dapibus, sit amet rutrum augue sollicitudin.</p>

      <h6>h6 Heading</h6>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et erat diam. Nullam tincidunt metus leo, id <a href="#">this is a link</a> imperdiet diam pulvinar vel. Etiam nec ultricies quam. Maecenas eu commodo nulla, at sagittis erat. Ut sit amet viverra lacus, ac feugiat augue. Morbi ultricies quam sed diam dignissim blandit. Phasellus lobortis lorem a mi dapibus, sit amet rutrum augue sollicitudin.</p>

      <pre><code>var item = function(el) {
  return el + el;
}</code></pre>

      <hr />

      <blockquote cite="https://www.huxley.net/bnw/four.html">
        <p>Words can be like X-rays, if you use them properly – they'll go through anything. You read and you're pierced.</p>
        <p><cite>&mdash; Aldous Huxley, Brave New World</cite></p>
      </blockquote>

      <ul>
        <li>This is a list item here</li>
        <li>This is a list item here<ul>
          <li>This is a list item here</li>
          <li>This is a list item here</li>
          <li>This is a list item here</li>
        </ul></li>
        <li>This is a list item here</li>
      </ul>
      <ol>
        <li>This is a list item here</li>
        <li>This is a list item here<ol>
          <li>This is a list item here</li>
          <li>This is a list item here</li>
          <li>This is a list item here</li>
        </ol></li>
        <li>This is a list item here</li>
      </ol>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="type">
  ...
</div>
```
  </div>
  </div>
</div>