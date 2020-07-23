const { ipcRenderer } = require('electron');
const timer = require('./timer');

let linkAbout = document.querySelector("#link-about");
let playButton = document.querySelector('.button-play');
let time = document.querySelector('.time');
let curso = document.querySelector('.curso');

linkAbout.addEventListener('click', function() {
    ipcRenderer.send('open-window-about');
});

let imgs = ['img/play-button.svg','img/stop-button.svg'];
let play = false;

playButton.addEventListener('click', function(){
    imgs = imgs.reverse();
    
    if(play){
        timer.stop(curso.textContent);
        play = false;
    }else{
        timer.start(time);
        play = true;
    }
    
    
    

    playButton.src = imgs[0];

});