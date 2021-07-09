
//_______PLAY / PAUSE BUTTON_______//

var button = document.getElementById("button");
var audio = document.getElementById("player");

button.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    button.innerHTML = "Pause";
  } else {
    audio.pause();
    button.innerHTML = "Play";
  }
});


//_______TEXT-ANIMATION_______//

// Wrap every letter in a span
var textWrapper = document.querySelector('.animation1');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.animation1 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1000,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.animation1',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 6000
  });

var textWrapper = document.querySelector('.animation2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.animation2 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2200,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.animation2',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 6000
  });

var textWrapper = document.querySelector('.animation3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.animation3 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1000,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.animation3',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 6000
  });


var textWrapper = document.querySelector('.animation4');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.animation4 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1500,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.animation4',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 6000
  });

var textWrapper = document.querySelector('.animation5');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.animation5 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1000,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.animation5',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 6000
  });






  // Wrap every letter in a span
var textWrapper = document.querySelector('.animation6');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.animation6 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1100,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.animation6',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 6000
  });

var textWrapper = document.querySelector('.animation7');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.animation7 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2200,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.animation7',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 6000
  });

var textWrapper = document.querySelector('.animation8');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.animation8 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 800,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.animation8',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 6000
  });

