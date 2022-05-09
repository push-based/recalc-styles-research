# What influences recalculate style work

* https://developer.mozilla.org/de/docs/Web/CSS/Specificity
* https://levelup.gitconnected.com/how-to-understand-css-specificity-2caabc5f67a9
* https://dev.to/coderarchive/css-specificity-explained-4n31
* 💪 https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/view#heading=h.v5uqxeqtd5uh
* https://specificity.keegan.st/

## Test

To check the specificity of a selector in the CLI run:
```bash
npx specificity <selectors>
```

This will return the specificity as array. e.g. `npx specificity .test` returns `0,0,1,0`;


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
