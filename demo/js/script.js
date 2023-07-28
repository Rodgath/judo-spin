/*  Get all the accordion headers */
const accordionHeaders = document.querySelectorAll('.accordion-header');

/*  Loop through each header and add a click event listener */
accordionHeaders.forEach(header => {
  header.addEventListener('click', function () {

    /* Get the corresponding content for this header */
    const content = this.nextElementSibling;

    /* Toggle the accordion content with slide effect */
    toggleAccordionContent(header, content);
  });
});

/* Toggle the accordion content with slide effect */
function toggleAccordionContent(header, content) {
  let heightAdjust = 8; // Adjust the speed of the slide by changing this value
  let startHeight = 0;
  const maxHeight = content.scrollHeight;
  
  function expandAccordion() {

    header.classList.add('active');

    content.classList.remove('hidden');

    startHeight += heightAdjust;

    if (startHeight < maxHeight) {
      content.style.height = `${startHeight}px`;
      requestAnimationFrame(expandAccordion);
    } else {
      content.style.height = null;
    }
  }

  function collapseAccordion() {
    startHeight -= heightAdjust;

    if (Math.abs(startHeight) < maxHeight) {
      content.style.height = maxHeight - Math.abs(startHeight) + 'px';
      requestAnimationFrame(collapseAccordion);
    } else {
      content.style.height = null;
      header.classList.remove('active');
      content.classList.add('hidden');
    }
  }

  if (content.classList.contains('hidden')) {
    expandAccordion();
  } else {
    collapseAccordion();
  }
}