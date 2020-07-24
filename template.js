const data = require('./data');
const { ipcMain } = require('electron');

module.exports = {

    trayMenuTemplate(window){
        templateDefault: null;
        let template = [
            {label: 'Cursos'},
            {type: 'separator'}
        ];

        let cursos = data.getNameDataFile();

        cursos.forEach((curso) => {

            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    window.send('change-option-tray', curso);
                }
            }
            template.push(menuItem);
        })

        this.templateDefault = template;
        return template;
    },
    addItemMenuTray(curso, window){
        console.log('curso = '+curso);
        this.templateDefault.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                window.send('change-option-tray', curso);
            }
        })
        return this.templateDefault;
    },
    geraMenuPrincipalTemplate(app){
        let templateMenu = [
            {
                label: 'View',
                submenu: [{
                    role: 'reload'
                },
                {
                    role: 'toggledevtools'
                  }
                ]
            },
            {
                label: 'Window',
                submenu: [
                    {
                        role: 'minimize'                       
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'About',
                        click: () => {
                            ipcMain.emit('open-window-about');
                        },
                        accelerator: 'CmdOrCtrl+I'
                    }
                ]
            }
        ];
        if( process.platform == 'darwin'){
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    {
                        label: 'Estou rodando no Mac!'
                    }
                ]
            })
         }
         return templateMenu;
    }


}