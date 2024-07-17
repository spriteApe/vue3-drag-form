<template>
  <div class="h-full overflow-auto bg-gray-500/5">
    <VueDraggable
      class="grid grid-cols-3 gap-2 p-4 w-300px rounded"
      v-model="totalComponentList"
      :animation="150"
      ghostClass="ghost"
      :clone="clone"
      :sort="false"
      :group="{ name: 'people', pull: 'clone', put: false }"
    >
      <div
        v-for="item in totalComponentList"
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
  </div>
</template>
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import type { IItem } from '../types'
import { componentList } from '../constants'
import { useItemContent } from '../hooks'
import { useDragFormStore } from '@/stores/dragForm'
import { Icon } from '@iconify/vue'
const dragFormStore = useDragFormStore()
const totalComponentList = ref(componentList)

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
