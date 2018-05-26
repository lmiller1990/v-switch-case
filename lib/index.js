"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsDirective = containsDirective;
var _data = {};

function setValues(data, binding) {
  data[binding.expression] = binding.value;
}

function containsDirective() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var directive = arguments[1];

  for (var a in arr) {
    if (arr[a].name === directive) return arr[a];
  }
  return false;
}

var containsCase = function containsCase() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return containsDirective(arr, "case");
};

var containsDefault = function containsDefault() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return containsDirective(arr, "default");
};

function toggleDefaultElement(binding, vnode, _ref) {
  var show = _ref.show;

  var children = vnode.children;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      if (node.data) {
        if (containsDefault(node.data.directives)) {
          var display = show ? node.elm.getAttribute("data-initial-display") : "none";
          node.elm.style.display = display;
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

function revealElementWithInitialDisplay(element) {
  var initialDisplay = element.getAttribute("data-initial-display");
  element.style.display = initialDisplay !== "none" ? initialDisplay : "block";
}

function processSwitch(el, binding, vnode, data) {
  var matched = false;
  var children = vnode.children;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var node = _step2.value;

      if (node.data) {
        var caseDirective = containsCase(node.data.directives, "case");
        if (caseDirective) {
          if (caseDirective.value === data[binding.expression]) {
            revealElementWithInitialDisplay(node.elm);
            toggleDefaultElement(binding, vnode, { show: false });
            matched = true;
          } else {
            node.elm.style.display = "none";
          }
        }
      }
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

  if (!matched) {
    toggleDefaultElement(binding, vnode, { show: true });
  }
}

function saveInitialDsplayToDataAttr(elements) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
}

var vSwitch = {
  bind: function bind(el, binding) {
    setValues(_data, binding);
  },
  inserted: function inserted(el, binding, vnode) {
    saveInitialDsplayToDataAttr(el.children);
    processSwitch(el, binding, vnode, _data);
  },
  update: function update(el, binding) {
    setValues(_data, binding);
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    processSwitch(el, binding, vnode, _data);
  }
};

var vCase = function vCase() {};

var vDefault = function vDefault() {};

exports.vSwitch = vSwitch;
exports.vCase = vCase;
exports.vDefault = vDefault;