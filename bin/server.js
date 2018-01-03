global.__CLIENT__ = false;
global.__SERVER__ = true;

require("babel-register");
require("../src/server");
