
function generateClamp(minSize, maxSize, minViewport, maxViewport, output) {
  // Basic validation
  if (
    isNaN(minSize) || isNaN(maxSize) ||
    isNaN(minViewport) || isNaN(maxViewport)
  ) {
    output.textContent = "All fields must contain numbers.";
    return;
  }

  if (minSize <= 0 || maxSize <= 0) {
    output.textContent = "Font sizes must be greater than zero.";
    return;
  }

  if (minViewport <= 0 || maxViewport <= 0) {
    output.textContent = "Viewport widths must be greater than zero.";
    return;
  }

  if (minSize >= maxSize) {
    output.textContent = "Min size must be smaller than max size.";
    return;
  }

  if (minViewport >= maxViewport) {
    output.textContent = "Min viewport must be smaller than max viewport.";
    return;
  }

  // Original calculation (unchanged)
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const slopeVw = slope * 100;
  const base = minSize - slope * minViewport;

  const clampValue = `clamp(${minSize}px, calc(${base.toFixed(4)}px + ${slopeVw.toFixed(4)}vw), ${maxSize}px);`;
  output.textContent = clampValue;
}


function calculateClamp() {
    const output = document.querySelector(".slope-calc__result");
    const calculate = document.querySelector(".slope-calc__calculate");

    calculate.addEventListener('click', function() {
        const minSize = Number(document.getElementById("min-width").value);
        const maxSize = Number(document.getElementById("max-width").value);
        const minViewport = Number(document.getElementById("min-vp").value);
        const maxViewport = Number(document.getElementById("max-vp").value);
        generateClamp(minSize, maxSize, minViewport, maxViewport, output)
        navigator.clipboard.writeText(output.textContent);
    });
}

calculateClamp();

function copyToClipboard() {
  const copyButton = document.querySelector(".slope-calc__copy");

  copyButton.addEventListener('click', function() {
    navigator.clipboard.writeText(output.textContent);
  })
}

copyToClipboard();