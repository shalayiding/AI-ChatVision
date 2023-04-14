function autoExpand(textarea){
     // Reset textarea height to auto to correctly calculate new height
  textarea.style.height = 'auto';
  // Calculate the new height and set it
  textarea.style.height = textarea.scrollHeight + 'px';
  // Check if textarea height exceeds a certain value
  const maxHeight = 200; // set your desired max height in pixels
  if (textarea.scrollHeight > maxHeight) {
    textarea.style.overflowY = 'scroll';
    textarea.style.height = maxHeight + 'px';
  } else {
    textarea.style.overflowY = 'hidden';
  }

}


document.addEventListener('DOMContentLoaded', function() {
    // detect Enter key press event on textarea
    document.getElementById("val").addEventListener("keydown", function(e) {
        if (e.keyCode === 13 && !e.shiftKey) { // Enter key without Shift key
        e.preventDefault(); // prevent default behavior of textarea (adding a new line)
        document.getElementById("msend").click(); // trigger click event on submit button
    }
  });

});







