'use strict';
const pupil = document.querySelector('.big-book__pupil');

document.addEventListener('mousemove', (event) => {
  const mouseX = event.pageX,
        mouseY = event.pageY,
        documentRect = document.body.getBoundingClientRect(),
        pupilRect = pupil.getBoundingClientRect(),
        offsetX = pupilRect.left - documentRect.left + pupilRect.width / 2,
        offsetY = pupilRect.top - documentRect.top + pupilRect.height / 2,
        deltaX = mouseX - offsetX,
        deltaY = mouseY - offsetY,
        distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)),
        maxDistance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
        maxSize = 3,
        minSize = 1,
        sizePupil = maxSize - (maxSize - minSize) * (distance / maxDistance),
        maxDelta = 30,
        pupilDeltaX = maxDelta * (deltaX / offsetX),
        pupilDeltaY = maxDelta * (deltaY / offsetY);

  pupil.style.setProperty('--pupil-size', sizePupil);
  pupil.style.setProperty('--pupil-x', pupilDeltaX + 'px');
  pupil.style.setProperty('--pupil-y', pupilDeltaY + 'px');
  console.log(documentRect.top)
  console.log(pupilRect.top)
});
