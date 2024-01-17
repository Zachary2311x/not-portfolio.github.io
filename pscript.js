const track = document.getElementById("image-track");

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX || e.touches[0].clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const clientX = e.clientX || e.touches[0].clientX;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
};

window.addEventListener("mousedown", handleOnDown);
window.addEventListener("touchstart", e => handleOnDown(e.touches[0]));
window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", e => handleOnUp(e.touches[0]));
window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", e => handleOnMove(e.touches[0]));