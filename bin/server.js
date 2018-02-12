global.__CLIENT__ = false;
global.__SERVER__ = true;

require("babel-register");
require("../src/server/server");

const proto = Object.getPrototypeOf(require);
!proto.hasOwnProperty("ensure") &&
  Object.defineProperties(proto, {
    ensure: {
      value: function ensure(modules, callback) {
        callback(this);
      },
      writable: false,
    },
    include: {
      value: function include() {},
      writable: false,
    },
  });
