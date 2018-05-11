"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _data = {
  switchValue: null
};

function setValues(data, binding) {
  data.switchValue = binding.value;
}

function containsCase() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var cb = arguments[1];

  for (var a in arr) {
    if (arr[a].name === "case") return arr[a];
  }

  return false;
}

function processSwitch(el, binding, vnode, data) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = vnode.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      if (node.data) {
        var caseDirective = containsCase(node.data.directives);
        if (caseDirective) {
          if (caseDirective.value === data.switchValue) {
            var initialDisplay = node.elm.getAttribute("data-initial-display");
            node.elm.style.display = initialDisplay !== "none" ? initialDisplay : "block";
          } else {
            node.elm.style.display = "none";
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

var vSwitch = {
  bind: function bind(el, binding) {
    setValues(_data, binding);
  },
  inserted: function inserted(el, binding, vnode) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = el.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var child = _step2.value;

        child.setAttribute("data-initial-display", child.style.display);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    processSwitch(el, binding, vnode, _data);
  },
  update: function update(el, binding) {
    setValues(_data, binding);
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = el.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var child = _step3.value;

        child.setAttribute("data-initial-display", child.style.display);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    processSwitch(el, binding, vnode, _data);
  }
};

var vCase = function vCase() {};

exports.vSwitch = vSwitch;
exports.vCase = vCase;