document.addEventListener("DOMContentLoaded", function(){

//Scroll on click
var contentStart = document.getElementById('scroll-to-band');
var contentStartPosition = contentStart.offsetTop;

var mainCTA = document.getElementById('main-cta');

mainCTA.addEventListener("click", function(){
  ScrollToBand();
  return false;
});//Main CTA Click
    
var scrolling;

function ScrollToBand() {
  if(window.scrollY < contentStartPosition){
      scrolling = setTimeout(function() {
         window.scrollTo(contentStartPosition,window.scrollY+30);
          ScrollToBand();
      }, 20);
   }
    
    
    //If it hits the bottom before the scroll to position
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        clearTimeout(scrolling);
    }
}
    
    
//Slideshow
var seconds = 3;
document.querySelector('.slideshow').style.display = 'none';
 var x = document.body.querySelectorAll('.slideshow');
 var index = 0;
 for( index=0; index < x.length; index++ ) { 
     var navArrow = document.createElement('div'); 
     navArrow.id = 'slideGroup'; 
     
     navArrow.innerHTML = '<img id="soundboardSlide" class="slide" src="images/soundboard.jpg"/><img id="drummerSlide" class="slide" src="images/drummer.jpg"/><img id="singerSlide" class="slide showing" src="images/singer.jpg"/>';
      x[index].parentNode.insertBefore(navArrow, x[index].nextSibling);   
 }
    
var slides = document.querySelectorAll('#slideGroup .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,seconds*1000);

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide showing';
}
    
//Set slide height
var slideHeight = document.getElementById('tires');

//Allow dynamic slideshow to load first before getting elements
setTimeout(function(){
    document.getElementById('slideGroup').style.height = slideHeight.offsetHeight+'px';
    //Set scroll position after loaded
    contentStartPosition = contentStart.offsetTop;
}, 100);

//On resize    
window.onresize = function(){
    //Reset the scroll position
    contentStartPosition = contentStart.offsetTop;
    //Reset the slide height
    document.getElementById('slideGroup').style.height = slideHeight.offsetHeight+'px';
};
    
    
    


//Get number of songs in playlist
var playlist = document.querySelector('.playlist');
document.getElementById("songTotal").innerHTML = playlist.getElementsByTagName('audio').length;


//Dynamically set ids for content
var audios;
var icons;
var songTimes;
var minutes;
var seconds;
var currentlyPlaying = false;

//Get playbars
var playbars = document.querySelectorAll(".playbar");
for (var i = 0; i < playbars.length; i++){

  //Dynamically set ids for playbar
  playbars[i].setAttribute("id", "playbar"+i);

  //Dynamically set ids for songs
  songTimes = playbars[i].getElementsByTagName('span');
  for(var s = 0; s < songTimes.length; s++){
    songTimes[s].setAttribute("id", "song"+i);
  }

  //Dynamically set ids for audio
  audios = playbars[i].getElementsByTagName('audio');
  for(var a = 0; a < audios.length; a++){
    audios[a].setAttribute("id", "aud"+i);
  }

  //Dynamically set ids for icons
  playbars[i].getElementsByTagName('i')[0].setAttribute("id", "icon"+i);
  
  //Dynamically set ids for song titles
  playbars[i].getElementsByTagName('p')[0].setAttribute("id", "songTitle"+i);

}//playbars loop

//Get durations of the songs
var totalDuration = 0;
function duration(v)
{
    var audio = document.getElementById("aud"+v);
    if(audio.readyState > 0)
    {
        //Calculate song duration
        var minutes = parseInt(audio.duration / 60, 10);
        var seconds = parseInt(audio.duration % 60);
        document.getElementById("song"+v).innerHTML = minutes+":"+seconds;
        document.getElementById("songTitle"+v).innerHTML = audio.name;

        //Calculate total song duration
        totalDuration = totalDuration + audio.duration;
    }
}

//Set durations
setTimeout(function(){
  for (var p = 0; p < playbars.length; p++){
    duration(p);
  }
  var totalMinutes = parseInt(totalDuration / 60, 10);
  var totalSeconds = parseInt(totalDuration % 60);
  document.getElementById('trackTimeTotal').innerHTML = totalMinutes+":"+totalSeconds;
}, 500);


//Event delegation --- Playbar on click
document.addEventListener('click',function(e){
  for (var t = 0; t < playbars.length; t++){
    if(e.target && e.target.id== 'playbar'+t){
          console.log(t);
          if (currentlyPlaying == false){
                document.getElementById('icon'+t).classList.remove('fa-play');
                document.getElementById('icon'+t).classList.add('fa-pause');
                document.getElementById('aud'+t).play();
                document.getElementById('aud'+t).addEventListener("ended", reset);
                currentlyPlaying = true;
              } else{
                document.getElementById('icon'+t).classList.remove('fa-pause');
                document.getElementById('icon'+t).classList.add('fa-play');
                document.getElementById('aud'+t).pause();
                currentlyPlaying = false;
              }
     }
   }
 });//Playbar click

//Reset when song ends
 function reset(){
       console.log("This song has ended");
      for (var t = 0; t < playbars.length; t++){
           document.getElementById('icon'+t).classList.remove('fa-pause');
           document.getElementById('icon'+t).classList.add('fa-play');
      }
       currentlyPlaying = false;
 }

});//doc ready
