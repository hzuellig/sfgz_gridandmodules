const file = document.querySelector('#file-input');
const canvas = document.querySelector('#canvas');
const h3 = document.querySelector('#name');
const audio = document.querySelector('#audio');

// CSS VALUES

const lyricsContainer = document.querySelector('.main-container');

function calcHeightContainer() {
  const root = document.documentElement;
  let containerY = lyricsContainer.clientHeight;
  root.style.setProperty('--cy', containerY / 100 + 'px');
  console.log(containerY);
}

calcHeightContainer();
window.onresize = () => {
  calcHeightContainer();
};

// CONTROL MUSIC

document.querySelector('#play').onclick = playAudio;
document.querySelector('#pause').onclick = pauseAudio;
document.querySelector('#stop').onclick = stopAudio;
document.querySelector('#restart').onclick = restartAudio;

let horizontalScroll;
let animationControl;

// window.onresize = () => calcFrameSpeed();

function startScroll() {
  let calcFrameSpeed = () => {
    let frameSpeed = speedFrame.clientWidth / 160;
    return frameSpeed;
  };
  let speedFrame = document.querySelector('.speedFrame');
  window.scrollBy({ top: 0, left: calcFrameSpeed() });
  horizontalScroll = requestAnimationFrame(startScroll);
}

function playAudio() {
  if (audio.paused) {
    // startScroll();
  }
  audio.play();
}

function pauseAudio() {
  audio.pause();
  cancelAnimationFrame(horizontalScroll);
  cancelAnimationFrame(animationControl);
}

function stopAudio() {
  pauseAudio();
  audio.currentTime = 0;
  window.scrollTo({ left: 0, behavior: 'smooth' });
}

function restartAudio() {
  audio.currentTime = 0;
  window.scrollTo(0, 0);
  playAudio();
}

// ANALYSE AUDIO

var audioCtx;

audio.onplay = function () {
  audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const gainNode = audioCtx.createGain();
  const biquadFilter = audioCtx.createBiquadFilter();
  analyser.fftSize = 64;

  const source = audioCtx.createMediaElementSource(audio);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  // Connect the source to be analysed
  source.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  biquadFilter.connect(analyser);
  source.connect(audioCtx.destination);

  biquadFilter.type = 'bandpass';
  biquadFilter.frequency.value = 60;
  biquadFilter.gain.value = 0;

  function draw() {
    animationControl = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    sum = sum / bufferLength;

    const root = document.documentElement;
    root.style.setProperty('--scale', sum);

    const shrinkingElements = document.querySelectorAll('.shrink-animation');
    const weightedTextes = document.querySelectorAll('.weight-animation');
    const anaglyphElements = document.querySelectorAll('.anaglyph-effect');
    const flashElements = document.querySelectorAll('.flash-animation');

    for (let shrinker of shrinkingElements) {
      shrinker.style.transform = `scale(${sum / 150})`;
    }

    // for (let text of weightedTextes) {
    //   text.style.fontWeight = `${sum * 1}`;
    // }

    for (let flashElement of flashElements) {
      flashElement.style.opacity = `${sum / 150}`;
    }

    for (let anaglyphText of anaglyphElements) {
      const animationSize = `${sum / 2000}em`;
      anaglyphText.style.textShadow = `${animationSize} ${animationSize} 0em red, -${animationSize} -${animationSize} 0em cyan`;
    }
  }

  draw();
};
