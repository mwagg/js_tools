var Class = function(proto) {
  return function() {
    for (var i in proto) {
      if (typeof proto[i] === "function") {
        this[i] = proxy(proto[i], this);
      } else {
        this[i] = proto[i];
      }
    }

    if (typeof this.initialize === "function") {
      this.initialize.apply(this, arguments);
    }
  };

  function proxy(func, context) {
    return function() {
      return func.apply(context, arguments);
    };
  }
};
