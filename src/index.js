const _data = {
  switchValue: null
}

function setValues(data, binding) {
  data[binding.expression] = binding.value
}

function containsCase(arr = [], cb) {
  for (let a in arr) {
    if (arr[a].name === "case")
      return arr[a]
  }

  return false
}

function hideVDefaultNode(binding, vnode, data) {
  const children = vnode.children
  for (let node of children) {
    if (node.data) { 
      if (containsDefault(node.data.directives)) {
        node.elm.style.display = "none"
      }
    }
  }
}

function containsDefault(arr = [], cb) {
  for (let a in arr) {
    if (arr[a].name === "default")
      return arr[a]
  }

  return false
}

export function getVDefaultNode(vnodes) {
}

function processSwitch(el, binding, vnode, data) {
  const lastNode = vnode.children[vnode.children.length-1]
  let matched = false
  const children = vnode.children
  for (let node of children) {
    if (node.data) {
      const caseDirective = containsCase(node.data.directives)
      if (caseDirective) {
        if (caseDirective.value === data[binding.expression]) {
          matched = true
          const initialDisplay = node.elm.getAttribute("data-initial-display")
          node.elm.style.display = initialDisplay !== "none" 
            ? initialDisplay 
            : "block"
          hideVDefaultNode(binding, vnode, data)
        } else {
          node.elm.style.display = "none"
        }
      }
    }
  }
  if (!matched) {
    // no match
  }
}

const vSwitch = {
  bind(el, binding) {
    setValues(_data, binding)
  },

  inserted(el, binding, vnode) {
    for (let child of el.children) {
      child.setAttribute("data-initial-display", child.style.display)
    }
    processSwitch(el, binding, vnode, _data)
  },

  update(el, binding) {
    setValues(_data, binding)
  },

  componentUpdated(el, binding, vnode) {
    for (let child of el.children) {
      child.setAttribute("data-initial-display", child.style.display)
    }
    processSwitch(el, binding, vnode, _data)
  }
}

const vCase = () => {}

const vDefault = () => {}

export { vSwitch, vCase, vDefault }

