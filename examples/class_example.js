// we define a class like this
var MyClass = Class({
  // this gets copied across to the instance as is
  someProperty : 5,

  someFunc : function() {
    // in here 'this' will always reference the instance
    // so we don't need to worry about code being called by event handlers etc.
    console.log(this);
  },

  initialize : function() {
    // this will get called when creating an instance, after all members have been copied
  }
});

// creating an instance is as you would expect
var myInstance = new MyClass();

// we can create mixins too
var Mixin = {
  anotherProperty : 6,
  anotherFunc : function() {
    // some code
  },
  included : function() {
    // this does not get copied to the instance when mixing in
    // but it gets called once the mixin is done and 'this' will be the instance
    // into which the mixin was mixed in to
  }
};

// you can include a mixin on a class and then all instances which are created get the mixin
MyClass.include(Mixin);
var anotherInstance = new MyClass();
anotherInstance.anotherFunc(); // comes from the mixin

// or you can mixin to an individual instance
var mixinInstance = new MyClass();
var noneMixinInstance = new MyClass();
mixinInstance.include(Mixin);
mixinInstance.anotherFunc(); // comes from the mixin
noneMixinInstance.anotherFunc(); // fails as anotherFunc would not exist

// you can also extend a class with a mixin which will add the members to the class
// here the 'included' method will be called immdiately with 'this' referencing the class
MyClass.extend(Mixin);
MyClass.anotherProperty == 6;
MyClass.anotherFunc();
