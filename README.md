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

Or using a script tag:

```html
<script src="https://unpkg.com/v-switch-case@1.0.2/dist/v-switch.min.js"></script>
```

### Use

Node.js env (using webpack for example):

```html
<template>
  <div v-switch="size">
    <h1 v-case="'large'">Large</h1>
    <h2 v-case="'medium'">Medium</h2>
    <h3 v-case="'small'">Small</h3>
  </div>
</template>

<script>
import Vue from 'vue'
import VSwitch from 'v-switch-case'

Vue.use(VSwitch)

export default {
  data() {
    return {
      size: 'medium'
    }
  }
}
</script>
```

From a CDN:

```html
<script src="https://unpkg.com/v-switch-case@1.0.2/dist/v-switch.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.21/vue.js"></script>

<script>
Vue.use(VSwitch)
</script>
```

### Links

On NPM: https://www.npmjs.com/package/v-switch-case
