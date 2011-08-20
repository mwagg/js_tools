var Class = function(proto) {
  var classMixins = [];

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
    for (var i in mixin) {
      if (typeof mixin[i] === "function") {
        this[i] = proxy(mixin[i], this);
      } else {
        this[i] = mixin[i];
      }
    }
  }
};
