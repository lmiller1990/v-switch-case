import { mount } from "@vue/test-utils"
import { vSwitch, vCase, vDefault } from "../index"
import { containsDirective } from "../index"

const context = (description, cb) => describe(description, cb)

const createApp = ({validateUrl, defaultDisplay = "block"}) => {
  return {
    name: "app",
    directives: {
      'switch': vSwitch,
      'case': vCase,
      'default': vDefault
    },
    data() {
      return { 
        validateUrl,
        defaultDisplay: `display: ${defaultDisplay}`
      }
    },
    template: `
    <div v-switch="validateUrl" class="validateUrl">
      <p 
        id="validating"
        v-case="'validating'"
        :style="defaultDisplay"
      >
        Checking Url...
      </p>
      <p 
        id="validated"
        v-case="'validated'"
        :style="defaultDisplay"
      >
        Valid
      </p>
      <p 
        id="default"
        v-default="''"
        :style="defaultDisplay"
      >
        ????
      </p>
    </div>
  `
  }
}

describe('v-switch-case', () => {
  context('matches v-case successfully', () => {
    it('hides v-default', () => {
      const app = createApp({ validateUrl: "validating" })
      const wrapper =  mount(app)

      expect(wrapper.vm.$el.querySelector("#default").style.display).toBe("none")
      expect(wrapper.vm.$el.querySelector("#validated").style.display).toBe("none")
      expect(wrapper.vm.$el.querySelector("#validating").style.display).toBe("block")
    })
  })

  context("changing between cases", () => {
    it('', () => {
      const app = createApp({ 
        validateUrl: "validating",
        defaultDisplay: "inline-block"
      })
      const wrapper = mount(app)

      wrapper.setData({ validateUrl: "validated" })

      expect(wrapper.vm.$el.querySelector("#validating").style.display).toBe("none")
      expect(wrapper.vm.$el.querySelector("#validated").style.display).toBe("inline-block")
    })
  })

  context('doesnt not match v-case successfully', () => {
    it('shows v-default', () => {
      const app = createApp({ validateUrl: null })
      const wrapper =  mount(app)

      expect(wrapper.vm.$el.querySelector("#default").style.display).toBe("block")
      expect(wrapper.vm.$el.querySelector("#validated").style.display).toBe("none")
      expect(wrapper.vm.$el.querySelector("#validating").style.display).toBe("none")
    })
  })
})

describe("containsDirective", () => {
  const directives = [{ name: "case" }] 

  context("does not contain the directive", () => {
    it("returns false", () => {
      const actual = containsDirective(directives, "default")

      expect(actual).toBe(false)
    })
  })

  context("does contain the directive", () => {
    it("returns the directive", () => {
      const actual = containsDirective(directives, "case")

      expect(actual).toEqual(directives[0])
    })
  })
})
