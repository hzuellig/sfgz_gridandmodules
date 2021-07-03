/* Menu overlay */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav(y) {
    document.getElementById("myNav").style.width = "0%";
}

/* Audio */
var audio = new Audio("Kunzite-Minerals-96.mp3");

$('#play-pause-button').on("click",function(){
if($(this).hasClass('fa-play'))
{
 $(this).removeClass('fa-play');
 $(this).addClass('fa-pause');
 audio.play();
}
else
{
 $(this).removeClass('fa-pause');
 $(this).addClass('fa-play');
 audio.pause();
}
});

audio.onended = function() {
 $("#play-pause-button").removeClass('fa-pause');
 $("#play-pause-button").addClass('fa-play');
};
