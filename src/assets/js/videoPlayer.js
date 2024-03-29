import getBlobDuration from "get-blob-duration";

const $videoContainer = document.getElementById("jsVideoPlayer");
const $videoPlayer = document.querySelector("#jsVideoPlayer video");
const $playBtn = document.getElementById("jsPlayButton");
const $volumeBtn = document.getElementById("jsVolumeBtn");
const $fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const $progressBar = document.querySelector(".progress_bar");
const $currentBar = document.querySelector(".current_bar");

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  })
}

function handlePlayClick() {
  if ($videoPlayer.paused) {
    $videoPlayer.play();
    $playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    $videoPlayer.pause();
    $playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if ($videoPlayer.muted) {
    $videoPlayer.muted = false;
    $volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    // volumeRange.value = $videoPlayer.volume;
  } else {
    // volumeRange.value = 0;
    $videoPlayer.muted = true;
    $volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  $fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  $fullScrnBtn.addEventListener("click", goFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  if ($videoContainer.requestFullscreen) {
    $videoContainer.requestFullscreen();
  } else if ($videoContainer.mozRequestFullScreen) {
    $videoContainer.mozRequestFullScreen();
  } else if ($videoContainer.webkitRequestFullscreen) {
    $videoContainer.webkitRequestFullscreen();
  } else if ($videoContainer.msRequestFullscreen) {
    $videoContainer.msRequestFullscreen();
  }
  $fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  $fullScrnBtn.removeEventListener("click", goFullScreen);
  $fullScrnBtn.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor($videoPlayer.currentTime));
  $currentBar.style.width = `${($videoPlayer.currentTime / $videoPlayer.duration) * 100}%`;
}

async function setTotalTime() {
  const blob = await fetch($videoPlayer.src).then(response => response.blob());
  const duration = await getBlobDuration(blob);
  console.log(duration)

  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}
function handleEnded() {
  $videoPlayer.currentTime = 0;
  registerView();
  $playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  $videoPlayer.volume = value;
  if (value >= 0.6) {
    $volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    $volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    $volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function controlPlay (currentWidth) {
  $currentBar.style.width = `${currentWidth}%`;
  $videoPlayer.currentTime = ($videoPlayer.duration * currentWidth) / 100;
};

function init() {
  $videoPlayer.volume = 0.5;
  $playBtn.addEventListener("click", handlePlayClick);
  $volumeBtn.addEventListener("click", handleVolumeClick);
  $fullScrnBtn.addEventListener("click", goFullScreen);
  // volumeRange.addEventListener("input", handleDrag);

  // $videoPlayer.addEventListener("loadedmetadata", setTotalTime);  
  // $videoPlayer.addEventListener("playing", setTotalTime);
  window.addEventListener("load", setTotalTime)
  $videoPlayer.addEventListener("ended", handleEnded);

  $progressBar.addEventListener("click", e => {
    controlPlay((e.offsetX / $progressBar.offsetWidth) * 100);
  });
}

if ($videoContainer) {
  init();
}
