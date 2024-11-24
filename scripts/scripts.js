/**
 * ----------------------------------------------------------------------
 * Default Scripts for all files                                          |
 * ----------------------------------------------------------------------
 */

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('copy', function (e) {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  // Disable Ctrl+U (view page source)
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
  }

  // Disable certain key combinations that might open developer tools
  if ((e.ctrlKey && e.shiftKey && e.keyCode === 73) ||  // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode === 74)) {  // Ctrl+Shift+J
    e.preventDefault();
  }
});