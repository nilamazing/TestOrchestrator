//const TestClass = require("../Backbone/test");

const handlerClasses = {
    //test:TestClass,
    add: function (str) {
        //console.log(str);
        const myObj = require(`../Backbone/${str}`);
        //console.log(myObj);
        if (!this[str]) {
            this[str] = myObj;
        }
    },
    invoke: function(className,methodName,data){
        if(this[className]){
           return (data)?new this[className]()[methodName](data):new this[className]()[methodName]()
        }
    }
}

module.exports = handlerClasses