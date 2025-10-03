// Skills scroller keyboard and touch interactions
document.querySelector(".skills-viewport").addEventListener("keydown", (e) => {
  const track = e.currentTarget.querySelector(".skills-track");
  const currentX = track.style.transform
    ? parseInt(track.style.transform.match(/-?\d+/)[0])
    : 0;

  if (e.key === "ArrowLeft") {
    track.style.transform = `translateX(${currentX + 100}px)`;
    track.style.transition = "transform 0.3s ease";
    e.preventDefault();
  } else if (e.key === "ArrowRight") {
    track.style.transform = `translateX(${currentX - 100}px)`;
    track.style.transition = "transform 0.3s ease";
    e.preventDefault();
  }
});

// Touch interaction with auto-resume
let touchStartX = 0;
let scrollStartX = 0;
let isDragging = false;
let resumeTimeout;

const track = document.querySelector(".skills-track");
const viewport = document.querySelector(".skills-viewport");

viewport.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  scrollStartX = track.style.transform
    ? parseInt(track.style.transform.match(/-?\d+/)[0])
    : 0;
  isDragging = true;
  track.style.animationPlayState = "paused";
});

viewport.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - touchStartX;
  track.style.transform = `translateX(${scrollStartX + diff}px)`;
  track.style.transition = "none";
  clearTimeout(resumeTimeout);
});

viewport.addEventListener("touchend", () => {
  isDragging = false;
  resumeTimeout = setTimeout(() => {
    track.style.animation = "none";
    track.offsetHeight; // Force reflow
    track.style.animation = "scroll var(--duration) linear infinite";
    track.style.transform = "";
  }, 2000);
});
