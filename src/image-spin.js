
function imageSpin(element, options) {

  var defaults = {
    currImg: 1,
  };

  options = Object.assign({}, defaults, options);
    
  /* Current image starts at 0 or based on options entry */
  let currImagePos = convertCurrImageNumber(options.currImage) - 1;

  /* Get the image box element */
  const imageSpinBox = document.querySelector(element);

  /* Get all the images inside the spinbox element */
  const imagesToSpin = imageSpinBox.querySelectorAll('img');
  const totalImages = imagesToSpin.length;

  /* Calculate the angle between each image */
  const anglePerImage = 360 / totalImages;

  /* Set the initial angle to 0 or based on current mage*/
  let currentAngle = currImagePos > 0 ? currImagePos * anglePerImage : 0;

  /* Flag to track if the motion should start */
  let motionStarted = false;

  /* Create the overlay div element */
  const overlayElement = document.createElement('div');
  
  /* Convert a string to a positive number or its absolute value if negative */
  function convertCurrImageNumber(str) {
    const number = parseInt(str, 10); // Convert string to integer

    if (!isNaN(number)) {
      return Math.abs(number);
    } else {
      return 1;
    }
  }

  /* Set the attributes and styles for the overlay element */
  (function(overlayElement) {
    overlayElement.className = 'image-spin-overlay';
    overlayElement.style.position = 'absolute';
    overlayElement.style.width = '100%';
    overlayElement.style.height = '100%';
    overlayElement.style.top = '0';
    overlayElement.style.left = '0';
    overlayElement.style.zIndex = '1';
    imageSpinBox.appendChild(overlayElement);

  })(overlayElement);

  /* Set image spin box attributes and styles */
  (function(imageSpinBox) {
    imageSpinBox.classList.add('image-spin-box-container');
    imageSpinBox.style.position = 'relative';
    imageSpinBox.style.width = '100%';
    imageSpinBox.style.height = 'auto';
    imageSpinBox.style.overflow = 'hidden';
  })(imageSpinBox);
  
  /* Set images' attributes and styles */
  (function(imageSpinBox) {
    const images = imageSpinBox.getElementsByTagName('img');

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.style.width = '100%';
    }
  })(imageSpinBox);

  /* Handle mousedown event */
  const handleMouseDown = (event) => {

    event.preventDefault();
    
    /* Start motion */
    motionStarted = true;

    /* Get the index of the current visible image */
    const currentIndex = calculateImageIndex(currentAngle);

    console.log('currentIndex', currentIndex);

    /* Calculate the initial angle based on the current visible image */
    currentAngle = currentIndex * anglePerImage;

    /* Listen for mousemove event */
    overlayElement.addEventListener('mousemove', handleMouseMove);
  }

  /* Handle touchstart event */
  const handleTouchStart = (event) => {

    event.preventDefault();
    
    /* Start motion */
    motionStarted = true;

    /* Get the index of the current visible image */
    const currentIndex = calculateImageIndex(currentAngle);

    console.log('currentIndex', currentIndex);

    /* Calculate the initial angle based on the current visible image */
    currentAngle = currentIndex * anglePerImage;

    /* Listen for touchmove event */
    overlayElement.addEventListener('touchmove', handleTouchMove);
  }

  /* Listen for mousedown and touchstart events on the overlayElement element */
  overlayElement.addEventListener('mousedown', handleMouseDown);
  overlayElement.addEventListener('touchstart', handleTouchStart);

  /* Handle mouseup event */
  const handleMouseUp = () => {
    motionStarted = false;
    overlayElement.removeEventListener('mousemove', handleMouseMove);
  }

  /* Handle touchend event */
  const handleTouchEnd = () => {
    motionStarted = false;
    overlayElement.removeEventListener('touchmove', handleTouchMove);
  }

  /* Add event listeners for mouseup and touchend events */
  overlayElement.addEventListener('mouseup', handleMouseUp);
  overlayElement.addEventListener('touchend', handleTouchEnd);

  /* Handle mousemove event */
  const handleMouseMove = event => handleMovement(event);

  /* Handle touchmove event */
  const handleTouchMove = event => handleMovement(event);

  /* Handle image spin movement based on event */
  const handleMovement = event => {
    if (motionStarted) {
      const _clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
      const _clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;

      const dir = detectDirection(_clientX, _clientY);

      dir === 'right' ? currImagePos++ : dir === 'left' ? currImagePos-- : null;

      /* Calculate the rotation angle based on mouse position */
      const maxRotation = 360; // 360 degrees for a full rotation; Maybe alterable
      currentAngle = currImagePos * anglePerImage;
      
      /* Adjust currentAngle to be within the range of 0 to 359 degrees, without negavtive numbers */
      currentAngle = (currentAngle % maxRotation + maxRotation) % maxRotation;

      showImageForAngle(currentAngle);
    }
  }
  
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
  
  /* Show the preferred/intended image by default */
  showImageForAngle(currentAngle);

  /* Store the previous position of the mouse */
  let prevX = null;
  let prevY = null;

  /* Mouse sensitivity factor (adjust this to set sensitivity) */
  const sensitivity = 1; // Increase for higher sensitivity, decrease for lower sensitivity

  /* Detect the direction */
  function detectDirection(currentX, currentY) {
    let direction;
    if (prevX !== null && prevY !== null) {
      const deltaX = currentX - prevX;

      if (deltaX > sensitivity) {
        direction = 'right';
      } else if (deltaX < -sensitivity) {
        direction = 'left';
      }
    }

    /* Update the previous position to the current position */
    prevX = currentX;
    prevY = currentY;

    return direction;
  }
}