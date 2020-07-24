const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkAbout = document.querySelector("#link-about");
let playButton = document.querySelector('.button-play');
let time = document.querySelector('.time');
let curso = document.querySelector('.curso');
let addButton = document.querySelector('.add-button')
let addField = document.querySelector('.add-field');


window.onload = () => {

    data.getData(curso.textContent)
        .then((dataFile) => {
          //  console.log(dataFile);
            time.textContent = dataFile.times;

        })
}


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

        new Notification('Timer',{
            body: `Chronometer  activity : ${curso.textContent} stopped!!`,
            icon: 'img/stop-button.png'
        });
    }else{
        timer.start(time);
        play = true;
        new Notification('Timer',{
            body: `Chronometer  activity : ${curso.textContent} Started!!`,
            icon: 'img/play-button.png'
        });
    }
    
    playButton.src = imgs[0];

});

ipcRenderer.on('change-option-tray', (event, nameOption) => {
    timer.stop(curso.textContent);
    data.getData(curso.textContent)
    .then((nameOption) => {
      //  console.log(dataFile);
        time.textContent = nameOption.times;

    }).catch((err) => {

        time.textContent = '00:00:00';
    });

    curso.textContent = nameOption;
});

addButton.addEventListener('click', function(){
    if(addField.value == ''){
        return;
    }


    let newContent = addField.value;
    curso.textContent = newContent;
    time.textContent = '00:00:00';
    addField.value = '';
    ipcRenderer.send('add-activity', newContent);
});

ipcRenderer.on('shortcut-start', () => {
   
    let click = new MouseEvent('click');
    playButton.dispatchEvent(click);
});