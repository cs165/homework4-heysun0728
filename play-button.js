// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(containerElement,playBtnClickCallBack) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.isPlaying=true;
    this.containerElement=containerElement;
    this.playBtnClickCallBack=playBtnClickCallBack;
    this.btnClick=this.btnClick.bind(this);
    this.playing=this.playing.bind(this);
    this.paused=this.paused.bind(this);
    containerElement.addEventListener('click',this.btnClick);
    this.playing();
  }
  // TODO(you): Add methods as necessary.
  playing(){
    this.containerElement.style.backgroundImage="url('images/pause.png')";
  }
  paused(){
    this.containerElement.style.backgroundImage="url('images/play.png')";
  }
  btnClick(){
    console.log("play button click");
    this.playBtnClickCallBack(this.isPlaying);
    if(this.isPlaying){
      this.paused();//change background
      this.isPlaying=false;
    }else{
      this.playing();
      this.isPlaying=true;
    }
  }
}

