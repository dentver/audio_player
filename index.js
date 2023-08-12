const playPause = document.querySelector('.playPause') // кнопка плей/ пауза

const forward = document.getElementById('nextSong') // кнопка следующий трек

const previos = document.getElementById('previousSong') // кнопка предыдущий трек

const progressBar = document.getElementById('progress-bar') // прогресс бар

const audio = document.getElementById('myAudio') // песня

const artist = document.querySelector('.artist') // исполнитель

const artistSpan = document.querySelector('.artistSpan')

const songTitle = document.querySelector('.songTitle') // название песни

const songTitleSpan = document.querySelector('.songTitleSpan')

const coverBackground = document.querySelector('.backgroundImage')  // фон

const durationTime = document.querySelector('.durationTime') // длина трека

const songTime = document.querySelector('.currentTime') // текущее время

const cover = document.querySelector('.cover') // обложка

// массивы содержащие пенсни, обложки к ним, имена авторов и тд
let songs = ['audio/Whats_Up_Danger.mp3', 'audio/AtomicHeart_GoldenHoop.mp3']; //путь к песне

let songsCover = ['image/spiderMan.png', 'image/AtomicHeart.png']; //обложка

let songsCoverBackground = ['image/spiderManBackground.png', 'image/AtomicHeartBackgrond.png']; //обложка для фона

let songsArtist = ['Blackway, Black Caviar', 'Neus, Ольга Восконьян, БИО, Atomic Heart']; //исполнитель

let songsName = ['What\'s Up Danger', 'Golden Hoop (NEUS Remix)']; //название песни

function changeProgressBar(){
    audio.currentTime = progressBar.value;
}

function scrollText(value1, value2){
    console.log(value1, value2);
    if(value1.length > 10){         // если имя автора/ов длиннее 10 символов, строка начинает прокручиваться
        artist.classList.add('marquee')
    } else if (value1.length < 10){
        artist.classList.remove('marquee')
    }

    if(value2.length > 16){      // если название песни длиннее 16 символов, строка начинает прокручиваться
        songTitle.classList.add('marquee')
    } else if (value2.length < 16){
        songTitle.classList.remove('marquee')
    }
}

let i = 1; // используется для смены play/pause

playPause.addEventListener('click', function(){ // запустить или остаановить воспроизведение
    if(i == 1){
    i = 0;
    playPause.src = "image/pause.png";
    audio.play();
    cover.style.width = "120%";
} else if (i == 0){
    i = 1;
    playPause.src ="image/play.png";
    audio.pause();
    cover.style.width = "103%";
    artist.classList.remove('marquee')
    songTitle.classList.remove('marquee')
}})

function soundSelection(id){ // функция меняет обложку, фон, автора, название и саму песню, в зависимости от выбранной композиции
    audio.src = songs[id];
    cover.src = songsCover[id];
    coverBackground.src = songsCoverBackground[id];
    artistSpan.innerHTML = songsArtist[id];
    songTitleSpan.innerHTML = songsName[id];
}

let soundNumber = 0;

forward.addEventListener('click', function(){ // следующий трек
    soundNumber += 1;
    if(soundNumber > songs.length - 1){
        soundNumber = 0;
    }
    soundSelection(soundNumber);
    artist.classList.remove('marquee')
    songTitle.classList.remove('marquee')
})

previos.addEventListener('click', function(){ // предыдущий трек
    soundNumber -= 1;
    if (soundNumber < 0){
        soundNumber = songs.length - 1;
    }
    soundSelection(soundNumber);
});

function timeDisplay(){
    progressBar.max = Math.floor(audio.duration)   

    let minutesDuration = Math.floor(Math.round(audio.duration) / 60);     // функция для отображения длины трека и текущего времени
    let secondDuration = Math.round(audio.duration) % 60;

    let minutesCurrent = Math.floor(Math.round(audio.currentTime)/60);
    let secondsCurrent = Math.round(audio.currentTime) % 60;

    if (secondDuration < 10){
        durationTime.innerHTML = minutesDuration + ':0' + secondDuration;
    } else {
        durationTime.innerHTML = minutesDuration + ':' + secondDuration;
    }

    if(secondsCurrent < 10){
        songTime.innerHTML = minutesCurrent + ':0' + secondsCurrent;
    } else{
        songTime.innerHTML = minutesCurrent + ':' + secondsCurrent;
    }
    
    let progress = audio.currentTime / (audio.duration / progressBar.max); // отображает время трека в виде прогресс бара
    progressBar.value = progress;

    if(audio.currentTime == audio.duration){ // если трек закончился, он автоматически сменяется следующим
        soundNumber += 1;
    if(soundNumber > songs.length - 1){
        soundNumber = 0;
    }
    soundSelection(soundNumber);
    }

    if (i==0){ // это сделано чтобы при переключении трека и включенном 'Play', трек начинал играть
    audio.play();
    scrollText(artist.innerText, songTitle.innerText);
    }
}

setInterval(timeDisplay, 1000); // каждую секунду обновлять таймер