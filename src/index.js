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

function processSwitch(el, binding, vnode, data) {
  const lastNode = vnode.children[vnode.children.length-1]
  let matched = false
  for (let node of vnode.children) {
    if (node.data) {
      const caseDirective = containsCase(node.data.directives)
      if (caseDirective) {
        if (caseDirective.value === data[binding.expression]) {
          matched = true
          const initialDisplay = node.elm.getAttribute("data-initial-display")
          node.elm.style.display = initialDisplay !== "none" 
            ? initialDisplay 
            : "block"
        } else {
          node.elm.style.display = "none"
        }
      }
    }
  }
  if (!matched) {
    console.log('no match')
    // use v-default, hide all others
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

export { vSwitch, vCase }

