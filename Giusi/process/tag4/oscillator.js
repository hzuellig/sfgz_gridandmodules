const file = document.querySelector('#file-input');
const canvas = document.querySelector('#canvas');
const h3 = document.querySelector('#name');
const audio = document.querySelector('#audio');

// CONTROL MUSIC

document.querySelector('#play').onclick = playAudio;
document.querySelector('#pause').onclick = pauseAudio;
document.querySelector('#stop').onclick = stopAudio;
document.querySelector('#restart').onclick = restartAudio;

let horizontalScroll;
let animationControl;




function startScroll() {
  let speedFrame = document.querySelector('.speedFrame');
  let calcFrameSpeed = () => {
    let frameSpeed = speedFrame.clientWidth / 160;
    return frameSpeed;
  };
  window.scrollBy({ top: 0, left: calcFrameSpeed() });
  horizontalScroll = requestAnimationFrame(startScroll);
    window.onresize = () => calcFrameSpeed();
}

function playAudio() {
  if (audio.paused) {
    startScroll();
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

audio.onplay = function () {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const gainNode = audioCtx.createGain();
  const biquadFilter = audioCtx.createBiquadFilter();
  analyser.fftSize = 2048;

  const source = audioCtx.createMediaElementSource(audio);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  // Connect the source to be analysed
  source.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  biquadFilter.connect(analyser);
  analyser.connect(audioCtx.destination);

  biquadFilter.type = 'bandpass';
  biquadFilter.frequency.value = 60;
  biquadFilter.gain.value = 0;

  function draw() {
    animationControl = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    for (let i = 0; i < bufferLength; i++) {
      const shrinkingElements = document.querySelectorAll('.shrink-animation');
      const weightedTextes = document.querySelectorAll('.weight-animation');
      const anaglyphElements = document.querySelectorAll('.anaglyph-effect');
      const flashElements = document.querySelectorAll('.flash-animation');

      var v = dataArray[i];

      for (let shrinker of shrinkingElements) {
        shrinker.style.transform = `scale(${v / 150})`;
      }

      for (let text of weightedTextes) {
        text.style.fontWeight = `${v * 5}`;
      }

      for (let flashElement of flashElements) {
        flashElement.style.opacity = `${v / 200}`;
      }

      for (let anaglyphText of anaglyphElements) {
        const animationSize = `${v / 3500}em`;
        anaglyphText.style.textShadow = `${animationSize} ${animationSize} 0em red, -${animationSize} -${animationSize} 0em cyan`;
      }
    }
  }

  draw();
};
