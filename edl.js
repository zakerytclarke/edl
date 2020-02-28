//var prgm=["*","<-",7,"<-","+","<-",2,"<-",3];
//var prgm=["id","<-",7];
var prgm=["fact","<-",5];



var definitions=[
  //Operators
  {
    value:["+","<-","x","<-","y"],
    substitution:function(args){
      return [args[2]+args[4]];
    }
  },
  {
    value:["*","<-","x","<-","y"],
    substitution:function(args){
      return [args[2]*args[4]];
    }
  },
  {
    value:["-","<-","x","<-","y"],
    substitution:function(args){
      return [args[2]-args[4]];
    }
  },
  {
    value:["/","<-","x","<-","y"],
    substitution:function(args){
      return [args[2]/args[4]];
    }
  },
  {
    value:["^","<-","x","<-","y"],
    substitution:function(args){
      return [Math.pow(args[2],args[4])];
    }
  },
  {
    value:["&&","<-","x","<-","y"],
    substitution:function(args){
      return [args[2]&&args[4]];
    }
  },
  {
    value:["||","<-","x","<-","y"],
    substitution:function(args){
      return [args[2]||args[4]];
    }
  },
  //Functions
  {
    value:["id","<-","x"],
    substitution:["x"]
  },
  {
    value:["fact","<-",1],
    substitution:[1]
  },
  {
    value:["fact","<-","n"],
    substitution:["*","<-","n","<-","fact","<-","-","<-","n","<-",1]
  },


]

var operators=definitions.filter(function(x){
  return true;
  //return (x.substitution.constructor===Function);
}).map(function(x){
  return x.value[0];
});
operators.push("<-");
operators.push("->");

definitions=definitions.sort(function(x,y){//Sort so shortest first
  return x.value.length-y.value.length;
});


evaluate(prgm);


function evaluate(prgm){
  var ptr=0;
  console.log(prgm);
  while(ptr<prgm.length){//Starting from left search all parts of prgm
    for(var i=0;i<definitions.length;i++){
      if(compare(definitions[i].value,prgm,ptr)){
        if(definitions[i].substitution.constructor===Function){//Function
          var args=[];
          for(var j=0;j<definitions[i].value.length;j++){
            args.push(prgm[ptr]);//Add args
            prgm.splice(ptr,1);
          }
          var result=definitions[i].substitution(args);
          var tempArr=prgm.slice(ptr);
          var beginArr=prgm.slice(0,ptr);

          prgm=beginArr.concat(result.concat(tempArr));
        }else{
          var args=[];
          for(var j=0;j<definitions[i].value.length;j++){
            args.push(prgm[ptr]);//Add args
            prgm.splice(ptr,1);
          }


          var tempDef={};//Temporary Definitions
          for(var j=0;j<definitions[i].value.length;j++){
            if(isFreeVariable(definitions[i].value[j])&&!operators.includes(definitions[i].value[j])){
              tempDef[definitions[i].value[j]]=args[j];
            }
          }

          var result=definitions[i].substitution;

          for(var i=0;i<result.length;i++){
            if(tempDef[result[i]]){
              result[i]=tempDef[result[i]]
            }
          }

          var tempArr=prgm.slice(ptr);
          var beginArr=prgm.slice(0,ptr);

          prgm=beginArr.concat(result.concat(tempArr));

        }
        console.log(prgm);
        //Set pointer back to start
        ptr=-1;
      }
    }
    ptr++;
  }


}

/**
 *
 * a1- smaller array for exact match
 * a2- large array to find subset of
 */
function compare(a1,a2,offset){
  for(var i=0;i<a1.length;i++){
    var temp=a2[i+offset];
    if(operators.includes(temp)||operators.includes(a1[i])){//Operators must be strictly equal
      if(temp!=a1[i]){
        return false;
      }
    }
    if(!isFreeVariable(a1[i])){//Free Variables can be any value
      if(temp!=a1[i]){
        return false;
      }
    }
  }
  return true;
}

/**
 *
 * a1- array of values to substitute as
 * a2- array to substitute into
 */
function substitute(a1,a2){
  var out=[];
  for(var i=0;i<a1.length;i++){

  }
}



function isFreeVariable(str){
  if(str.constructor===String){

    for(var i=0;i<definitions.length;i++){
      if(definitions[i].value[0]==str){
        return false;
      }
    }
    return true;//Variable not already accounted for
  }

  return false;
}
