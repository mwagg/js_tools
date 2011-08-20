describe("Class", function() {
  it("should be possible to create instances of a class", function() {
    var MyClass = Class();
    var instance = new MyClass();

    expect(instance).not.toBeNull();
  });

  describe("when a prototype is passed", function() {
    var MyClass;
    var instance;
    var thePrototype = {
      someProperty : 5,
      someFunc : function() { return "You got the func!"; },
      funcWhichReturnsThis : function() {
        return this;
      }
    };

    beforeEach(function() {
      MyClass = Class(thePrototype);
    });
    
    it("should add the properties", function() {
      var instance = new MyClass();
      expect(instance.someProperty).toBe(thePrototype.someProperty);
    });

    it("should add the methods", function() {
      var instance = new MyClass();
      expect(instance.someFunc()).toBe(thePrototype.someFunc());
    });

    describe("when a constructor is included in the prototype", function() {
      beforeEach(function() {
        thePrototype.initialize = jasmine.createSpy("the constructor");
      });

      it("should call the constructor", function() {
        new MyClass();

        expect(thePrototype.initialize).toHaveBeenCalled();
      });

      it("should pass the arguments to the constructor", function() {
        var x = 1, y = 2;
        new MyClass(x, y);

        expect(thePrototype.initialize).toHaveBeenCalledWith(x, y);
      });
    });

    describe("when invoking a method on an instance", function() {
      it("should make sure this always references the instance", function() {
        var instance = new MyClass();
        var someThingElse = {};
        var invocationThis = instance.funcWhichReturnsThis.call(someThingElse);

        expect(invocationThis).toBe(instance);
      })
    });
  });
});
