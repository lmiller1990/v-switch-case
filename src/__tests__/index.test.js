import { mount } from "@vue/test-utils"
import { vSwitch, vCase, vDefault } from "../index"
import { getVDefaultNode } from "../index"

const context = (description, cb) => describe(description, cb)

const createApp = ({validateUrl}) => {
  return {
    name: "app",
    directives: {
      'switch': vSwitch,
      'case': vCase,
      'default': vDefault
    },
    data() {
      return { validateUrl }
    },
    template: `
    <div v-switch="validateUrl" class="validateUrl">
      <p 
        id="validating"
        v-case="'validating'"
      >
        Checking Url...
      </p>
      <p 
        id="validated"
        v-case="'validated'"
      >
        Valid
      </p>
      <p 
        id="default"
        v-default="''"
      >
        ????
      </p>
    </div>
  `
  }
}

describe('getVDefaultNode', () => {
  context('is present', () => {
    it('returns node with v-default', () => {
      const app = createApp({ validateUrl: "validating" })
      const wrapper =  mount(app)

      expect(wrapper.vm.$el.querySelector("#default").style.display).toBe("none")
    })
  })
})
