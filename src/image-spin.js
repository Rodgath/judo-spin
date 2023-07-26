
function imageSpin(element, options) {

  var defaults = {
    currImg: 1,
  };

  options = Object.assign({}, defaults, options);
    
  /* Current image starts at 0 */
  const currImagePos = options.currImage - 1;

  /* Get the image box element */
  const imageSpinBox = document.querySelector('.image-spin-box');

  /* Get all the images inside the spinbox element */
  const imagesToSpin = imageSpinBox.querySelectorAll('img');
  const totalImages = imagesToSpin.length;

  /* Calculate the angle between each image */
  const anglePerImage = 360 / totalImages;

  /* Set the initial angle to 0 */
  let currentAngle = currImagePos > 0 ? currImagePos * anglePerImage : 0;

  /* Flag to track if the motion should start */
  let motionStarted = false;

  /* 
  TODO: 
  - Handle mousedown event
  - Handle mouseup event
  - Handle mousemove event
  */

  /* Handle mousedown event */
  const handleMouseDown = (event) => {

    event.preventDefault();

    console.trace('event', event);

    /* Start motion */
    motionStarted = true;

    /* Get the index of the current visible image */
    const currentIndex = calculateImageIndex(currentAngle);

    console.log('currentIndex', currentIndex);

    /* Calculate the initial angle based on the current visible image */
    currentAngle = currentIndex * anglePerImage;

    /* Listen for mousemove event */
    document.addEventListener('mousemove', handleMouseMove);
  }

  /* Handle mouseup event */
  const handleMouseUp = () => {
    motionStarted = false;
    document.removeEventListener('mousemove', handleMouseMove);
  }

  /* Add event listeners for mouseup and touchend events */
  document.addEventListener('mouseup', handleMouseUp);

  /* Handle mousemove event */
  const handleMouseMove = (event) => {
    console.trace('event', event);

    /* Calculate the rotation angle based on mouse position */
    const positionX = event.pageX - imageSpinBox.offsetLeft;
    const width = imageSpinBox.offsetWidth;
    const percentage = positionX / width;
    const maxRotation = 360; // 360 degrees for a full rotation; Maybe alterable
    currentAngle = Math.floor(percentage * maxRotation);
    
    /* Adjust currentAngle to be within the range of 0 to 359 degrees, without negavtive numbers */
    currentAngle = (currentAngle % maxRotation + maxRotation) % maxRotation;

    console.log('currentAngle', currentAngle);

    showImageForAngle(currentAngle);
  }

  /* Listen for mousedown events on the imageSpinBox element */
  imageSpinBox.addEventListener('mousedown', handleMouseDown);


  /* Calculate the current image index based on the current angle */
  const calculateImageIndex = angle => {

    let index = Math.floor(angle / anglePerImage);

    if (index < 0) {
        index = totalImages - 1;
    } else if (index >= totalImages) {
        index = 0;
    }
    return index;
  }

  /* Show the image based on the current angle */
  const showImageForAngle = angle => {

      /* get the index of the image to show based on the angle and total images */
      const imageIndex = Math.floor(angle / anglePerImage) + 1;

      /* Show the corresponding image and hide the others */
      for (let i = 1; i <= totalImages; i++) {
        const img = imageSpinBox.querySelector('img:nth-child(' + i + ')');
        img.style.display = (i === imageIndex) ? 'block' : 'none';
      }
  }
}