# Vue3-Tutorial

According to Evan You, Vue 3 will be faster, smaller, more maintainable, and easier to target native development.

## New features in Vue 3

## 1. [Fragments](https://v3.vuejs.org/guide/migration/fragments.html#overview), which allows you to have components with multiple root nodes.

**- In 2.x**

Multi-root components were not supported and would emit a warning when a user accidentally created one. As a result, many components are wrapped in a single `<div>` in order to fix this error.

```js
<template>
  <div>
    <div>Node 1</div>
    <div>Node 2</div>
  </div>
</template>
```

**- In 3.x**

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
  It is reactive and can be watched.

```js
import { watch } from 'vue'
export default {
  props: {
    name: String
  },
  setup(props) {
    watch(() => {
      console.log(props.name)
    })
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

```js
<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref, provide, reactive} from 'vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const msg = ref('Hello Vue 3.0 + Vite')
    const reactObj = reactive({
      count: 0
    })
    const showText = ref(false)
    provide('msg', msg)
    provide('reactObj', reactObj)
    return { showText, reactObj}
  }
}
</script>
```

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
