let Target=require("../Entities/Target");
const configJson=require('../Config/config.json');
//console.log(new Target(configJson.Internal));
const initConfig=()=>{
    Target=configJson;
    return Target;
}
const selectCommandPath=(command)=>{
   let CommandPath=Target.commands.filter(c=>c.path===command);
   return (CommandPath && CommandPath.length>0)?CommandPath[0]:null;
}


module.exports={initConfig,selectCommandPath} 