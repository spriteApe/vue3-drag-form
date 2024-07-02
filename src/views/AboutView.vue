<template>
  <div class="flex">
    <div class="left">
      <VueDraggable
        class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        v-model="componentList"
        :animation="150"
        ghostClass="ghost"
        :sort="false"
        :group="{ name: 'people', pull: 'clone', put: false }"
      >
        <div
          v-for="item in componentList"
          :key="item.component"
          class="cursor-move h-30 bg-gray-500/5 rounded p-3"
          @click="addComponent(item)"
        >
          {{ item.title }}
        </div>
      </VueDraggable>
    </div>
    <div class="right flex-1">
      <VueDraggable
        class="flex flex-col gap-2 p-4 h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        v-model="list2"
        :animation="150"
        group="people"
        ghostClass="ghost"
        @update="onUpdate"
        @add="onAdd"
        @remove="remove"
      >
        <component
          :is="item.component"
          v-for="item in list2"
          :key="item.id"
          :style="item.width ? { width: item.width + 'px' } : {}"
          v-bind="item.componentProps"
          @click="setActive(item)"
        >
          {{ item.slot }}
        </component>
      </VueDraggable>
    </div>
    <div class="config w-60 p-4">
      <!-- <h1>表单</h1> -->
      <h1>组件</h1>
      <div v-for="item in configList" :key="item.id">
        {{ item.title }}:
        <component :is="item.component" v-bind="item.componentProps" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { v4 as uuidv4 } from 'uuid'
function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
  list2.value.forEach((item) => {
    if (!item.id) {
      item.id = uuidv4() // Generate a unique ID
    }
  })
}
function remove() {
  console.log('remove')
}
type IItem = {
  title: string
  component: string
  width?: number
  slot?: string
  componentProps?: Record<string, any>
  on?: Record<string, (...any: any[]) => void>
}
type IItemContent = IItem & {
  id: string
}
const configList = ref<IItemContent[]>([])
const setActive = (item: IItem) => {
  const itemRef = ref(item)
  const widthRef = toRef(itemRef.value.width!)
  const res: IItemContent[] = []
  res.push({
    id: uuidv4(),
    component: 'a-slider',
    title: '宽度',
    componentProps: {
      value: widthRef,
      min: 100,
      max: 500
    },
    on: {
      'update:value': (val: number) => {
        itemRef.value.width = val
        widthRef.value = val
      }
    }
  })
  if (item.slot) {
    const slotRef = toRef(itemRef.value.slot)
    res.push({
      id: uuidv4(),
      component: 'a-input',
      title: '按钮文本',
      componentProps: {
        placeholder: '请输入',
        value: slotRef
      },
      on: {
        'update:value': (val: string) => {
          itemRef.value.slot = val
          slotRef.value = val
        }
      }
    })
  }
  if (!item.componentProps) return
  const { placeholder, showCount } = item.componentProps
  if (placeholder) {
    const placeholderRef = toRef(itemRef.value.componentProps!.placeholder)
    res.push({
      id: uuidv4(),
      component: 'a-input',
      title: 'placeholder',
      componentProps: {
        placeholder: '请输入',
        value: placeholderRef
      },
      on: {
        'update:value': (val: string) => {
          itemRef.value.componentProps!.placeholder = val
          placeholderRef.value = val
        }
      }
    })
  }
  if (showCount) {
    const showCountRef = toRef(itemRef.value.componentProps!.showCount)
    res.push({
      id: uuidv4(),
      component: 'a-checkbox',
      title: '显示数字',
      componentProps: {
        checked: showCountRef
      },
      on: {
        'update:checked': (val: boolean) => {
          itemRef.value.componentProps!.showCount = val
          showCountRef.value = val
        }
      }
    })
  }

  configList.value = handleOn(res)
  console.log(configList.value)
}
const handleOn = (list: IItemContent[]): IItemContent[] => {
  return list.map((item) => {
    const { componentProps = {}, on = {} } = item
    const listens = Object.keys(on).reduce(
      (pre, key) => {
        const value = on[key]
        const props = `on${key.slice(0, 1).toUpperCase()}${key.slice(1)}`
        pre[props] = value
        return pre
      },
      {} as Record<string, any>
    )
    return {
      ...item,
      componentProps: {
        ...componentProps,
        ...listens
      }
    }
  })
}
const componentList: IItem[] = [
  {
    title: '按钮',
    component: 'a-button',
    slot: '默认按钮',
    // 组件宽度
    width: 200,
    componentProps: {
      type: 'primary'
    }
    //     // 是否隐藏
    //     hidden: false,
    // // 组件显隐规则
    // hiddenRules: [],
    // // 是否必选
    // required: false,
    // // 必选提示
    // message: "数据缺失",
    // // 组件校验规则
    // validateRules: []
  },
  {
    title: '输入框',
    component: 'a-input',
    // 组件宽度
    width: 200,
    componentProps: {
      placeholder: '请输入内容',
      // value: '1234',
      showCount: true
    }
  }
]
const list2 = ref<IItemContent[]>([])
const addComponent = (item: IItem) => {
  const itemContent = { ...item, id: uuidv4() }
  list2.value.push(itemContent)
  setActive(itemContent)
}
</script>
<style lang="scss" scoped></style>
