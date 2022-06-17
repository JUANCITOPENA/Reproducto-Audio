
//   <!-- Main script for the player -->

    let now_playing = document.querySelector(".now-playing");
    let track_art = document.querySelector(".track-art");
    let track_name = document.querySelector(".track-name");
    let track_artist = document.querySelector(".track-artist");

    let playpause_btn = document.querySelector(".playpause-track");
    let next_btn = document.querySelector(".next-track");
    let prev_btn = document.querySelector(".prev-track");

    let seek_slider = document.querySelector(".seek_slider");
    let volume_slider = document.querySelector(".volume_slider");
    let curr_time = document.querySelector(".current-time");
    let total_duration = document.querySelector(".total-duration");

    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

    // Create new audio element
    let curr_track = document.createElement('audio');

    // Define the tracks that have to be played
    let track_list = [
      {
        name: "Milagroso",
        artist: "Way Maker",
        image: "https://i.ytimg.com/vi/9TIZMohIYqQ/0.jpg",
        path: "PLAYLIST/Asi eres tu.mp3"
      },
      {
        name: "Ganas-de-Ti",
        artist: "Wisin-y-Yandel-Feat",
        image: "https://alofokemusic.net/wp-content/uploads/2018/11/Wisin-Yandel-Guaya-200x190.jpg",
        path: "PLAYLIST/Wisin-y-Yandel-Feat-Sech-–-Ganas-de-Ti.mp3"
      },
      {
        name: "The Way You Make Me Feel",
        artist: "Michael Jackson",
        image: "https://i.ytimg.com/vi/MkHC-R2np7g/maxresdefault.jpg",
        path: "PLAYLIST/Michael Jackson  The Way You Make Me Feel.mp3"
      },
      {
        name: "IV ME",
        artist: "Lé Soniregun",
        image: "https://i1.sndcdn.com/artworks-000338542044-a7khcr-t500x500.jpg",
        path: "PLAYLIST/IV Me.mp3"
      },
      {
        name: "Me Prefieres a Mi",
        artist: "Arcangel featuring Don Omar",
        image: "http://images.genius.com/3121be7bc14d3b3b3a11d9e493d910b5.960x960x1.jpg",
        path: "PLAYLIST/10-Me-Prefieres-a-Mi.mp3"
      },
      {
        name: "No Me Doy PorVencido",
        artist: "Luis Fonsi",
        image: "https://i.scdn.co/image/ab67616d0000b27389f5d5420620eb7ba5e4a421",
        path: "PLAYLIST/10-No-Me-Doy-Por-Vencido.mp3"
      },
      {
        name: "La Mejor Version De Mi Remix",
        artist: "Natti Natasha Feat Romeo Santos",
        image: "https://reggaetonsinlimite.b-cdn.net/wp-content/uploads/2019/12/La-Mejor-Version-De-Mi-Remix-de-Natti-Natasha-y-Romeo-Santos-es-1-en-Mexico.jpg",
        path: "PLAYLIST/Natti-Natasha-Feat.-Romeo-Santos-–-La-Mejor-Version-De-Mi-Remix.mp3"
      },
      {
        name: "Supe Que Me Amabas",
        artist: "Marcela Gandara",
        image: "https://i.ytimg.com/vi/AB2x_DII3W0/hqdefault.jpg",
        path: "PLAYLIST/Supe Que Me Amabas.mp3"
      },
      {
        name: "Si-Te-Vas",
        artist: "Sech-Feat.-Ozuna",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl23Ev4jpQJQi4sL-okS2SYukiT5D5XcLMdU9zrX0QsXlrarXsfkgSp4irr5kZbING_Aw&usqp=CAU",
        path: "PLAYLIST/Sech-Feat.-Ozuna-–-Si-Te-Vas.mp3"
      },
      {
        name: "La Mejor Version De Mi",
        artist: "Natti-Natasha",
        image: "https://i.scdn.co/image/ab67616d0000b273f3845152684be3073cd66f81",
        path: "PLAYLIST/Natti-Natasha-La-Mejor-Version-De-Mi.mp3"
      },
      {
        name: "Lo Aprendí de Ti",
        artist: "HA ASH",
        image: "https://www.midismusic.com/wp-content/uploads/2019/04/LO-APRENDI-DE-TI.jpg",
        path: "PLAYLIST/HAASH  Lo Aprendí de Ti.mp3"
      },
      
    ];

    function loadTrack(track_index) {
      clearInterval(updateTimer);
      resetValues();

      // Load a new track
      curr_track.src = track_list[track_index].path;
      curr_track.load();

      // Update details of the track
      track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
      track_name.textContent = track_list[track_index].name;
      track_artist.textContent = track_list[track_index].artist;
      now_playing.textContent = "🎶Reproduciendo " + (track_index + 1) + " de " + track_list.length;

      // Set an interval of 1000 milliseconds for updating the seek slider
      updateTimer = setInterval(seekUpdate, 1000);

      // Move to the next track if the current one finishes playing
      curr_track.addEventListener("ended", nextTrack);

      // Apply a random background color
      random_bg_color();
    }

    function random_bg_color() {

      // Get a random number between 64 to 256 (for getting lighter colors)
      let red = Math.floor(Math.random() * 256) + 64;
      let green = Math.floor(Math.random() * 256) + 64;
      let blue = Math.floor(Math.random() * 256) + 64;
      let black = Math.floor(Math.random() * 255) + 0;
      // Construct a color withe the given values
      let bgColor = "rgb(" + red + "," + green + "," + blue + " + " + black + ")";
      //let bgColor ="rgb(234, 32, 39)";
      // Set the background to that color
      document.body.style.background = bgColor;
    }

    // Reset Values
    function resetValues() {
      curr_time.textContent = "00:00";
      total_duration.textContent = "00:00";
      seek_slider.value = 0;
    }

    function playpauseTrack() {
      if (!isPlaying) playTrack();
      else pauseTrack();
    }

    function playTrack() {
      curr_track.play();
      isPlaying = true;

      // Replace icon with the pause icon
      playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }

    function pauseTrack() {
      curr_track.pause();
      isPlaying = false;

      // Replace icon with the play icon
      playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
    }

    function nextTrack() {
      if (track_index < track_list.length - 1)
        track_index += 1;
      else track_index = 0;
      loadTrack(track_index);
      playTrack();
    }

    function prevTrack() {
      if (track_index > 0)
        track_index -= 1;
      else track_index = track_list.length;
      loadTrack(track_index);
      playTrack();
    }

    function seekTo() {
      seekto = curr_track.duration * (seek_slider.value / 100);
      curr_track.currentTime = seekto;
    }

    function setVolume() {
      curr_track.volume = volume_slider.value / 100;
    }

    function seekUpdate() {
      let seekPosition = 0;

      // Check if the current track duration is a legible number
      if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
    }

    // Load the first track in the tracklist
    loadTrack(track_index);


    