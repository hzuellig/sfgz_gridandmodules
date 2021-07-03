/**
 * Created by hzuellig on 02.07.21.
 */

function playAudio() {
    let audioel = document.querySelector("audio");
    audioel.play();
    document.querySelector('body').classList.toggle('startanimation');
    console.log('est');

}