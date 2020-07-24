const { ipcRenderer } = require('electron');
const moment = require('moment');
let seconds = 0;
var timer;
let time;
module.exports = {

    start(el){

        time = moment.duration(el.textContent);

        seconds = time.asSeconds();
        clearInterval(timer);

        timer = setInterval(()=>{
            seconds++;
            el.textContent = this.secondsToTime(seconds);
        }, 1000);

    },stop(curso){
        clearInterval(timer);
        let calculatedTime = this.secondsToTime(seconds);
                
        ipcRenderer.send('stoped-time', curso, calculatedTime);
    },
    secondsToTime(seconds){
        return moment().startOf('day').seconds(seconds).format("HH:mm:ss");
    }
}