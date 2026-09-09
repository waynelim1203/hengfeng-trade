// Image fallback handler
function loadImageFallback(img) {
  // If current src is .png, try .jpeg
  if (img.src.match(/\.png$/)) {
    img.src = img.src.replace('.png', '.jpeg');
  } else {
    // Show placeholder
    img.parentElement.innerHTML = '<div class="img-placeholder"><span>📷</span></div>';
  }
}
