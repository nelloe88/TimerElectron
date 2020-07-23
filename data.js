const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {

    saveData(curso, timeActivity){

        let filePath = __dirname + '/data/'+ curso +'.json';

        console.log("arquivo "+filePath);

        if(fs.existsSync(filePath)){
                this.addTimeActivity( filePath,timeActivity);
        }else{
            this.creatFileByActivity(filePath, {})
                .then(() => {
                    this.addTimeActivity( filePath,timeActivity);
                })
        }

    },
    addTimeActivity(fileName,time){
        let dados = {
            lastActivity : new Date().toString(),
            times: time            
        }
        console.log('-- '+ dados);
        jsonfile.writeFile(fileName, dados, {spaces: 2})
            .then(() => {
                console.log('Time saved!')
            }).catch((err) => {
                console.log('erro'+ err);
            });
    },

    creatFileByActivity(fileName, fileContent){

      return  jsonfile.writeFile(fileName, fileContent)
            .then(() => {
                console.log('record')
            }).catch((err) => {
                console.log(err);                
            });
    },
    getData(curso){
        let filePath = __dirname + '/data/'+ curso +'.json';
        return jsonfile.readFile(filePath);
    }


}