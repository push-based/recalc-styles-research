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


## Results:

### The total amount of styles is irrelevant

Proof: add the following styles x times to the head of an application and trigger recalculate styles
on any element.

```css
.dummy${i}{color:red;display:block;border:1px solid blue;}
```

> This means, the work being done by recalculate styles is always only related to DOM nodes which 
> are actually affected by a change

### The total amount of DOM is irrelevant

The total amount of DOM is irrelevant for the style recalculations. It is only relevant _where_ the styles
are applied in the DOM.

### The amount of children of a Node affects recalculate styles

The recalculate styles effort grows with the depth of a node targeted by a change.
Toggling a class on a node with many children does create more work for the browser compared to a node
with no children.

e.g.
Toggling a class on `deeply-nested` will cause less styles recalculations compared to toggling the class
on the `div` element

We assume this behavior is described as [`Descendant Invalidation Sets`](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit#bookmark=id.mh94lek836rn)

```html
<div>
  <nested>
    <nested>
      <nested>
        <deeply-nested></deeply-nested>
      </nested>
    </nested>
  </nested>
</div>
```

```css
/* A lot of work */
div.active {
 color: red; 
}

/* less work then above */
deeply-nested.active {
  color: red;
}
```

### Changes of the selector of an element cause work that is independent of the work needed to apply styles to the decendents

This finding stays in contrast to `The amount of children of a Node affects recalculate styles`.
Applying a style change to a container causing one of its children to be affected always costs the 
same amount of style recalculation work, regardless of its depth.

e.g.
Toggling a class on `div` will always cause the same amount of style recalculations regardless of it's nested children and the nesting level.
 

```html
<div>
  <nested id="first">
    <nested>
      <nested>
        <deeply-nested></deeply-nested>
      </nested>
    </nested>
  </nested>
</div>
```

The following style changes will result in the same style recalculation work:

```css
div.active #first {
 color: red; 
}

/* same work as */
div.active deeply-nested {
  color: red;
}
```

## Assumptions without a demo:

**Styles**:
* amount of total rules shipped by styles of application that are applicable to a existing DOM node  
* cardinality
  * id > class > tag
* specificity of style rule
* selector
  * :not(:has(:is(nth-of(...))))
  * there are selectors that are harder to compute than others

**DOM**:
* amount of currently affected DOM nodes (selector change) and its children
  * checked
* nesting depth

## Improvements for the click demo

* input box to change applied class on items
* text-area for css rules on item
