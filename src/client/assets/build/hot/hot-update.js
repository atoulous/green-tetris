webpackHotUpdate(0,{

/***/ 399:
/*!*******************************************************!*\
  !*** ./src/client/middleware/storeStateMiddleWare.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar storeStateMiddleWare = exports.storeStateMiddleWare = function storeStateMiddleWare(_ref) {\n  var getState = _ref.getState;\n  return function (next) {\n    return function (action) {\n      var returnValue = next(action);\n      window.top.state = getState();\n      return returnValue;\n    };\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzk5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9jbGllbnQvbWlkZGxld2FyZS9zdG9yZVN0YXRlTWlkZGxlV2FyZS5qcz9jYWJiIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBzdG9yZVN0YXRlTWlkZGxlV2FyZSA9ICh7IGdldFN0YXRlIH0pID0+IChuZXh0KSA9PiAoYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHJldHVyblZhbHVlID0gbmV4dChhY3Rpb24pXG4gIHdpbmRvdy50b3Auc3RhdGUgPSBnZXRTdGF0ZSgpXG4gIHJldHVybiByZXR1cm5WYWx1ZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jbGllbnQvbWlkZGxld2FyZS9zdG9yZVN0YXRlTWlkZGxlV2FyZS5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///399\n");

/***/ })

})