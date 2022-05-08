# What influences recalculate style work

* https://developer.mozilla.org/de/docs/Web/CSS/Specificity
* https://levelup.gitconnected.com/how-to-understand-css-specificity-2caabc5f67a9
* https://dev.to/coderarchive/css-specificity-explained-4n31

## Assumptions:

**Styles**:
* amount of total rules shipped by styles of application
  * _demo_: add a bunch of styles with button, change color of any element
* cardinality
  * id > class > tag
* specificity of style rule
* selector
  * :not(:has(:is(nth-of(...))))
  * there are selectors that are harder to compute than others

**DOM**:
* amount of currently active dom nodes
  * checked
* nesting depth

## Demos



```html
<body class="hover-button">

    <button></button>

</body>

```

```css
body.hover-button button {
  border-color: red;
}

```

```html
<head>
  <style>
    button.hover-button {
      color: red;
    }
  </style>
</head>
<body >

<button class="hover-button"></button>

</body>

```

```css
button.hover-button {
  border-color: red;
}


```
