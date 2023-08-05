<div id="top"></div>

# Judo Spin

360° degrees image spinner and rotation built with vanilla JavaScript. 

## [View Online Demo](https://rodgath.github.io/judo-spin/demo/)

<br>

# Table of Contents

- [Installation](#installation)
- [Implementation](#implementation)
  - [Method 1](#method-1)
  - [Method 2](#method-2)
  - [Method 3](#method-3)
- [Options](#options)
- [License](#license)

# Installation 

**[A]** Download 

+ [judo-spin.min.js](https://unpkg.com/judo-spin@1.0.0/dist/js/judo-spin.min.js) - Minified
+ [judo-spin.js](https://unpkg.com/judo-spin@1.0.0/dist/js/judo-spin.min.js) - Unminified

**[B]** Package

+ Install with [npm](https://www.npmjs.com/package/judo-spin): `npm install judo-spin` 
* Install with [yarn](https://yarnpkg.com/): `yarn add judo-spin`

**[C]** Get a local working copy of the development repository _(Optional)_ <br />
`git clone https://github.com/Rodgath/judo-spin.git`


# Implementation:
There are several methods you can use to add Judo Spin into your project.

## Method 1

#### Using `data-judo-spin` attribute. [View Demo](https://rodgath.github.io/judo-spin/demo/index2.html)
Your HTML code of upto 36 images
```html
<div data-judo-spin='{ "currImage": "6" }'>
  <img src="images/car/01.png" alt="Image 01">
  <img src="images/car/02.png" alt="Image 02">

  <!-- More Images Here -->
  
  <img src="images/car/35.png" alt="Image 35">
  <img src="images/car/36.png" alt="Image 36">
</div>
```

#### Enqueue the judoSpin script at the bottom of your markup
+ Using local script file.
```html
<script src="judo-spin.min.js"></script>
<!-- OR -->
<script src="./node_modules/judo-spin/dist/js/judo-spin.min.js"></script>
```
+ Using CDN file. _(Optional)_
```html
<script src="https://cdn.jsdelivr.net/npm/judo-spin@1.0.0/dist/js/judo-spin.min.js"></script>
```

##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>

---
## Method 2

#### Initializing with `judoSpin` function. [View Demo](https://rodgath.github.io/judo-spin/demo/index.html)
Your HTML code of upto 36 images
```html
<div class="image-spin-box">
  <img src="images/car/01.png" alt="Image 01">
  <img src="images/car/02.png" alt="Image 02">

  <!-- More Images Here -->
  
  <img src="images/car/35.png" alt="Image 35">
  <img src="images/car/36.png" alt="Image 36">
</div>
```

#### Call the `judoSpin()` function with two arguments.
...**1)** The element _'class'_ or _'id'_ holding the images 

...**2)** The _'options'_ object
```javascript
document.addEventListener('DOMContentLoaded', function() {
  judoSpin('.image-spin-box', { currImage: 1, enableDragHangle: true });
});
```

#### Enqueue the judoSpin script at the bottom of your markup
+ Using local script file.
```html
<script src="judo-spin.min.js"></script>
<!-- OR -->
<script src="./node_modules/judo-spin/dist/js/judo-spin.min.js"></script>
```
+ Using CDN file. _(Optional)_
```html
<script src="https://cdn.jsdelivr.net/npm/judo-spin@1.0.0/dist/js/judo-spin.min.js"></script>
```

##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>

---
## Method 3

#### Using JSON object of images
...**[A]** - Adding the JSON object inside the `data-judo-spin` attribute. [View Demo](https://rodgath.github.io/judo-spin/demo/index3.html)

```html
<div data-judo-spin='{ 
    "currImage": 13,
    "images": [
      { "src": "images/car/01.png", "title": "Image 01" },
      { "src": "images/car/02.png", "title": "Image 02" },
      
      // More Images Here

      { "src": "images/car/35.png", "title": "Image 35" },
      { "src": "images/car/36.png", "title": "Image 36" }
    ] 
  }'></div>
```

...**[B]** - Add the JSON object inside the `judoSpin` function. [View Demo](https://rodgath.github.io/judo-spin/demo/index4.html)

HTML code.
```html
<div class="image-rotation-box image-spin-demo"></div>
```
JavaScript code

```javascript
document.addEventListener('DOMContentLoaded', function() {
   judoSpin('.image-rotation-box', {
      currImage: 22, 
      images: [
        { "src": "images/car/01.png", "title": "Image 01" },
        { "src": "images/car/02.png", "title": "Image 02" },
        
        // More Images Here

        { "src": "images/car/35.png", "title": "Image 35" },
        { "src": "images/car/36.png", "title": "Image 36" }
      ]
    });
});
```
##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>

# Options 

Name | Type | Default | Optional | Description
:--- | :--- | :------ | :------- | :----------
`currImage` | _number_ | 1 | yes | The default image when judo spin loads. Range is _1 - 36_.
`images` | _array_ | - |  yes | Array of images as JSON object.
`enableDragHandle` | _boolean_ | false |  yes | Whether to show the drag handler scroller.

## License
judoSpin is an open-source project released under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

---

Crafted by [Rodgath](https://twitter.com/Rodgath)
##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>