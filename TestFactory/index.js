// const testClass=require('./Backbone/test');
// const testObj=Object.create(new testClass());
// console.log(testObj['printHello']());
// const testClass1={
//     printHello1: function(){
//         return "Hello from Test Class1";
//     }
// }
// console.log(Object.create(testClass1));
const factory=require('./Factory/factory');
let PathInfo=require("./Entities/InternalPath");
let MethodInfo=require("./Entities/Internal");
const configReader=require('./Utilities/ConfigReader');
const webHandlerFactory = require('./Factory/factoryWeb');
let methodInfo={};
let methodInfos=[];
let promisesArr = [];
let webPromise=null;
let isAsyncCallInPath=false;
configReader.initConfig();
PathInfo=configReader.selectCommandPath("Path2");

if(PathInfo && PathInfo.methods && PathInfo.methods.length>0){
    for(let i=0;i<PathInfo.methods.length;i++){
        methodInfo=PathInfo.methods[i];
        methodInfos.push(methodInfo);
    }
    for (let index = 0; index < methodInfos.length-1; index++) {
        methodInfo=methodInfos[index];
        methodInfo["next"]=methodInfos[index+1];        
    }
    methodInfos[methodInfos.length-1]["next"]=null;
    //console.log(methodInfos);
}

methodInfo=methodInfos[0];
const executeTargets=(methodInfo)=>{
    if(methodInfo.invokeType=="Internal"){
        factory.add(methodInfo.title);
        console.log(factory.invoke(methodInfo.title,methodInfo.method,methodInfo.data));
        //methodInfo=methodInfo.next;
        if(methodInfo.next){
            executeTargets(methodInfo.next);
        }
      }
      else{
        webPromise = webHandlerFactory.invoke(methodInfo.method, methodInfo.serviceUrl, methodInfo.data);
        webPromise.then((data,err)=>{
                    if(!err){
                        console.log(data);
                        let strObj=JSON.parse(data);
                        let outputData = strObj["msg"];
                        //methodInfo=methodInfo.next;
                        if(methodInfo.next){
                            let inputData=methodInfo.next.data;
                            let strData=JSON.stringify(inputData);
                            if(strData){
                               strData=strData.replace("<placeholder>",outputData);
                               methodInfo.next.data=JSON.parse(strData);
                            }
                            executeTargets(methodInfo.next);
                        }
                    }
                    else{
                        console.log(err);
                    }
                });
      }
}
executeTargets(methodInfo);
// while(methodInfo){
//   if(methodInfo.invokeType=="Internal"){
//     factory.add(methodInfo.title);
//     console.log(factory.invoke(methodInfo.title,methodInfo.method,methodInfo.data));
//     methodInfo=methodInfo.next;
//   }
//   else{
//     webPromise = webHandlerFactory.invoke(methodInfo.method, methodInfo.serviceUrl, methodInfo.data);
//     webPromise.then((data,err)=>{
//                 if(!err){
//                     console.log(data);
//                    methodInfo=methodInfo.next;
//                 }
//                 else{
//                     console.log(err);
//                 }
//             });
//   }
// }


//   else{
//     webPromise = webHandlerFactory.invoke(MethodInfo.method, MethodInfo.serviceUrl, MethodInfo.data);
//     webPromise
//   }
// }


// if(PathInfo && PathInfo.methods && PathInfo.methods.length>0){
//     for(let i=0;i<PathInfo.methods.length;){
//         // while(methodCallIterator>=0){
//         MethodInfo=PathInfo.methods[i];
//         if(MethodInfo.invokeType=="Internal"){
//             if(isAsyncCallInPath){
//                 webPromise.then((data,err)=>{
//                     if(data){
//                         factory.add(MethodInfo.title);
//                         isAsyncCallInPath=false;
//                         i++;
//                     }
//                 });
//             }
//             else{
//                 factory.add(MethodInfo.title);
//                 i++;
//             }
            
//             //console.log(new factory[MethodInfo.title]()[MethodInfo.method](MethodInfo.data))
//             console.log(factory.invoke(MethodInfo.title,MethodInfo.method,MethodInfo.data));
//             //methodCallIterator--;
//         }
//         else{
//             webPromise = webHandlerFactory.invoke(MethodInfo.method, MethodInfo.serviceUrl, MethodInfo.data);
//             promisesArr.push(webPromise);
//             isAsyncCallInPath=true;
//             i++;
//             // webPromise.then((data,err)=>{
//             //     if(!err){
//             //         console.log(data);
//             //         i++;
//             //         //methodCallIterator--;
//             //     }
//             //     else{
//             //         console.log(err);
//             //     }
//             // });
//         }
        
//     }
// }
// else{
//     console.log("The Command Path is not found");
// }

// const factory=require('./Factory/factory');
// console.log(factory.add("test"));
// console.log(factory.add("car"));
// console.log(new factory['car']()['drive']());
// console.log(new factory['test']()['printHello']());
