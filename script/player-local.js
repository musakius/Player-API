const files = document.getElementById("file");
const audio = document.querySelector("audio");
const play = document.querySelector("#play");
const currentVolume = document.getElementById("current_volume");
let timerId;
let init = 0;

function currentProcess() {
  time2.innerHTML = duration(audio.currentTime);
  progress.value = audio.currentTime / audio.duration;
}
play.addEventListener("click", function () {
  console.log(audio.src);
  if (init == 0) {
    audio.play();
    timerId = setInterval(currentProcess, 100);
    init = 1;
    play.className = "fas fa-pause";
  } else {
    audio.pause();
    clearInterval(timerId);
    init = 0;
    play.className = "fas fa-play";
  }
});

progress.addEventListener("click", function (e) {
  let pos =
    (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) /
    this.offsetWidth;
  audio.currentTime = pos * audio.duration;
  progress.value = pos;
});
progress2.addEventListener("click", function (e) {
  let pos =
    (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) /
    this.offsetWidth;
  progress2.value = pos;
  audio.volume = pos;
});

files.addEventListener("change", function () {
  audio.src = URL.createObjectURL(this.files[0]);
});

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  ev.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  console.log(data);
  external.target.appendChild(document.getElementById(data));
}

function setPlusVolume() {
  audio.volume = audio.volume + 0.1;
  currentVolume.innerHTML = audio.volume.toFixed(1) * 100 + "%";
  if (audio.volume >= 1) {
    audio.volume = 1;
  }
}

function setMinusVolume() {
  audio.volume = audio.volume - 0.1;
  currentVolume.innerHTML = audio.volume.toFixed(1) * 100 + "%";
  if (audio.volume <= 0) {
    audio.volume = 0;
  }
}
/* function playAudio() {
  audio.play();
  timerId = setInterval(currentProcess, 100);
}

function pauseAudio() {
  audio.pause();
  clearInterval(timerId);
} */
