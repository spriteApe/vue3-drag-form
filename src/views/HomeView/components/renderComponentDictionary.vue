<template>
  <VueDraggable
    class="grid grid-cols-3 gap-2 p-4 w-300px rounded"
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
      class="cursor-move h-20 bg-gray-500/5 rounded flex flex-col justify-evenly items-center"
      @click="addComponent(item)"
    >
      <Icon :icon="item.icon!" v-if="item.icon" />
      <span class="text-sm">
        {{ item.title }}
      </span>
    </div>
  </VueDraggable>
</template>
<script lang="ts" setup>
import type { IItem } from '../types'
import { VueDraggable } from 'vue-draggable-plus'
import { useItemContent } from '../hooks'
import { useDragFormStore } from '@/stores/dragForm'
import { Icon } from '@iconify/vue'
const componentList = defineModel<IItem[]>({
  required: true
})
const dragFormStore = useDragFormStore()
function clone(element: IItem) {
  const itemContent = useItemContent(element, dragFormStore.formState)
  dragFormStore.schemas.push(itemContent)
  return itemContent
}
const addComponent = (item: IItem) => {
  const itemContent = useItemContent(item, dragFormStore.formState)
  dragFormStore.schemas.push(itemContent)
}
</script>
<style lang="scss" scoped></style>
