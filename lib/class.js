var Class = function() {
  var classMixins = [];
  var proto = arguments[0] || {};

  var klass = function() {
    var self = {
      initialize : function() {},
      include : include
    };

    include.call(self, proto);
    for (var i = 0; i < classMixins.length; i++) {
      include.call(self, classMixins[i]);
    }
    self.initialize.apply(self, arguments);

    return self;
  };
  klass.include = classInclude;
  klass.extend = classExtend;

  return klass;

  function proxy(func, context) {
    return function() {
      return func.apply(context, arguments);
    };
  }

  function classInclude(mixin) {
    classMixins.push(mixin);
  }

  function classExtend(mixin) {
    include.call(this, mixin);
  }

  function include(mixin) {
    for (var member in mixin) {
      if (member === "included") {
        continue;
      }
      if (isFunc(mixin[member])) {
        this[member] = proxy(mixin[member], this);
      } else {
        this[member] = mixin[member];
      }
    }

    if (isFunc(mixin.included)) {
      mixin.included.call(this);
    }
  }

  function isFunc(func) {
    return typeof func === "function";
  }
};
