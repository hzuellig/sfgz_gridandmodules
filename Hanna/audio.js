const audioEle = document.querySelector('audio');

var dataArray;
var bufferLength;
var analyser;

const fps = 30;


var isPlaying = false;


audioEle.addEventListener('play', () => {
    startPlay();
});

function startPlay() {
    const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    const audioSourceNode = audioCtx.createMediaElementSource(audioEle);

    let gainNode = audioCtx.createGain();
    audioSourceNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    analyser = audioCtx.createAnalyser();
    audioSourceNode.connect(analyser);

    analyser.fftSize = 128;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);


    draw();
}

function togglePlay() {
    isPlaying ? audioEle.pause() : audioEle.play();
};

audioEle.onplaying = function() {
    isPlaying = true;
    document.body.classList.remove('paused');
    document.body.classList.add('playing');
};

audioEle.onpause = function() {
    isPlaying = false;
    document.body.classList.remove('playing');
    document.body.classList.add('paused');

};

function draw() {

    setTimeout(function() {
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray); //werte von 0-255

        let sum = 0;

        //mittelwert rechnen
        for (let i = 0; i < bufferLength; i++) {
            sum += map(dataArray[i], 0, 255, minscale, maxscale);

        }

        document.documentElement.style.setProperty('--scalesize', sum / bufferLength);


    }, 1000 / fps);



}


function map(val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}