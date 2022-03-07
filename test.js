Function.prototype.myBind = function (context) {
  console.log(this, "this");
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  var that = this;
  var args = [...arguments].slice(1);
  return function F() {
    console.log(this, "F");
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    return that.apply(context, args.concat(...arguments));
  };
};

let obj = {
  name: "foo",
};

name = "bar";

function Foo() {
  console.log(this.name, "name");
}

Foo();

Foo.myBind(obj)();

let str =
  "http://audiotest.cos.tx.xmcdn.com/storages/d22c-audiotest/B8/37/GKwaLoMF4S3AAAAPTgAAYQx_.xlsx";
console.log(str.split(".").pop());

function foo() {
  return function () {
    console.log(this);
  };
}

foo()();

var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();

var p = (function (a) {
  this.a = a;
  return function (b) {
    return this.a + b;
  };
})(
  (function (a, b) {
    return a;
  })(1, 2)
);
console.log(p(4));
console.log(a);

let Modal = (function () {
  let instance;
  return function (name) {
    if (instance) {
      return instance;
    }
    this.name = name;
    console.log(this);
    return (instance = this);
  };
})();

Modal.prototype.getName = function () {
  return this.name;
};

let question = new Modal("问题框");
let answer = new Modal("回答框");

console.log(question === answer); // true
console.log(question.getName()); // '问题框'
console.log(answer.getName()); // '问题框'

function foo(a) {
  console.log(a);
  var a = 2;
}

foo(1);

var foo = 1; // 打印函数
console.log(foo);

function foo() {
  console.log("foo");
}

function foo() {
  console.log(this);
}

foo(); // MemberExpression 是 foo

function foo() {
  return function () {
    console.log(this);
  };
}

foo()(); // MemberExpression 是 foo()

var foo = {
  bar: function () {
    return this;
  },
};

console.log(foo.bar()); // MemberExpression 是 foo.bar

var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  },
};

//示例1
console.log(foo.bar());
//示例2
console.log(foo.bar());
//示例3
console.log((foo.bar = foo.bar)());
//示例4
console.log((false || foo.bar)());
//示例5
console.log((foo.bar, foo.bar)());

Function.prototype.call1 = function (context) {
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.apply1 = function (context) {
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.bind1 = function (context) {
  let that = this;
  let args = Array.prototype.slice.call(arguments, 1);
  const fN = function () {};

  function fn() {
    let bindArgs = Array.prototype.slice.call(arguments);
    return that.apply(
      this instanceof fn ? this : context,
      args.concat(bindArgs)
    );
  }
  fN.prototype = this.prototype;
  fn.prototype = new fN();
  return fn;
};

let obj = {
  name: "hch",
};
function bar(a, b) {
  console.log(this.name, a, b);
}

// bar.call1(obj, 'foo', 'bar')

bar.apply1(obj, "foo", "bar");

function objectFactory() {
  let obj = new Object();
  const Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" ? ret : obj;
}

var data = [];

for (var i = 0; i < 3; i++) {
  (data[i] = function () {
    console.log(arguments.callee.i);
  }).i = i;
}

data[0]();
data[1]();
data[2]();

const arr = ["a", "b", "c", "d", "e", "f", "a", "b", "c", "a", "b", "a"];
const k = 3;

const temp = [];

for (let i = 0; i < arr.length; i++) {}

function createPerson(name) {
  var o = new Object();
  o.name = name;
  o.getName = function () {
    console.log(this.name);
  };

  return o;
}

var person1 = createPerson("kevin");

function Parent(name) {
  this.name = name;
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  let proto = object(parent.prototype);
  proto.constructor = child;
  child.prototype = proto;
}

prototype(Child, Parent);

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(new Date(), i);
  }, 1000);
}

console.log(new Date(), i);

let unary = (fn) => (val) => fn(val);
let parse = unary(parseInt);

console.log(["1.1", "2", "0.3"].map(parse));

function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => {
      // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, 500);
  };
}

function Person(name) {
  this.name = name;
  this.getName = function() {
    console.log(this.name)
  }
}

const p1 = new Person();

console.log(p1.constructor === Person)
console.log(Person.prototype.constructor === Person)

function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}


function object(o) {
  function F() {}
  F.prototype = o;
  console.log( new F(), 'F')
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  console.log(prototype, 'p')
  prototype.constructor = child;
  child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);

var child1 = new Child('kevin', '18');

console.log(child1);


a = 10
const obj = {
  a: 13,
  b: () => {
    console.log(this.a, this)
  },
  c: function () {
    console.log(this.a, this)
  },
  d: function () {
    return () => {
      console.log(this.a, this)
    }
  },
  e: function () {
    return this.b
  }
}

console.log(this, a, 'global')
obj.b()
obj.c()
obj.d()();
obj.e()();


global.x = 0
let x = 1

class T {
  xx = 2;
  x = 2;
  constructor(){
    this.x = 3;
  }
  run = () => {
    console.log(this.x) // run T
  }
  func(){
    console.log(this.x) // func T
  }
}

T.prototype.run = () => {
  console.log(this.x) // outer run
}

T.prototype.func = () => {
  console.log(this.x) // outer func
}

const t = new T();
t.run();
t.func();
