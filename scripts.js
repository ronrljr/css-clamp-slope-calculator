
function generateClamp(minSize, maxSize, minViewport, maxViewport, output, outputRem, root) {
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

  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const slopeVw = slope * 100;
  const base = minSize - slope * minViewport;

  const minRem = (minSize / root).toFixed(4); 
  const maxRem = (maxSize / root).toFixed(4); 
  const baseRem = (base / root).toFixed(4);

  const clampValue = `clamp(${minSize}px, calc(${base.toFixed(4)}px + ${slopeVw.toFixed(4)}vw), ${maxSize}px);`;
  const clampValueRem = `clamp(${minRem}rem, calc(${baseRem}rem + ${slopeVw.toFixed(4)}vw), ${maxRem}rem)`;
  output.textContent = clampValue;
  outputRem.textContent = clampValueRem;
}


function calculateClamp() {
    const output = document.querySelector(".slope-calc__result");
    const outputRem = document.querySelector(".slope-calc__rem-result");
    const calculate = document.querySelector(".slope-calc__calculate");

    calculate.addEventListener('click', function() {
        const minSize = Number(document.getElementById("min-width").value);
        const maxSize = Number(document.getElementById("max-width").value);
        const minViewport = Number(document.getElementById("min-vp").value);
        const maxViewport = Number(document.getElementById("max-vp").value);
        const root = Number(document.getElementById("root").value);
        generateClamp(minSize, maxSize, minViewport, maxViewport, output, outputRem, root);
        // navigator.clipboard.writeText(output.textContent);
    });
}

calculateClamp();

function pxToRem() {
  const outputRem = document.querySelector(".slope-calc__rem-result");
  const output = document.querySelector(".slope-calc__result");
  const px = document.querySelector(".slope-calc__button-rempx--px");
  const rem = document.querySelector(".slope-calc__button-rempx--rem");
  const copyButton = document.querySelector(".slope-calc__copy");
  let pxRem = true;

  px.addEventListener('click', function() {
    output.style.display = 'block';
    outputRem.style.display = 'none';
    pxRem = true;
  });

  rem.addEventListener('click', function() {
    outputRem.style.display = 'block';
    output.style.display = 'none';
    pxRem = false;
  });

   copyButton.addEventListener('click', function() {
    pxRem ? navigator.clipboard.writeText(output.textContent) : navigator.clipboard.writeText(outputRem.textContent);
  }) 

}

pxToRem();
