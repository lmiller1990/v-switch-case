const _data = {}

function setValues(data, binding) {
  data[binding.expression] = binding.value
}

export function containsDirective(arr = [], directive) {
  for (let a in arr) {
    if (arr[a].name === directive)
      return arr[a]
  }
  return false
}

const containsCase = 
  (arr = []) => containsDirective(arr, "case")

const containsDefault = 
  (arr = []) => containsDirective(arr, "default")

function toggleDefaultElement(binding, vnode, { show }) {
  const children = vnode.children
  for (let node of children) {
    if (node.data) { 
      if (containsDefault(node.data.directives)) {
        const display = show 
        ? node.elm.getAttribute("data-initial-display")
        : "none"
        node.elm.style.display = display
      }
    }
  }
}

function revealElementWithInitialDisplay(element) {
  const initialDisplay = element.getAttribute("data-initial-display")
  element.style.display = initialDisplay !== "none" 
    ? initialDisplay 
    : "block"
}

function processSwitch(el, binding, vnode, data) {
  let matched = false
  const children = vnode.children
  for (let node of children) {
    if (node.data) {
      const caseDirective = containsCase(node.data.directives, "case")
      if (caseDirective) {
        if (caseDirective.value === data[binding.expression]) {
          revealElementWithInitialDisplay(node.elm)
          toggleDefaultElement(binding, vnode, { show: false })
          matched = true
        } else {
          node.elm.style.display = "none"
        }
      }
    }
  }

  if (!matched) {
    toggleDefaultElement(binding, vnode, { show: true })
  }
}

function saveInitialDsplayToDataAttr(elements) {
  for (let child of elements) {
    child.setAttribute("data-initial-display", child.style.display)
  }
}

const vSwitch = {
  bind(el, binding) {
    setValues(_data, binding)
  },

  inserted(el, binding, vnode) {
    saveInitialDsplayToDataAttr(el.children)
    processSwitch(el, binding, vnode, _data)
  },

  update(el, binding) {
    setValues(_data, binding)
  },

  componentUpdated(el, binding, vnode) {
    processSwitch(el, binding, vnode, _data)
  }
}

const vCase = () => {}

const vDefault = () => {}

export { vSwitch, vCase, vDefault }

export default {
  install(Vue, options) {
    Vue.directive('switch', vSwitch)
    Vue.directive('case', vCase)
    Vue.directive('default', vDefault)
  }
}

