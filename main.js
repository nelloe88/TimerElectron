const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const data = require('./data.js');
const templateModel = require('./template');

let tray = null;
let mainWindow = null;

app.on('ready', () => {
    console.log('Started!');
    
    mainWindow = new BrowserWindow({
        with: 600,
        height: 400

    });
    //icone in bare
    tray = new Tray(__dirname+'/app/img/icon-tray.png');
    //menu by icon bare
    let template = templateModel.trayMenuTemplate(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template);

    tray.setContextMenu(trayMenu);

    let templateMenu = templateModel.geraMenuPrincipalTemplate(app);
    let menuPrincipal = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(menuPrincipal);

    

    //console.log(__dirname);
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
ipcMain.on('add-activity', (event, newActivity) => {
    
    let newTemplate = templateModel.addItemMenuTray(newActivity, mainWindow);
    let trayMenu = Menu.buildFromTemplate(newTemplate);
    tray.setContextMenu(trayMenu);
});