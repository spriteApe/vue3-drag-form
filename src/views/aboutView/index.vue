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
      <a-form
        :model="formState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
      >
        <VueDraggable
          class="flex flex-col gap-2 p-4 h-300px m-auto bg-gray-500/5 rounded overflow-auto"
          v-model="schemas"
          :animation="150"
          group="people"
          ghostClass="ghost"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
        >
          <a-form-item :label="item.title" :name="item.id" v-for="item in schemas" :key="item.id">
            <component
              :is="item.component"
              :style="item.width ? { width: item.width + 'px' } : {}"
              v-bind="item.componentProps"
              @click="setActive(item)"
            >
              {{ item.slot }}
            </component>
          </a-form-item>
        </VueDraggable>
      </a-form>
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
import type { IItem, IListens, IItemContent } from './types'
import { componentList } from './constant'

const formState = reactive<Record<string, any>>({})
const onFinish = (values: any) => {
  console.log('Success:', values)
}
function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
  schemas.value.forEach((item, index) => {
    if (!item.id) {
      const id = uuidv4()
      const itemContent = {
        ...item,
        id,
        componentProps: {
          ...item.componentProps
        }
      }
      if (item.component === 'a-switch') {
        const valRef = ref(false)
        itemContent.componentProps.checked = valRef
        itemContent.on = {
          'update:checked': (val: boolean) => {
            valRef.value = val
            formState[id] = val
          }
        }
      } else {
        const valRef = ref('')
        itemContent.componentProps.value = valRef
        itemContent.on = {
          'update:value': (val: string) => {
            valRef.value = val
            formState[id] = val
          }
        }
      }
      const component = handleOn(itemContent)
      schemas.value[index] = component
    }
  })
}
function remove() {
  console.log('remove')
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

  configList.value = res.map((item) => handleOn(item))
  console.log(configList.value)
}
const handleOn = (item: IItemContent): IItemContent => {
  const { componentProps = {}, on = {} } = item
  const listens = Object.keys(on).reduce((pre, key) => {
    const value = on[key]
    const props = `on${key.slice(0, 1).toUpperCase()}${key.slice(1)}`
    pre[props] = value
    return pre
  }, {} as IListens)
  return {
    ...item,
    componentProps: {
      ...componentProps,
      ...listens
    }
  }
}
const schemas = ref<IItemContent[]>([])
const addComponent = (item: IItem) => {
  schemas.value.push(item as IItemContent)
  setActive(item)
  onAdd()
}
</script>
<style lang="scss" scoped></style>
