let musicContainer = document.querySelector('.music-container');
let playBtn = document.querySelector('#play');
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');

let audio = document.querySelector('.audio');
let progress = document.querySelector('.progress');
let progressContainer = document.querySelector('.progress-container');
let title = document.querySelector('.music-title');
let cover = document.querySelector('.cover');

// song title 
let songs = ['Night Terror', 'VLAN', 'volatility'];

// keep track of song 
let songIndex = 0;

// load song info in DOM 
loadSong(songs[songIndex]);

// update song details 
function loadSong(song){
    title.innerHTML = song;
    audio.src = `assets/audios/${song}.mp3`;
    cover.src = `assets/images/${song}.png`;
}

function playSong(){
 musicContainer.classList.add('play');
 playBtn.querySelector('i.fas').classList.remove('fa-play');
 playBtn.querySelector('i.fas').classList.add('fa-pause');

 audio.play();
}
function pauseSong(){
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

function prevSong(){
 songIndex--

 if(songIndex < 0){
    songIndex = songs.length - 1;
 }
 loadSong(songs[songIndex])

 playSong()
}

function nextSong(){
  songIndex++

  if(songIndex > songs.length - 1){
    songIndex = 0;
  }
  loadSong(songs[songIndex])

  playSong()
}

function updateProgress(e){
   let {duration, currentTime } = e.target;
   let progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`
}

function setProgress(e){
  let width = this.clientWidth;
  let clickX = e.offsetX;
  let duration = audio.duration;

  audio.currentTime = (clickX / width ) * duration;
}

// event listerner 
playBtn.addEventListener('click', () => {
    let isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

// change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong)