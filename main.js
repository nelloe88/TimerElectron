const { app, BrowserWindow, ipcMain } = require('electron');
const data = require('./data.js');



app.on('ready', () => {
    console.log('Started!');
    
    let mainWindow = new BrowserWindow({
        with: 600,
        height: 400

    });
    console.log(__dirname);
   // mainWindow.loadURL('http://androidneon.com');
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);


});

app.on('window-all-closed', () => {
    app.quit();
});


let aboutWindow = null;
ipcMain.on('open-window-about', () => {

        if(aboutWindow == null){
            aboutWindow = new BrowserWindow({
                with: 300,
                height: 220,
                alwaysOnTop: true,
                frame: false

            });
            aboutWindow.on('closed', () => {
                aboutWindow = null;
            });
        }
        aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on('close-window-about', () => {
    aboutWindow.close();
});

ipcMain.on('stoped-time', (event, curso, calculatedTime) => {

    //console.log(`o curso ${curso} foi estudado`+ calculatedTime);
    data.saveData(curso, calculatedTime)

});