function loadImageFallback(img, basePath) {
  // First fallback: try .jpeg
  if (img.src.indexOf('.png') > -1) {
    img.src = basePath + '.jpeg';
  } else {
    // Final fallback: show placeholder
    img.parentElement.innerHTML = '<div class="img-placeholder"><span>📷</span></div>';
  }
}
