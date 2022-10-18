let allMusic = [
  {
    name: '神武雨霖铃',
    artist: '啊俏',
    img: 'music1',
    src: 'music-1',
  },
  {
    name: '牵丝戏',
    artist: '银临',
    img: 'music2',
    src: 'music-2',
  },
  {
    name: '杏花弦外雨',
    artist: '司夏',
    img: 'music3',
    src: 'music-3',
  },
  {
    name: '势在必行',
    artist: '陈势安',
    img: 'music4',
    src: 'music-4',
  },
  {
    name: '春亭雪',
    artist: '橙翼',
    img: 'music5',
    src: 'music-5',
  },
  {
    name: '第三十八年夏至',
    artist: '河图',
    img: 'music6',
    src: 'music-6',
  },
]

// 获取 DOM
const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  mainAudio = wrapper.querySelector("#main-audio"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = wrapper.querySelector(".progress-bar"),
  repeatBtn = wrapper.querySelector("#repeat-plist"),
  musicList = wrapper.querySelector(".music-list"),
  showMoreBtn = wrapper.querySelector("#more-music"),
  hideMusicBtn = musicList.querySelector("#close")

// 当前播放音乐索引，从1开始
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1)

// 在window加载时初始化当前播放音乐
window.addEventListener("load", () => {
  loadMusic(musicIndex)
  palyingNow()
})

// 载入音乐函数
function loadMusic(indexNumb) {
  musicName.innerHTML = allMusic[indexNumb - 1].name
  musicArtist.innerHTML = allMusic[indexNumb - 1].artist
  musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`
  mainAudio.src = `musics/${allMusic[indexNumb - 1].src}.mp3`
}

// 播放音乐函数
function playMusic() {
  wrapper.classList.add("paused")
  playPauseBtn.querySelector("i").innerText = "pause"
  mainAudio.play()
}

// 暂停播放音乐函数
function pauseMusic() {
  wrapper.classList.remove("paused")
  playPauseBtn.querySelector("i").innerText = "play_arrow"
  mainAudio.pause()
}

// 切换下一首函数
function nextMusic() {
  musicIndex++
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
  loadMusic(musicIndex)
  playMusic()
  palyingNow()
}

// 切换上一首函数
function prevMusic() {
  musicIndex--
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
  loadMusic(musicIndex)
  playMusic()
  palyingNow()
}

// 为播放/暂停按钮添加点击事件
playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused")
  isMusicPaused ? pauseMusic() : playMusic()
})

// 为下一首按钮添加点击事件
nextBtn.addEventListener("click", () => {
  nextMusic()
})

// 为上一首按钮添加点击事件
prevBtn.addEventListener("click", () => {
  prevMusic()
})


// 更新进度条
mainAudio.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.target
  progressBar.style.width = `${(currentTime / duration) * 100}%`

  let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration")

  mainAudio.addEventListener("loadeddata", () => {
    // 更新音乐总时长
    let audioDuration = mainAudio.duration
    let totalMin = Math.floor(audioDuration / 60)
    let totalSec = Math.floor(audioDuration % 60)
    if (totalSec < 10) {
      totalSec = `0${totalSec}`
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`
  })

  //更新音乐当前时长
  let currentMin = Math.floor(currentTime / 60)
  let currentSec = Math.floor(currentTime % 60)
  if (currentSec < 10) {
    currentSec = `0${currentSec}`
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

progressArea.addEventListener("click", (e) => {
  let progressWidthVal = progressArea.clientWidth
  let clickedOffSetX = e.offsetX
  let songDuration = mainAudio.duration

  mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration

  playMusic()
})

// 切换播放模式     单曲/循环/随机
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText

  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one"
      repeatBtn.setAttribute("title", "单曲循环播放")
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle"
      repeatBtn.setAttribute("title", "列表随机播放")
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat"
      repeatBtn.setAttribute("title", "列表循环播放")
      break;
  }
})

mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText

  switch (getText) {
    case "repeat":
      nextMusic()
      break;
    case "repeat_one":
      mainAudio.currentTime = 0
      loadMusic(musicIndex)
      playMusic()

      break;

    // 随机播放，这里因采用了随机数，所以会出现重复播放音乐的情况
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1)
      do {
        randIndex = Math.floor((Math.random() * allMusic.length) + 1)
      } while (musicIndex == randIndex);
      musicIndex = randIndex
      loadMusic(musicIndex)
      playMusic()
      palyingNow()
      break;
  }
})

// 打开音乐列表
showMoreBtn.addEventListener("click", () => {
  musicList.classList.toggle("show")
})

// 关闭音乐列表
hideMusicBtn.addEventListener("click", () => {
  showMoreBtn.click()
})

const ulTag = wrapper.querySelector("ul")

for (let i = 0; i < allMusic.length; i++) {
  let liTab = `
        <li li-index="${i}">
          <div class="row">
            <span>${allMusic[i].name}</span>
            <p>${allMusic[i].artist}</p>
          </div>
          <audio class="${allMusic[i].src}" src="musics/${allMusic[i].src}.mp3"></audio>
          <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
        </li>
    `
  ulTag.insertAdjacentHTML("beforeend", liTab)

  let liAudioDuaration = ulTag.querySelector(`#${allMusic[i].src}`)
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`)
  liAudioTag.addEventListener("loadeddata", () => {
    // 更新音乐总时长
    let audioDuration = liAudioTag.duration
    let totalMin = Math.floor(audioDuration / 60)
    let totalSec = Math.floor(audioDuration % 60)
    if (totalSec < 10) {
      totalSec = `0${totalSec}`
    }
    liAudioDuaration.innerText = `${totalMin}:${totalSec}`
    liAudioDuaration.setAttribute("t-duration", `${totalMin}:${totalSec}`)
  })
}

const allLiTags = ulTag.querySelectorAll("li")

function palyingNow() {
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration")
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing")
      audioTag.innerText = audioTag.getAttribute("t-duration")
    }
    if (allLiTags[j].getAttribute("li-index") == musicIndex - 1) {
      allLiTags[j].classList.add("playing")
      audioTag.innerText = "正在播放"
    }
    allLiTags[j].setAttribute("onclick", "clicked(this)")
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index")
  musicIndex = getLiIndex * 1 + 1
  loadMusic(musicIndex)
  playMusic()
  palyingNow()
}