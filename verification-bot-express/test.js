"use strict";


const obj = new Promise((resolve, reject) => {
  reject(123);
})

obj.then((doc, err) => console.log(doc), (err) => console.log(err))