## `v-switch-case`

A simple `v-switch`, `v-case` and `v-default` directive set for Vue.

Live Demo: https://lmiller1990.github.io/v-switch-case/


```html
<div v-switch="size">
  <h1 v-case="'large'">Large</h1>
  <h2 v-case="'small'">Medium</h2>
  <h3 v-default>Default</h3>
</div>
```

### Installation

npm:
```bash
npm install v-switch-case
```

yarn:
```bash
yarn add v-switch-case
```

### Use

Node.js env (such a `.vue` components):

```html
<template>
  <div v-switch="size">
    <h1 v-case="'large'">Large</h1>
    <h2 v-case="'medium'">Medium</h2>
    <h3 v-case="'small'">Small</h3>
  </div>
</template>

<script>
import { vSwitch, vCase, vDefault } from 'v-switch-case'

export default {
  directives: {
    'switch': vSwitch,
    'case': vCase,
    'default': vDefault
  },

  data() {
    return {
      size: 'medium'
    }
  }
}
</script>
```

### Todo

- [] allow installatiion with `Vue.directive('v-switch')`
- [] Browser env/cdn link
- [] Add tests
- [] Add `v-default` directive to match JavaScript `switch` API


### Links

On NPM: https://www.npmjs.com/package/v-switch-case
