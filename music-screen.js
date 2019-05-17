// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    //bind function 
    this.containerElement=containerElement;
    this.playBtnClickCallBack=this.playBtnClickCallBack.bind(this);
    this.kickCallback=this.kickCallback.bind(this);
    this.setJson=this.setJson.bind(this);
    this.setSong=this.setSong.bind(this);
    this.getRandomGif=this.getRandomGif.bind(this);
    this.show=this.show.bind(this);
    
    //gifdisplay
    this.gifDiv= this.containerElement.querySelector("#foreground");
    this.gifdisplay = new GifDisplay(this.gifDiv,this.show);//foreground
    this.gifDiv2= this.containerElement.querySelector("#background"); 
    this.gifdisplay2 = new GifDisplay(this.gifDiv2,this.show);//background
    this.isForeground=true;
    this.randomNum=-1;

    //play button
    const playbtn=this.containerElement.querySelector("#button");
    this.playButton = new PlayButton(playbtn,this.playBtnClickCallBack);
    this.loadingPage=document.querySelector("#loading");
  }
  // TODO(you): Add methods as necessary
  hide(){
    this.containerElement.style.display="none";
  }
  setSong(info){
    //setting music
    this.audioPlayer = new AudioPlayer()
    this.audioPlayer.setSong(info.songValue);
    this.audioPlayer.setKickCallback(this.kickCallback);
  }
  setJson(json){
    //console.log("set json");
    this.gifJson=json;
    this.gifdisplay.preloading(json);
    //show loading page
    this.loadingPage.style.display="block";
  }
  getRandomGif(){
    while(1){
      var i = Math.floor(Math.random()*(this.gifdisplay.images.length));
      if(this.randomNum!=i) break;
    }
    this.randomNum=i;
    //console.log(i +" " +this.gifdisplay.images[i]);
    return this.gifdisplay.images[i].src;
  }
  show(){
    //play music
    this.audioPlayer.play();

    //show random gif
    this.gifdisplay.setGif(this.getRandomGif());
    this.gifdisplay2.setGif(this.getRandomGif());

    //hide loading page
    this.loadingPage.style.display="none";

    //show music screen
    this.containerElement.style.display="flex";
  }
  kickCallback(){
    console.log("kick");
    //swap gif buffer
    if(this.isForeground){
      this.gifDiv2.style.zIndex="99";
      this.gifDiv.style.zIndex="1";
    }else{
      this.gifDiv2.style.zIndex="1";
      this.gifDiv.style.zIndex="99";
    }
    //update the new background layer
    this.gifdisplay2.setGif(this.getRandomGif());
  }
  playBtnClickCallBack(isPlaying){
    //console.log("play btn click callback")
    if(isPlaying){
      this.audioPlayer.pause();
    }else{
      this.audioPlayer.play();
    }
  }
}
