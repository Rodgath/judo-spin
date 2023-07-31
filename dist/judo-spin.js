 function judoSpin(element, options) {

  var defaults = {
    currImg: 1,
    images: []
  };
  
  /* Check if options argument is provided directly or in the data attribute */
  if (!options) {
    var dataAttributeOptions = element.dataset.imageSpin;
    if (dataAttributeOptions) {
      options = JSON.parse(dataAttributeOptions);
    }
  }

  /* Merge 'options' with 'defaults' */
  options = Object.assign({}, defaults, options);
    
  /* Current image starts at 0 or based on options entry */
  let currImagePos = convertCurrImageNumber(options.currImage) - 1;

  /* Set image box element */
  let imageSpinBox;
  
  /* Check if 'element' is a valid DOM element */
  if (element instanceof HTMLElement || element instanceof Node) {
    imageSpinBox = element;
  } else {
    imageSpinBox = document.querySelector(element);
  }
  
  /* Get all the images inside the spinbox element */
  const imagesToSpin = getImagesToSpin();
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

  /* Get the images to spin */
  function getImagesToSpin() {

    let imagesToSpin;
    
    /* Check if ihe "images" property exists, is an array, and has items */
    if (options.hasOwnProperty('images') && Array.isArray(options.images) && options.images.length > 0) {
      
      options.images.forEach(imageObj => {
        const imgElement = document.createElement('img');
        imgElement.src = imageObj.src;
        imgElement.alt = imageObj.title;
        
        imageSpinBox.appendChild(imgElement);
      });

      imagesToSpin = imageSpinBox.querySelectorAll('img')
    } else {
      imagesToSpin = imageSpinBox.querySelectorAll('img')
    }

    return imagesToSpin;
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

    /* Add event listeners to change cursor on hover and reset on mouseout */
    overlayElement.addEventListener('mouseover', () => overlayElement.style.cursor = 'e-resize');
    overlayElement.addEventListener('mouseout', () => overlayElement.style.cursor = 'auto');

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
  const handleMouseDown = event => invokeMotion(event);

  /* Handle touchstart event */
  const handleTouchStart = event => invokeMotion(event);

  /* Listen for mousedown and touchstart events on the overlayElement element */
  overlayElement.addEventListener('mousedown', handleMouseDown);
  overlayElement.addEventListener('touchstart', handleTouchStart);

  /* Invoke image spin motion based on mousemove and touchmove events */
  const invokeMotion = event => {

    event.preventDefault();

    const _event = event.type === 'touchstart' ? 'touchmove' : 'mousemove';
    const _listener = event.type === 'touchstart' ? handleTouchMove : handleMouseMove;

    console.log(event.type);
    
    /* Start motion */
    motionStarted = true;

    /* Get the index of the current visible image */
    const currentIndex = calculateImageIndex(currentAngle);
    
    /* Calculate the initial angle based on the current visible image */
    currentAngle = currentIndex * anglePerImage;

    /* Listen for touchmove event */
    overlayElement.addEventListener(_event, _listener);
  }

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
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchend', handleTouchEnd);

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

      /* Calculate the rotation angle based on mouse or touch position */
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

  /* Store the previous position of the mouse/touch */
  let prevX = null;
  let prevY = null;

  /* Mouse/touch sensitivity factor */
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

/* Call the function for elements with the 'data-image-spin' attribute */
const judoSpinElements = document.querySelectorAll('[data-image-spin]');
judoSpinElements.forEach(element => judoSpin(element));