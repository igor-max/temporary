function Test() {
  const count = 11;
  // const  obj = {};

  // obj.getAge = function() {
  //   return count;
  // };

  // obj.setAge = function() {
  //   count++;
  // }

  // return obj;
  this.getAge = function() {
    console.log(this);
    return count;
  }
}

const t = new Test();

const obj = {
  count: 22
};
obj.getAge = t.getAge;
console.log( obj.getAge() );  // 这不是this，而是 变量count