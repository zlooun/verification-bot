"use strict";




const path = require ("path");
const crypto = require ("crypto");


const fileSave = require ("file-save");
const fileType = require ("file-type");
const im = require ("imagemagick");



const pathDir = path. resolve ("./static/private/user/avatar");
const pathUrl = "/static/private/user/avatar";

const errorMassage = "The photo must have no less than 300 and no more than 4 000 pixels on each side. The photo also cannot have one dimension several times the size of the other.";


const handler = (req, res, idUser) => {

  const user = req. user;
  const avatarPhoto = req. files;

  
  if (!avatarPhoto) {
    res. json (global. listStatus. invalidPhoto (null, "Нет файлов"));
    return undefined;
  }


  if (!avatarPhoto. photo) {
    res. json (global. listStatus. invalidPhoto (null, "Нет файла под названием photo"));
    return undefined;
  }


  const avatar = avatarPhoto. photo;


  if (!avatar. data) {
    res. json (global. listStatus. invalidPhoto (null, "Нет бинарного кода"));
    return undefined;
  }

  if (avatar.truncated){
    res. json (global. listStatus. invalidPhoto (null, "Файл слишком большой."));
    return undefined;
  }

  fileType.fromBuffer(avatar.data).then(infoFile => {

    if(!infoFile){
      res.json (global. listStatus. invalidPhoto (null, "Не известный файл"));
      return undefined;
    }

    if (infoFile. ext !== "jpg" && infoFile. ext !== "png") {
      res.json (global. listStatus. invalidPhoto (null, "Неверный формат (Нужен png или jpg)"));
      return undefined;
    }
  
    const nameDir = crypto. createHash ("md5"). update (Math. random () + user. uuid). digest ("hex");
    const nameFile = crypto. createHash ("md5"). update (Math. random () + user. uuid). digest ("hex");
    const fullPathDir = path. join (pathDir, nameDir);
    const fullPathFileMax = path. join (fullPathDir, `${ nameFile }.max.${ infoFile. ext }`);
    const fullPathFileMin = path. join (fullPathDir, `${ nameFile }.min.${ infoFile. ext }`);
    const fullPathUrl = `${ pathUrl }/${ nameDir }/${ nameFile }.min.${ infoFile. ext }`;

  
    fileSave (fullPathFileMax). write (avatar. data). end (). finish (() => {
  
      const options = {
        "srcPath": fullPathFileMax,
        "dstPath": fullPathFileMin,
        "width": 300,
        "height": 300,
        "quality": 1,
        "gravity": "North"
      };

      console.log("4");

      im.identify(fullPathFileMax, function(err, features){

        console.log("3");

        if (err) {
          console.log(err);
          return;
        }

        const width = features.width, height = features.height;
        
        if (width < 300 || height < 300 && width > 4000 || height > 4000){
          res.json (global. listStatus. invalidPhoto (null, errorMassage));
          return;
        }

        if (width > 3 * height || width * 3 < height){
          res.json (global. listStatus. invalidPhoto (null, errorMassage));
          return;
        }
        console.log("1");

        im. crop (options, (err, stdOut, stdErr) => {
          if (err) console. log (err);
          return;
        });

        console.log("2");

        const updateObj = {
          "photo": fullPathUrl
        };
      
      
        global. mongoModels. User. findByIdAndUpdate (idUser, updateObj, { "new": true }, (err, doc) => {
      
          if (err) {
            console. log (err);
            res. json (global. listStatus. notSuccess ());
            return undefined;
          }
      
          if (!doc) {
            res. json (global. listStatus. notUpdate ());
            return undefined;
          }

          res. json (global. listStatus. success ());
          return undefined;
        });


        return;
      });

      return;
    });
  
    return;
  });
 
  return;
};




module.exports = () => handler;