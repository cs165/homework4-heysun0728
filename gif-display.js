// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(containerElement,musicShowCallBack) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement=containerElement;
    this.musicShowCallBack=musicShowCallBack;
    this.preloading=this.preloading.bind(this);
    this.images=[];
  }
  // TODO(you): Add methods as necessary.
  setGif(url){
    this.containerElement.style.backgroundImage="url('"+url+"')";
  }
  preloading(json,i=0){
    if(i>=json.data.length) return;
    if(i==2) this.musicShowCallBack();//可以開始撥
    //console.log(this.images.length)
    //console.log("image loaded "+i);
    const width=json.data[i].images.downsized.width;
    const height=json.data[i].images.downsized.height;
    this.images[i] = new Image(width, height);
    this.images[i].src = json.data[i].images.downsized.url;
    this.images[i].addEventListener('load', (event) => {
      this.preloading(json,i+1);
    });
  }
}
