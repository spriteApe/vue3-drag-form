<template>
  <div class="flex">
    <div class="left">
      <VueDraggable
        class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        v-model="componentList"
        :animation="150"
        ghostClass="ghost"
        :clone="clone"
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
      <a-form :model="formState" v-bind="formProps" autocomplete="off" @finish="onFinish">
        <VueDraggable
          class="flex flex-col gap-2 p-4 h-300px m-auto bg-gray-500/5 rounded overflow-auto"
          v-model="schemas"
          :animation="150"
          group="people"
          ghostClass="ghost"
        >
          <a-form-item :label="item.title" :name="item.id" v-for="item in schemas" :key="item.id">
            <component
              :is="item.component"
              :style="item.width ? { width: item.width + 'px' } : {}"
              v-bind="item.componentProps"
              @click="compileConfigList(item)"
            >
              {{ item.slot }}
            </component>
          </a-form-item>
        </VueDraggable>
      </a-form>
    </div>
    <div class="config w-60 p-4">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="表单">
          <div v-for="item in formConfigList" :key="item.id">
            {{ item.title }}: <component :is="item.component" v-bind="item.componentProps" /></div
        ></a-tab-pane>
        <a-tab-pane key="2" tab="组件">
          <div v-for="item in configList" :key="item.id">
            {{ item.title }}:
            <component :is="item.component" v-bind="item.componentProps" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { v4 as uuidv4 } from 'uuid'
import type { IItem, IItemContent } from './types'
import { componentList } from './constant'
import { cloneDeep } from 'lodash-es'
import { handleOn } from '@/utils'
const activeKey = ref('1')
const formState = reactive<Record<string, any>>({})
const onFinish = (values: any) => {
  console.log('Success:', values)
}
const formProps = reactive({
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  layout: 'horizontal'
})
const formConfigList = ref<IItemContent[]>([])
const compileFormConfigList = () => {
  const res: IItemContent[] = []
  const labelCol = ref(formProps.labelCol.span)
  res.push({
    id: uuidv4(),
    component: 'a-slider',
    title: 'labelCol',
    componentProps: {
      value: labelCol,
      min: 1,
      max: 24
    },
    on: {
      'update:value': (val: number) => {
        labelCol.value = val
        formProps.labelCol.span = val
      }
    }
  })
  const wrapperCol = ref(formProps.wrapperCol.span)
  res.push({
    id: uuidv4(),
    component: 'a-slider',
    title: 'wrapperCol',
    componentProps: {
      value: wrapperCol,
      min: 1,
      max: 24
    },
    on: {
      'update:value': (val: number) => {
        wrapperCol.value = val
        formProps.wrapperCol.span = val
      }
    }
  })
  const layout = ref(formProps.layout)
  res.push({
    id: uuidv4(),
    component: 'a-select',
    title: 'layout',
    componentProps: {
      value: layout,
      options: [
        {
          value: 'horizontal',
          label: 'horizontal'
        },
        {
          value: 'vertical',
          label: 'vertical'
        },
        {
          value: 'inline',
          label: 'inline'
        }
      ]
    },
    on: {
      'update:value': (val: string) => {
        layout.value = val
        formProps.layout = val
      }
    }
  })
  formConfigList.value = res.map((item) => handleOn(item))
}
compileFormConfigList()
const configList = ref<IItemContent[]>([])
const compileConfigList = (item: IItem) => {
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
function clone(element: IItem) {
  const itemContent = reactive(getItemContent(element))
  compileConfigList(itemContent)
  activeKey.value = '2'
  return itemContent
}
const addComponent = (item: IItem) => {
  const itemContent = reactive(getItemContent(item))
  compileConfigList(itemContent)
  activeKey.value = '2'
  schemas.value.push(itemContent)
}
</script>
<style lang="scss" scoped></style>
