const { vSwitch, vCase, vDefault } = require('./src/index.js')

module.exports = {
  install(Vue, options) {
    Vue.directive('switch', vSwitch)
    Vue.directive('case', vCase)
    Vue.directive('default', vDefault)
  }
}
