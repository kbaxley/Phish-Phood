function replaceSpace(input){
    const output = input.replace(/ /g, "_");
    return output;
  }


var result =  replaceSpace("Largemouth Bass");
console.log(result);

result =  replaceSpace("Bluegill");
console.log(result);
result =  replaceSpace("Black Crappie");
console.log(result);
result =  replaceSpace("Channel Catfish");
console.log(result);
result =  replaceSpace("Redear Sunfish");
console.log(result);