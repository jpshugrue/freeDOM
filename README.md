# freeDOM
freeDOM is a library written entirely in JavaScript for manipulating the DOM, handling events and making AJAX requests

# Public API

* [selector()](#freeselector-callbacks-selector)
* [html()](#html)
* [empty()](#empty)
* [append()](#appendcontent)
* [attr()](#attrattrname)
* [addCLass()](#addclassclassname)
* [removeClass()](#removeclassclassname)
* [children()](#children)
* [parent()](#parent)
* [find()](#findselector)
* [remove()](#remove)
* [on()](#oneventtype-callback)
* [off()](#offeventtype)
* [ajax()](#ajaxoptions)

## $free(selector, [callbacks]) Selector

Creates and returns a freeDOM collection

```javascript
$free("div");
```

Takes optional callbacks that will be run once the document is ready

```javascript
$free("div", ()=>(console.log("Document is ready")));
```

## Methods

### html()

Without an argument, gets the HTML contents of the first element in the set

```html
<div>First Element</div>
<div>Second Element</div>
```
```javascript
$free("div").html(); // -> "First Element"
```

### html(string)

When a string as an argument, sets the HTML contents of every element in the set

```html
<div>First Element</div>
<div>Second Element</div>
```
```javascript
$free("div").html("Replaced");
```
```html
<div>Replaced</div>
<div>Replaced</div>
```

### empty()

Removes all child nodes of every element in the set

```html
<ul>
  <li>First Item</li>
  <li>Second Item</li>
</ul>
```
```javascript
$free("ul").empty();
```
```html
<ul>
</ul>
```

### append(content)

Adds content to the end of the innerHTML of each element in the set based on the type of content passed in

```html
<div>First Element</div>
<div>Second Element</div>
```
```javascript
$free("div").append(" And More!");
```
```html
<div>First Element And More!</div>
<div>Second Element And More!</div>
```

### attr(attrName)

Returns the value of the given attribute for the first element in the set

```html
<div class="frstElm">First Element</div>
<div class="scndElm">Second Element</div>
```
```javascript
$free("div").attr("class"); // -> "frstElm"
```

### addClass(className)

Adds the given class to each element in the set

```html
<div>First Element</div>
<div>Second Element</div>
```
```javascript
$free("div").addClass("theseDivs");
```
```html
<div class="theseDivs">First Element And More!</div>
<div class="theseDivs">Second Element And More!</div>
```

### removeClass(className)

Remove the given class from each element in the set

```html
<div class="hereBeDiv">First Element</div>
<div class="hereBeDiv">Second Element</div>
```
```javascript
$free("div").removeClass("hereBeDiv");
```
```html
<div>First Element And More!</div>
<div>Second Element And More!</div>
```

### children()

Returns the children of each element in the set

```html
<ul>
  <li>First Item</li>
  <li>Second Item</li>
</ul>
```
```javascript
$free("ul").children();
 // -> DOMNodeCollection{nodes: [li, li]}
```

### parent()

Returns the parent of each element in the set without duplicates

```html
<ul>
  <li>First Item</li>
  <li>Second Item</li>
</ul>
```
```javascript
$free("li").parent();
// -> DOMNodeCollection{nodes: [ul]}
```

### find(selector)

Returns the descendants of each element in the set, filtered by a selector

```html
<div>
  <h1>Header Item</h1>
  <p>Paragraph Item</p>
</div>
```
```javascript
$free("div").find("h1");
// -> DOMNodeCollection{nodes: [h1]}
```

### remove()

Removes each element in the set

```html
<h1>Header</h1>
<div>First div</div>
<div>Second div</div>
```
```javascript
$free("div").remove();
```
```html
<h1>Header</h1>
```

### on(eventType, callback)

Adds an event handler of the given eventType to each element in the set. This event triggers the given callback

```javascript
$free("div").on("click", () => (console.log("I've been clicked")));
```

### off(eventType)

Removes an event handler of the given eventType from each element in the set

```javascript
$free("div").off("click");
```

### ajax(options)

Makes an AJAX request using the given options merged with a set of defaults listed below

Defaults
```javascript
{
  url: "",
  method: 'GET',
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  success: () => {},
  error: () => {},
  data: {}
};
```
```javascript
$free.ajax({
      type: 'GET',
      url: "http://www.testurl.com/data/2.5/weather?q=London,uk",
      success(data) {
        console.log("We have your weather!")
        console.log(data);
      },
      error() {
        console.error("An error occurred.");
      },
   });
```
