

/* Get the image box element */
const imageSpinBox = document.querySelector('.image-spin-box');

/* Get all the images inside the spinbox element */
const imagesToSpin = imageSpinBox.querySelectorAll('img');
const totalImages = imagesToSpin.length;

/* Calculate the angle between each image */
const anglePerImage = 360 / totalImages;

/* 
TODO: 
- Handle mousedown event
- Handle mouseup event
- Handle mousemove event
 */

