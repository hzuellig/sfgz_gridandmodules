// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
var analyser = audioContext.createAnalyser();

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// select our play button
const playButton = document.querySelector('button');

playButton.addEventListener(
  'click',
  function () {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
      audioElement.play();
      this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
      audioElement.pause();
      this.dataset.playing = 'false';
    }
  },
  false
);

audioElement.addEventListener(
  'ended',
  () => {
    playButton.dataset.playing = 'false';
  },
  false
);

// Volume function starts here

const gainNode = audioContext.createGain();

const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener(
  'input',
  function () {
    gainNode.gain.value = this.value;
  },
  false
);

// Pan function starts here

const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener(
  'input',
  function () {
    panner.pan.value = this.value;
  },
  false
);

track.connect(gainNode).connect(panner).connect(audioContext.destination);

track.connect(analyser);
// analyser.connect(distortion);
// distortion.connect(audioContext.destination);

//-------------------

var analyser = audioContext.createAnalyser();

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

const canvasCtx = document.querySelector('canvas');

// draw an oscilloscope of the current audio source

function draw() {
  drawVisual = requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  canvasCtx.beginPath();

  var sliceWidth = (WIDTH * 1.0) / bufferLength;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 128.0;
    var y = (v * HEIGHT) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

// draw();
