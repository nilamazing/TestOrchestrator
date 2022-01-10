const request = require('request');
const webHandlerFactory = {
    create: function (method, serviceUrl, inputData, contentType) {
        serviceInput = {};
        if (!serviceUrl || serviceUrl.length <= 0) {
            return false;
        }
        if (!this[method]) {
            this[method] = method.toUpperCase();
            //serviceInput+=`{method: '${this[method]}',`;
        }
        serviceInput["method"] = this[method];
        if (!this.contentType) {
            this[contentType] = (contentType) ? contentType : "application/json"
            //serviceInput+=`headers: {'content-type':'${this[contentType]}'},`;
            
        }
        serviceInput["headers"] = { 'content-type': this[contentType] };
        this[serviceUrl] = serviceUrl;
        //serviceInput+=`url:'${this[serviceUrl]}'`
        serviceInput["url"] = this[serviceUrl];
        this[inputData] = (inputData) ? JSON.stringify(inputData) : null;
        if (this[inputData]) {
            // serviceInput+=`,body: ${this[inputData]}}`
            serviceInput["body"] = this[inputData];
        }
        // else{
        //     serviceInput+="}"
        // }
        this["serviceInput"] = serviceInput;
    },
    invoke: function (method, serviceUrl, inputData, contentType) {
        this.create(method, serviceUrl, inputData, contentType);
        return new Promise((resolve, reject) => {
            request(this["serviceInput"], (err, res, body) => {
                if (!err) {
                    resolve(body);
                }
                else {
                    reject(err);
                }
            });

        });
    }
}

module.exports = webHandlerFactory