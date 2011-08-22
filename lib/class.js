var Class = function() {
  var classMixins = [];
  var proto = arguments[0] || {};

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
    var member;
    for (member in mixin) {
      if (mixin.hasOwnProperty(member) && member !== "included") {
        if (isFunc(mixin[member])) {
          this[member] = proxy(mixin[member], this);
        } else {
          this[member] = mixin[member];
        }
      }
    }

    if (isFunc(mixin.included)) {
      mixin.included.call(this);
    }
  }

  function isFunc(func) {
    return typeof func === "function";
  }

  var klass = function() {
    var i;
    var self = {
      initialize : function() {},
      include : include
    };

    include.call(self, proto);
    self.initialize.apply(self, arguments);
    for (i = 0; i < classMixins.length; i++) {
      include.call(self, classMixins[i]);
    }

    return self;
  };
  klass.include = classInclude;
  klass.extend = classExtend;

  return klass;
};
