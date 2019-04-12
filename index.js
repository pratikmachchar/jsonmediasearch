

//mixin new methods into Lodash object
const _ = require('deepdash')(require('lodash'));


async function run() {
    const args = process.argv;
    let jsonFile = args[2];
    if (jsonFile === undefined) {
        console.log("Json file name input missing, comand line is 'node index.js JSONFILENAME.JSON' ");
        jsonFile = "map.json"

    }
    console.log("Input Json file is ", args[2]);
    const fs = require('fs')
    let jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))
    let medias = [];
    _.eachDeep(jsonData, function (value, key, path, depth, parent) {
        if ((key === "source" || key === "image") && value !== '' && value !== null) { //check type source and image
            
            if (typeof (value) === 'string') {
                medias.push(value)
            }
            else if (typeof (value) === 'object') {
                //we require to add array to the array so here ... operator
                medias.push(...value)
            }
     }
    });

        console.log(medias)
        //now removes all medias that are not having extensions we are looking for.
        const validMediaExtensions = [".mp3", ".mp4", ".ogg", ".ogv", ".ai", ".bmp", ".gif",
            ".ico", ".jpeg", ".jpg", ".png", ".svg"];
        let finalMedia = []
        medias.filter(function (media) {
            validMediaExtensions.forEach(function (value) {
                if (media.indexOf(value) > -1){
                    finalMedia.push(media);

                } 
            });
        });
        console.log(finalMedia)

       //now we can write a code to check if the file exists on server if not we get list of such medias

}

run()
