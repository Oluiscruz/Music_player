import songs from "./songs.js";

const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const artist = document.querySelector("#artist");
const img = document.querySelector("img");
const playPausebtn = document.querySelector("#playPausebtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

const textButtonPlay = "<i class='bx bx-play'>";
const textButtonPause = "<i class='bx bx-pause'></i>";

let index = 0;

prevBtn.onclick = () => prevNextMusic("prev");
nextBtn.onclick = () => prevNextMusic();

playPausebtn.onclick = () => playPause();

const playPause = () => {
  if (player.paused) {
    player.play();
    playPausebtn.innerHTML = textButtonPause;
  } else {
    player.pause();
    playPausebtn.innerHTML = textButtonPlay;
  }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
  const currentMinutes = Math.floor(player.currentTime / 60);
  const currentSeconds = Math.floor(player.currentTime % 60);

  currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;

  const durationMinutes = Math.floor(durationFormatted / 60);
  const durationSeconds = Math.floor(durationFormatted % 60);

  duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

  const progressWidth = durationFormatted
    ? (player.currentTime / durationFormatted) * 100
    : 0;

  progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
  const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = newTime;
};

const prevNextMusic = (type = "next") => {
  if ((type == "next" && index + 1 === songs.length) || type === "init") {
    index = 0;
  } else if (type == "prev" && index === 0) {
    index == songs.length;
  } else {
    index = type === "prev" && index ? index - 1 : index + 1;
  }

  player.src = songs[index].src;
  musicName.innerHTML = songs[index].name;
  artist.innerHTML = songs[index].artist;
  img.src = songs[index].img;
  if (type !== "init") playPause();

  updateTime();
};

prevNextMusic("init");
