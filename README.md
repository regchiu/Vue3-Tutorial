# Vue3-Tutorial

According to Evan You, Vue 3 will be faster, smaller, more maintainable, and easier to target native development.

## New features in Vue 3

## 1. [Fragments](https://v3.vuejs.org/guide/migration/fragments.html#overview), which allows you to have components with multiple root nodes.

**- In Vue 2.x**

Multi-root components were not supported and would emit a warning when a user accidentally created one. As a result, many components are wrapped in a single `<div>` in order to fix this error.

```js
<template>
  <div>
    <div>Node 1</div>
    <div>Node 2</div>
  </div>
</template>
```

**- In Vue 3.x**

Components now can have multiple root nodes! However, this does require developers to explicitly define where attributes should be distributed.

```js
<template>
  <div>Node 1</div>
  <div>Node 2</div>
</template>
```

## 2. [Portals](https://v3.vuejs.org/guide/teleport.html#using-with-vue-components), which allows you to render content outside of Vue’s mount element.

A common scenario for this is creating a component that includes a full-screen modal. In most cases, you'd want the modal's logic to live within the component, but the positioning of the modal quickly becomes difficult to solve through CSS, or requires a change in component composition.

~~Portals~~ `Teleport` provides a clean way to allow us to control under which parent in our DOM we want a piece of HTML to be rendered, without having to resort to global state or splitting this into two components.

[Examlpe](https://codepen.io/team/Vue/pen/gOPNvjR)


## 3. The [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html), which is similar to React Hooks, a new syntax that allows you to use functions for organizing your code by feature not operation.

Organizing logics with component's options (`data`, `computed`, `methods`, `watch`) works in most cases. However, when our components get bigger, the list of logical concerns also grows. This can lead to components that are hard to read and understand, especially for people who didn't write them in the first place.

![Hell](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)

It would be much nicer if we could collocate code related to the same logical concern. And this is exactly what the Composition API enables us to do.

**So when to use the composition API?**
- TypeScript support.
- Component is too large and needs to be organized by feature.
- Need to resuse code across other components.
- Or you & your team prefer the alternative syntax.

#### Basics of Composition API

Regular Vue Components Syntax

```js
<template>
  <div>Capacity: {{ capacity }}</div>
</template>
<script>
export default {
  data() {
    return {
      capacity: 3
    }
  }
}
</script>
```

The Composition API `Setup` Method

- Executes before:
  - Components
  - Props
  - Data
  - Methods
  - Computed Properties
  - Lifecycle methods
- Does not have access to *this*.
- Optional first argument is `props`.

```js
export default {
  props: {
    name: String
  },
  setup(props) {
    console.log(props.name)
  }
}
```

- Optional second argument is `context`.
  Properties previously accessed by *this*.

```js
setup(props, context) {
  context.attrs
  context.slots
  context.parent
  context.root
  context.emit
}
```

Reactive References

Creates a `reactive reference`

This wraps our primitive in an object, allowing us to track changes.

*Previously `data()` was wrapping our primitive in an object*.

Note: With the composition API we can declare reactive objects that are not associated with a component.
```js
<template>
  <div>Capacity: {{ capacity }}</div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const capacity = ref(3)
    return { capacity }  
    /**
     * Returns the variables and functions that our template will need.
     * This is more verbose, but it also makes our component more maintainable.
     * 
     * We can control what gets exposed.
     * We can trace where a property is defined.
     * **/
    
  }
}
</script>
```

Lifecycle Hooks

`beforeDestroy()` also is `beforeUnmount()`
`destroyed()` also is `unmounted()`

Options API   | Hook inside `setup` |
--------------|:-----:|
`beforeCreate`  | Not needed* |
`created`       | Not needed* |
`beforeMount`   | `onBeforeMount` |
`mounted`       | `onMounted` |
`beforeUpdate`  | `onBeforeUpdate` |
`updated`       | `onUpdated` |
`beforeUnmount` | `onBeforeUnmount` |
`unmounted`     | `onUnmounted` |
`errorCaptured` | `onErrorCaptured` |
`renderTracked` | `onRenderTracked` |
`renderTriggered`  | `onRenderTriggered` |

We can create callback hooks inside `setup()` by adding "on" to the callback name.

Two New Vue 3 LifeCycle Methods

`onRenderTracked()`

Called when a reactive dependency is first being accessed in the render function, during render. This dependency will now be tracked.
*Helpful to see which dependencies are being tracked, for debugging*.

`onRenderTriggered()`

Called when a new render is triggered, allowing you to inspect what dependency triggered a component to re-render.

[Provide / Inject](https://v3.vuejs.org/guide/component-provide-inject.html)

Usually, when we need to pass data from the parent to child component, we use props. Imagine the structure where you have some deeply nested components and you only need something from the parent component in the deep nested child. In this case, you still need to pass the prop down the whole component chain which might be annoying.

For such cases, we can use the `provide` and `inject` pair. Parent components can serve as dependency provider for all its children, regardless how deep the component hierarchy is. This feature works on two parts: **parent component has a `provide` option to `provide` data and child component has an `inject` option to start using this data**.

![Provide / Inject](https://v3.vuejs.org/images/components_provide.png)

[Reactivity](https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity)

Because `provide/inject` bindings are not reactive by default. We can change this behavior by passing a `ref` **property** or `reactive` **object** to provide.

[Template Refs](https://v3.vuejs.org/guide/composition-api-template-refs.html)

```js
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(root.value) // <div>This is a root element</div>
      })

      return {
        root
      }
    }
  }
</script>
```

Usage with JSX

```js
export default {
  setup() {
    const root = ref(null)

    return () =>
      h('div', {
        ref: root
      })

    // with JSX
    return () => <div ref={root} />
  }
}
```

Usage inside `v-for`

```js
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'

  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])

      // make sure to reset the refs before each update
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
      }
    }
  }
</script>
```

## 4. Using with Suspense

Async components are suspensible by default. This means if it has a `<Suspense>` in the parent chain, it will be treated as an async dependency of that `<Suspense>`. In this case, the loading state will be controlled by the `<Suspense>`, and the component's own loading, error, delay and timeout options will be ignored.

The async component can opt-out of `Suspense` control and let the component always control its own loading state by specifying `suspensible: false` in its options.

You can check the list of available options in the [API Reference](https://v3.vuejs.org/api/global-api.html#defineasynccomponent)

## 5. Multiple `v-model` bindings

We can now create multiple `v-model` bindings on a single component instance.

[Example](https://codepen.io/team/Vue/pen/GRoPPrM)

## 6. Better reactivity

To demonstrate reactivity, we'll use `watches` to listen to one of the state variables and then modify it to see if the watchers are triggered:

**In Vue 2.x**
```js
<template>
  {{ list }} {{ myObj }}
  <button @click="test">Test</button>
</template>
<script>
export default {
  data() {
    return {
      list: [1, 2],
      myObj: { firstName: 'Reg' }
    };
  },
  watch: {
    list: {
      handler: () => {
        console.log("watcher triggered");
      },
      deep: true
    }
  },
  methods: {
    test() {
      list.value[3] = 3
      myObj.value.lastName = 'Chiu'
      delete myObj.value.firstName
    }
  }
}
</script>
```

None of the above three modifications — such as adding a new item to an array based on the index, adding a new item to an object, or deleting an item from the object — is reactive in Vue 2.x. Hence watchers won’t be triggered, or the DOM would be updated. We had to use the `vue.set()` or `vue.delete()` methods.

**In Vue 3.x**
These work directly without any helper functions.

```js
<template>
  {{ list }} {{ myObj }}
  <button @click="test">Test</button>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    let list = ref([1, 2])
    let a = ref(0)
    let myObj = ref({ firstName: 'Reg' })
    function test() {
      list.value[3] = 3
      myObj.value.lastName = 'Chiu'
      delete myObj.value.firstName
    }
    return { list, myObj, test }
  }
}
</script>
```

## 7. Global mounting

When you open `main.js` in the about project, you'll notice something different. We no longer use the Global Vue instance to install plugins and other libraries.

Instead, you can see `createApp` method:

```js
import { createApp } from 'vue'
import App from './App.vue'
const myApp = createApp(App)
myApp.use(/* plugin name */)
myApp.use(/* plugin name */)
myApp.use(/* plugin name */)
myApp.mount('#app')
```

The advantage of this feature is that it protects the Vue application from third party libraries/plugins we use which might override or make changes to the global instance — mostly by using Mixins.

Now with the `createApp` method, we install those plugins on a particular instance and not the global object.

## 8. No filters

In 3.x, filters are removed and no longer supported. Instead, we recommend replacing them with method calls or computed properties.

#### References

[Vue.js](https://v3.vuejs.org/)

[Vue Composition API](https://composition-api.vuejs.org/)

[Vue.js 3 Tutorial by Example: Create Vue 3 App, Components, Router & Composition API](https://www.techiediaries.com/vue-3-tutorial/)

[New features in Vue 3 and how to use them](https://blog.logrocket.com/new-features-in-vue-3-and-how-to-use-them/)

[Exciting new features in Vue 3](https://vueschool.io/articles/vuejs-tutorials/exciting-new-features-in-vue-3/)

