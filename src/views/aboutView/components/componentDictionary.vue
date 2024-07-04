<template>
  <VueDraggable
    class="flex flex-col gap-2 p-4 w-300px h-full m-auto bg-gray-500/5 rounded overflow-auto"
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
</template>
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { v4 as uuidv4 } from 'uuid'
import type { IItem, IItemContent } from '../types'
import { cloneDeep } from 'lodash-es'
import { handleOn } from '../utils'
import { componentList } from '../constant'
import { emitter } from '../mitt'
import { useInjectFormState, useInjectSchemas } from '../hooks'
const formState = useInjectFormState()
const schemas = useInjectSchemas()

const getItemContent = (item: IItem): IItemContent => {
  const itemClone = cloneDeep(item)
  const id = uuidv4()
  const itemContent = {
    ...itemClone,
    id,
    span: 24,
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
  return handleOn(itemContent) as IItemContent
}
function clone(element: IItem) {
  const itemContent = reactive(getItemContent(element))
  emitter.emit('update:configList', itemContent)
  return itemContent
}
const addComponent = (item: IItem) => {
  const itemContent = reactive(getItemContent(item))
  emitter.emit('update:configList', itemContent)
  schemas.value.push(itemContent)
}
</script>
<style lang="scss" scoped></style>
