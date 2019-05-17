// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    // bind function
    this.goBtnClick=this.goBtnClick.bind(this);
    this.setSong=this.setSong.bind(this);
    // menuScreen
    const menu = document.querySelector('#menu');
    this.menuScreen=new MenuScreen(menu,this.goBtnClick,this.setSong);
    // musicScreen
    const music = document.querySelector('#music');
    this.musicScreen=new MusicScreen(music);
    this.musicScreen.hide();
  }
  // TODO(you): Add methods as necessary.
  setSong(info){
    this.musicScreen.setSong(info)
  }

  goBtnClick(json){
    this.musicScreen.setJson(json)
    //this.musicScreen.show(info);  
  }
}
