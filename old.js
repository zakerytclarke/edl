var fs = require('fs');


var mappings=[["temp","port1"],["hot","port2"],["cold","port3"],["height","port4"]];
var triggers=[["dispenseHot"],["dispenseCold"],["temp","desiredTemp",">"],["temp","desiredTemp","<"],["height","on","="]];
var events=[["hot","on","<-","wait","400","<-","hot","off","<-"],["cold","on","<-","wait","400","<-","cold","off","<-"],["dispenseCold","on","<-"],["dispenseHot","on","<-"],[["dispenseCold","off","<-"],["dispenseHot","off","<-"]]];
var state={
  desiredTemp:85,
  dispenseHot:false,
  dispenseCold:false,
  temp:null,
  height:null,
  hot:null,
  cold:null,
  end:false,
  port1:45,
  //port2:true
};

var commands=[];


  //parse();



var symbols=["->","<-","<->","\n","\t","=","!=","&",">","<","+","-","*","/","(",")",":"];
symbols.sort(function(a,b){
  if(a.length>b.length){
    return -1;
  }else{
    return 1;
  }
});


run();

function run(){
  //while(state.end!=true){


    //Map Values
    for(var i=0;i<mappings.length;i++){
      if(state[mappings[i][1]]!=null){
        state[mappings[i][0]]=state[mappings[i][1]];
      }
    }

    //Evaluate Events
    for(var i=0;i<triggers.length;i++){
      if(evaluate(triggers[i])){
        evaluate(events[i]);
      }
    }
    console.log(state);

  //}

}



function parse(){
  var code=fs.readFileSync("hottub.edl","utf8");


  var tokens=[];
  var tokens=["temp","<->","port1","\n","desiredTemp","<-","85","\n","hot","<->","port2","\n","cold","<->","port3","\n","height","<->","port4","\n","dispenseHot",":","\n","hot","<-","on","\n","wait","<-","400","\n","hot","<-","off","\n","dispenseCold",":","\n","cold","<-","on","\n","wait","<-","400","\n","cold","<-","off","\n","temp",">","desiredTemp",":","\n","dispenseCold","<-","on","\n","temp","<","desiredTemp",":","\n","dispenseHot","<-","on","\n","height","=","on",":","\n","dispenseHot","<-","off","\n","dispenseCold","<-","off"];



/*
  var buffer="";

  for(var i=0;i<code.length;i++){
    var bool=null;
    for(var j=0;j<symbols.length;j++){
      var temp=code.substr(i,symbols[j].length);
      if(temp=symbols[j]){
        bool=symbols[j];
      }
      if(bool){
        tokens.push(buffer);
        tokens.push(bool);
      }else{
        buffer+=code.substr(i,1);
        console.log(buffer);
      }
    }

  }

*/


  console.log(tokens);

}




function evaluate(expr){
  var stack=[];
  expr=expr.reverse();

  while(expr.length>0){
    var temp=expr.pop();

    if(isState(temp)){
      stack.push(state[temp]);
    }else{
      if(isSymbol(temp)){

        switch(temp) {
          case "->":
            var arg1=stack.pop();
            var arg2=stack.pop();
            states[arg1]=arg2;
          break;
          case "<-":
            var arg1=stack.pop();
            var arg2=stack.pop();
            states[arg2]=arg1;
          break;
          case "<->":
          break;
          case "=":
            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1==arg2);
          break;
          case "!=":
            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1!=arg2);
          break;
          case "!":
            var arg=stack.pop();
            stack.push(!arg);
          break;
          case "<":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1<arg2);
          break;
          case ">":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1<arg2);
          break;
          case "<=":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1<=arg2);
          break;
          case ">=":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1>=arg2);
          break;
          case "+":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1+arg2);
          break;
          case "-":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1-arg2);
          break;
          case "*":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1*arg2);
          break;
          case "/":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1/arg2);
          break;
          case "&":

            var arg1=stack.pop();
            var arg2=stack.pop();
            stack.push(arg1&&arg2);
          break;
          default:

        }
      }else{
        stack.push(temp);
      }
    }

  }
  return stack[0];


  function isSymbol(str){
    for(var i=0;i<symbols.length;i++){
      if(symbols[i]==str){
          return true;
      }
    }
    return false;
  }
  function isState(str){
    if(state[str]!=null){
      return true;
    }else{
      return false;
    }
  }
}
