const request = require('request');
const webHandlerFactory = require('./Factory/factoryWeb');
let ResponseTracker = {};
let promisesArr = [];
// request.post({
//     url: "http://localhost:3000/test1",
//     headers: { 'content-type': "application/json" },
//     body: JSON.stringify({ data: { name: "Nilanjan Dutta" } })
// }, (err, res, body) => {
//     if (!err) {
//         console.log(body);
//     }
// });
// const serviceInput={
//     method:"POST",
//     url: "http://localhost:3000/test1",
//     headers: { 'content-type': "application/json" },
//     body: JSON.stringify({ data: { name: "Nilanjan Dutta" } })
// }
// request(serviceInput, (err, res, body) => {
//     if (!err) {
//         console.log(body);
//     }
// });

//webHandlerFactory.create("POST","http://localhost:3000/test1",{ "data": { "name": "Nilanjan Dutta" } });
let data={ "data": { "name": "Nilanjan Dutta","code":"<placeholder>" } };
let strData=JSON.stringify(data);
console.log(strData);
let r = (Math.random() + 1).toString(36).substring(7);
strData=strData.replace("<placeholder>",r);
console.log(strData);
let webPromise = webHandlerFactory.invoke("POST", "http://localhost:3001/test2", JSON.parse(strData));
if (webPromise) {
    promisesArr.push(webPromise);
    webPromise.then((data, err) => {
        if (!err) {
            console.log(data);
        }
        else {
            console.log(err);
        }
    })
}

// let svcInput = JSON.stringify(servcInput);
//console.log(servcInput);

// request(servcInput, (err, res, body) => {
//     if (!err) {
//         console.log(body);
//     }
// });