var Class = function(proto) {
  var mixins = [];
  var klass = function() {
    var self = {
      initialize : function() {}
    };

    include.call(self, proto);
    for (var i = 0; i < mixins.length; i++) {
      include.call(self, mixins[i]);
    }
    self.initialize.apply(self, arguments);

    return self;
  };
  klass.include = function(mixin) {
    mixins.push(mixin);
  }
  return klass;

  function proxy(func, context) {
    return function() {
      return func.apply(context, arguments);
    };
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
