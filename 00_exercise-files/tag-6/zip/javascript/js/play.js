/**
 * Created by hzuellig on 02.07.21.
 */

function playAudio() {
    let el = document.querySelector('audio');
    el.play();
    document.querySelector('body').classList.toggle('startanimation');
    console.log('toggle');
}