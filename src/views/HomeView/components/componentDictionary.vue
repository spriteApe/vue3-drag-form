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
import type { IItem } from '../types'
import { componentList } from '../constant'
import { emitter } from '../mitt'
import { useItemContent } from '../hooks'
import { useDragFormStore } from '@/stores/dragForm'
const dragFormStore = useDragFormStore()

function clone(element: IItem) {
  const itemContent = useItemContent(element, dragFormStore.formState)
  emitter.emit('update:configList', itemContent)
  dragFormStore.activeComponent = itemContent
  return itemContent
}
const addComponent = (item: IItem) => {
  const itemContent = useItemContent(item, dragFormStore.formState)
  dragFormStore.activeComponent = itemContent
  emitter.emit('update:configList', itemContent)
  dragFormStore.schemas.push(itemContent)
}
</script>
<style lang="scss" scoped></style>
