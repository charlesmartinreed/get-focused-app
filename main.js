const app = () => {
  const song = document.querySelector(".song-loop");
  const playBtn = document.querySelector(".play");

  // animating the circle not the svg itself
  const outline = document.querySelector(".moving-outline circle");
  const outlineLength = outline.getTotalLength();

  const video = document.querySelector(".vid-container video");

  //   sounds
  const soundBtns = document.querySelectorAll(".sound-picker button");

  //   time display
  const timeDisplay = document.querySelector(".time-display");

  //   focus session duration
  let defaultDuration = 600;

  //   get stroke dash array and offset, animate them from 0 to full
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength; // renders the dash nonvisible

  //   playing sounds
  playBtn.addEventListener("click", () => {
    songHandler(song);
  });

  // stop and play sounds
  const songHandler = song => {
    if (song.paused) {
      song.play();
      playBtn.src = "./svg/pause.svg";
      video.play();
    } else {
      song.pause();
      video.pause();
      playBtn.src = "/svg/play.svg";
    }
  };
};

app();
