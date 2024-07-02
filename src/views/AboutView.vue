<template>
  <div class="flex">
    <div class="left">
      <VueDraggable
        class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        v-model="componentList"
        :animation="150"
        ghostClass="ghost"
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
          :key="item.component"
          :style="{ width: item.width + 'px' }"
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
      <div v-for="item in configList" :key="item.value">
        {{ item.component.title }}:
        <component
          :is="item.component.component"
          v-model="item.value"
          v-bind="item.component.componentProps"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'

function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
}
function remove() {
  console.log('remove')
}
type IItem = {
  title: string
  component: string
  width: number
  slot?: string
  componentProps?: Record<string, any>
}

const activeComponent = ref<IItem | null>(null)
type IType = 'width' | 'placeholder' | 'showCount' | 'slot'
type IConfigList = { value: string | number; type: IType; component: IItem }[]
const configList = ref<IConfigList>([])
const setActive = (item: IItem) => {
  activeComponent.value = item
  const res: IConfigList = []
  res.push({
    value: item.width,
    type: 'width',
    component: {
      component: 'a-slider',
      title: '宽度',
      width: 50,
      componentProps: {
        value: item.width,
        min: 10,
        max: 20
      }
    }
  })
  if (item.slot) {
    res.push({
      value: item.slot,
      type: 'slot',
      component: {
        component: 'a-input',
        title: '按钮文本',
        width: 50,
        componentProps: {
          placeholder: '请输入',
          value: item.slot
        }
      }
    })
  }
  if (!item.componentProps) return
  const { placeholder, showCount } = item.componentProps
  if (placeholder) {
    res.push({
      value: placeholder,
      type: 'placeholder',
      component: {
        component: 'a-input',
        title: 'placeholder',
        width: 50,
        componentProps: {
          placeholder: '请输入',
          value: placeholder
        }
      }
    })
  }
  if (showCount) {
    res.push({
      value: showCount,
      type: 'showCount',
      component: {
        component: 'a-checkbox',
        title: '显示数字',
        width: 50,
        componentProps: {
          checked: showCount
        }
      }
    })
  }

  configList.value = res
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
const list2 = ref<IItem[]>([])
const addComponent = (item: IItem) => {
  list2.value.push(item)
  setActive(item)
}
</script>
<style lang="scss" scoped></style>
