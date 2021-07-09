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
}

calcHeightContainer();
window.onresize = () => calcHeightContainer();

// CONTROL MUSIC
document.querySelector('#play').onclick = playAudio;
document.querySelector('#pause').onclick = pauseAudio;
document.querySelector('#stop').onclick = stopAudio;
// document.querySelector('#restart').onclick = muteAudio;

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

let source, audioCtx;

function playAudio() {
  if (source == undefined) {
    audioCtx = new AudioContext();
    source = audioCtx.createMediaElementSource(audio);
  }
  audio.play();
}

function pauseAudio() {
  audio.pause();
  cancelAnimationFrame(horizontalScroll);
  cancelAnimationFrame(animationControl);
}

function stopAudio() {
  window.scrollTo({ left: 0, behavior: 'smooth' });
  audio.currentTime = 0;
  pauseAudio();
}

function restartAudio() {
  audio.currentTime = 0;
  window.scrollTo(0, 0);
  playAudio();
}

// ANALYSE AUDIO

const volume = document.querySelector('#volume input');

audio.onplay = function () {
  const analyser = audioCtx.createAnalyser();
  const gainNode = audioCtx.createGain();
  const biquadFilter = audioCtx.createBiquadFilter();
  analyser.fftSize = 64;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  let audioGain = volume.value;

  volume.oninput = function () {
    gainNode.gain.value = volume.value;
  };

  // Connect the source to be analysed
  source.connect(gainNode);
  source.connect(biquadFilter);
  biquadFilter.connect(analyser);
  gainNode.connect(audioCtx.destination);

  biquadFilter.type = 'lowpass';
  biquadFilter.frequency.value = 50;
  gainNode.gain.value = audioGain;

  function draw() {
    animationControl = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    sum = sum / bufferLength;

    // const root = document.documentElement;
    // root.style.setProperty('--sound', sum);

    const shrinkingElements = document.querySelectorAll('.shrink-animation');
    const weightedTextes = document.querySelectorAll('.weight-animation');
    const anaglyphElements = document.querySelectorAll('.anaglyph');
    const flashElements = document.querySelectorAll('.flash-animation');

    for (let shrinker of shrinkingElements) {
      shrinker.style.transform = `scale(${sum / 150})`;
    }

    for (let text of weightedTextes) {
      text.style.fontWeight = `${sum * 6}`;
    }

    for (let flashElement of flashElements) {
      flashElement.style.opacity = `${sum / 250}`;
    }

    for (let anaglyphText of anaglyphElements) {
      const animationSize = `${sum / 2000}em`;
      anaglyphText.style.textShadow = `${animationSize} ${animationSize} 0em red, -${animationSize} -${animationSize} 0em cyan`;
    }
  }

  draw();
};
