const file = document.querySelector('#file-input');
const canvas = document.querySelector('#canvas');
const h3 = document.querySelector('#name');
const audio = document.querySelector('#audio');

audio.onplay = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');

  const context = new AudioContext();
  let src = context.createMediaElementSource(audio);

  const analyser = context.createAnalyser();
  const freqs = new Uint8Array(analyser.frequencyBinCount);

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 16384;

  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);

  console.log('DATA-ARRAY: ', dataArray);

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  console.log(WIDTH, HEIGHT);

  console.log('WIDTH ', WIDTH, 'HEIGHT ', HEIGHT);

  const barWidth = (WIDTH / bufferLength) * 13;
  console.log('BARWIDTH ', barWidth);

  console.log('TOTAL WIDTH ', 117 * 10 + 118 * barWidth);

  let barHeight;
  let x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    let r, g, b;
    let bars = 118;

    for (let i = 0; i < bars; i++) {
      barHeight = dataArray[i] * 2.5;

      if (dataArray[i] > 210) {
        r = 255;
        g = 0;
        b = 0;
      } else if (dataArray[i] > 200) {
        r = 255;
        g = 80;
        b = 0;
      } else if (dataArray[i] > 190) {
        r = 255;
        g = 180;
        b = 0;
      } else if (dataArray[i] > 180) {
        r = 255;
        g = 255;
        b = 0;
      } else {
        r = 255;
        g = 255;
        b = 80;
      }

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 10;
    }
  }
  audio.play();
  renderFrame();
};
