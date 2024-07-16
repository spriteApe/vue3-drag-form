<template>
  <div
    class="editComponent"
    :class="activeVisible ? 'editComponent--active' : ''"
    v-if="!isPreview"
    @click="updateConfigList(item)"
  >
    <slot></slot>
    <div class="absolute top-0 left-0 z-999" @click.stop v-show="activeVisible">
      <CopyOutlined class="cursor-pointer mx-2" @click="copyItem" />
      <DeleteOutlined class="cursor-pointer mx-2" @click="deleteItem" />
    </div>
  </div>
  <slot v-else></slot>
</template>
<script lang="ts" setup>
import type { IItemContent } from '../types'
import { useItemContent } from '../hooks'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useDragFormStore } from '@/stores/dragForm'
const dragFormStore = useDragFormStore()

const props = withDefaults(
  defineProps<{
    isPreview?: boolean
    item: IItemContent
  }>(),
  {
    isPreview: false
  }
)
const { formState, schemas } = dragFormStore.renderComponentGetData(props.isPreview)
const updateConfigList = (item?: IItemContent) => {
  if (dragFormStore.activeComponent === item) return
  dragFormStore.activeComponent = item ?? null
}
const activeVisible = computed(() => dragFormStore.activeComponent === props.item)
const copyItem = () => {
  const currentIndex = schemas.value.findIndex((item) => item === props.item)
  if (currentIndex === -1) return
  const itemContent = useItemContent(props.item, formState, props.item.span)
  schemas.value.splice(currentIndex + 1, 0, itemContent)
}
const deleteItem = () => {
  const currentIndex = schemas.value.findIndex((item) => item === props.item)
  if (currentIndex === -1) return
  updateConfigList()
  schemas.value.splice(currentIndex, 1)
}
</script>
<style lang="scss" scoped>
.editComponent {
  @apply relative cursor-pointer h-full;
  border: 1px solid transparent;
  &--active {
    border-color: red;
  }
}
</style>
