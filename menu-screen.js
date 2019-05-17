// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement,goBtnClickCallback,setSongCallback) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement=containerElement;
    this.goBtnClickCallback=goBtnClickCallback;
    this.setSongCallback=setSongCallback;
    this.onSubmit=this.onSubmit.bind(this);
    this.onJsonReady=this.onJsonReady.bind(this);
    this.queryGiphy=this.queryGiphy.bind(this);
    this.onGifJsonReady=this.onGifJsonReady.bind(this);
    this.hideErrorDiv=this.hideErrorDiv.bind(this);
    //element
    this.selectElem = containerElement.querySelector('#song-selector');
    this.queryInput = containerElement.querySelector('#query-input');
    const form= containerElement.querySelector('form');
    this.errorDiv = document.querySelector('#error');

    const themes =['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

    // fetch the songs.json file
    fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
    .then(this.onResponse)
    .then(this.onJsonReady);
    //set initial text of queryInput
    var rand=Math.floor(Math.random()*themes.length);
    this.queryInput.value=themes[rand];

    //when form is submitted
    form.addEventListener('submit',this.onSubmit);

    //when user is type into text
    this.queryInput.addEventListener('input',this.hideErrorDiv);
  }
  // TODO(you): Add methods as necessary.
  onResponse(response){
    return response.json();
  }

  onJsonReady(myJson) {
    //add options into select
    //console.log(myJson);
    this.myJson=myJson;
    for(var key in myJson){
      //console.log(myJson[key].title)
      var option = document.createElement("option");
      option.text = myJson[key].title;
      option.value=myJson[key].songUrl;
      this.selectElem.add(option);
    }
  }

  onGifJsonReady(myJson) {
    //show gifs json
    console.log(myJson)
    //check length
    var len=myJson.data.length;
    //console.log(len);
    if(len>=2){
      //call show function below
      this.hide();
      this.goBtnClickCallback(myJson);
    }else{
      //show error div
      this.errorDiv.classList.remove("inactive");
    }
  }

  hide(){
    //hide the menu screen
    this.containerElement.style.display="none";
  }
  onSubmit(){
    event.preventDefault();
    //get info value
    var songValue=this.selectElem.value;
    var info={
      "songValue":songValue,
      "gifValue":this.queryInput.value
    }
    //print out the submitted song value and theme value
    console.log(info);
    // set song
    this.setSongCallback(info);
    // query gif data
    this.queryGiphy(info);
  }

  queryGiphy(info){
    // query the Giphy API
    //console.log("gif="+this.info.gifValue);
    const JSON_PATH="https://api.giphy.com/v1/gifs/search?q="+info.gifValue+"&api_key=zjsrGhZAY0jUDJqsbTP1G8gxschIXo6K&limit=25&rating=g"
    fetch(JSON_PATH)
    .then(this.onResponse)
    .then(this.onGifJsonReady);
  }

  hideErrorDiv(){
    this.errorDiv.classList.add("inactive");
  }

}
