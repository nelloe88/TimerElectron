 const { ipcRenderer, shell } = require('electron');
const process = require('process');

 let linkClose = document.querySelector("#link-close");
 let linkTwitter = document.querySelector("#link-twitter");
 let versionElectron = document.querySelector('#version-electron');

window.onload = function(){
    versionElectron.textContent = process.versions.electron;
};


 linkClose.addEventListener('click', function (){
    ipcRenderer.send('close-window-about');
 });

 linkTwitter.addEventListener('click', function (){
   shell.openExternal("https://androidneon.com/");
 });