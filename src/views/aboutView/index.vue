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
import { cloneDeep } from 'lodash-es'
const formState = reactive<Record<string, any>>({})
const onFinish = (values: any) => {
  console.log('Success:', values)
}
function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
}
function remove() {
  console.log('remove')
}
const configList = ref<IItemContent[]>([])
const setActive = (item: IItem) => {
  const res: IItemContent[] = []
  const titleRef = ref(item.title)
  res.push({
    id: uuidv4(),
    component: 'a-input',
    title: '标题',
    componentProps: {
      placeholder: '请输入',
      value: titleRef
    },
    on: {
      'update:value': (val: string) => {
        item.title = val
        titleRef.value = val
      }
    }
  })
  if (item.width) {
    const widthRef = ref(item.width)
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
          item.width = val
          widthRef.value = val
        }
      }
    })
  }

  if (item.slot) {
    const slotRef = ref(item.slot)
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
          item.slot = val
          slotRef.value = val
        }
      }
    })
  }
  if (!item.componentProps) return
  const { placeholder, showCount } = item.componentProps
  if (placeholder) {
    const placeholderRef = ref(item.componentProps!.placeholder)
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
          item.componentProps!.placeholder = val
          placeholderRef.value = val
        }
      }
    })
  }
  if (showCount) {
    const showCountRef = ref(item.componentProps!.showCount)
    res.push({
      id: uuidv4(),
      component: 'a-checkbox',
      title: '显示数字',
      componentProps: {
        checked: showCountRef
      },
      on: {
        'update:checked': (val: boolean) => {
          item.componentProps!.showCount = val
          showCountRef.value = val
        }
      }
    })
  }

  configList.value = res.map((item) => handleOn(item))
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
const getItemContent = (item: IItem): IItemContent => {
  const itemClone = cloneDeep(item)
  const id = uuidv4()
  const itemContent = {
    ...itemClone,
    id,
    componentProps: {
      ...(item.componentProps || {})
    }
  }
  if (item.component === 'a-switch') {
    const valRef = ref(false)
    itemContent.componentProps.checked = valRef
    itemContent.on = {
      'update:checked': (val: boolean) => {
        formState[id] = val
        valRef.value = val
      }
    }
  } else {
    const valRef = ref(undefined)
    itemContent.componentProps.value = valRef
    itemContent.on = {
      'update:value': (val: any) => {
        formState[id] = val
        valRef.value = val
      }
    }
  }
  return handleOn(itemContent)
}
const addComponent = (item: IItem) => {
  const itemContent = reactive(getItemContent(item))
  schemas.value.push(itemContent)
  setActive(itemContent)
}
</script>
<style lang="scss" scoped></style>
