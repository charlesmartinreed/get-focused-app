const app = () => {
  // time vars
  let currentTime;
  let elapsedTime;
  let seconds;
  let minutes;

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

  //   time buttons
  const timeBtns = document.querySelectorAll(".time-select button");

  //   focus session duration
  let defaultDuration = 600;

  //   get stroke dash array and offset, animate them from 0 to full
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength; // renders the dash nonvisible

  // EVENT - changing the time
  timeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      defaultDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(
        defaultDuration / 60
      )}:${Math.floor(defaultDuration % 60)}`;
    });
  });

  //   EVENT - switch between sounds
  soundBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      let songSelection = this.getAttribute("data-sound");
      let videoSelection = this.getAttribute("data-video");

      song.src = songSelection;
      video.src = videoSelection;

      avHandler(song, video);
    });
  });

  //   playing sounds
  playBtn.addEventListener("click", () => {
    avHandler(song, video);
  });

  // stop and play sounds
  const avHandler = (song, video) => {
    elapsedTime = 0;
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

  //   animate the circle fill and check the time
  song.ontimeupdate = () => {
    //   this updates periodically while the 'song' plays
    currentTime = song.currentTime;
    elapsedTime = defaultDuration - currentTime;

    seconds = Math.floor(elapsedTime % 60);
    minutes = Math.floor(elapsedTime / 60);

    // animate the circle
    let progress =
      outlineLength - (currentTime / defaultDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // animate the clock
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= defaultDuration) {
      song.pause();
      song.currentTime = 0;
      playBtn.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
