## SVGs not displaying on PDF

Example:

```html
<nav>
  <a href="https://zellwk.com">
    <div class="zell">{%- include "_svgs/zell.svg" -%}</div>
  </a>
</nav>
```

## --footer-html option not displaying on PDF

Footer file: meta/footer/index.html. This file doesn't get loaded into PDF. Need to check footer configurations when free.
