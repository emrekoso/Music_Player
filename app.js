const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const shuffle = document.querySelector("#controls #shuffle");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const loop1 = document.querySelector("#controls #loop");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");


const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music)
    displayMusicList(player.musicList);
    isPlayingNow();
})

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "musics/" + music.file;
}

play.addEventListener("click", () => {
    const MusicPlay = container.classList.contains("playing");
    MusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
     prevMusic();
});

next.addEventListener("click", () => {
    nextMusic();
});

loop1.addEventListener("click", () => {
    loopMusic();
})

function prevMusic() {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}


function pauseMusic () {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play"
    audio.pause();
}

function playMusic () {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause"
    audio.play();
}

function loopMusic () {
    if (loop1.classList.contains("activeloop")) {
        loop1.querySelector("i").classList = "fas fa-repeat"
        loop1.classList.remove("activeloop");
        audio.loop = false;
        console.log("repeat off");
      } else {
        loop1.querySelector("i").classList = "fa fa-repeat fa-spin"
        loop1.classList.add("activeloop");
        audio.loop = true;
        console.log("repeat on");
      }
}

shuffle.addEventListener("click", () => {
    if (shuffle.classList.contains("active")) {
        shuffle.querySelector("i").classList = "fa-solid fa-shuffle"
        shuffle.classList.remove("active");
        player.isShuffle = false;
        console.log("shuffle off");
    } else {
        shuffle.querySelector("i").classList = "fa-solid fa-shuffle fa-beat"
        shuffle.classList.add("active");
        player.isShuffle = true;
        console.log("shuffle on");
    }
});
  

const calculateTime = (totalTime) => {
    const minute = Math.floor(totalTime / 60);
    const second = Math.floor(totalTime % 60);
    const updatedTime = second < 10 ? `0${second}`: `${second}`;
    const aftermath = `${minute}:${updatedTime}`;
    return aftermath;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let muteState = "unmuted"

volumeBar.addEventListener("input", (ses) => {
    const value = ses.target.value;
    audio.volume = value / 100;
    if(value == 0) {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if(muteState==="unmuted") {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {
    for(let i=0; i < list.length; i++) {
        let liTag = `
        <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="musics/${list[i].file}"></audio>
        </li>
        `;

        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });

    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow = () => {
    for(let li of ul.querySelectorAll("li")) {
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})

