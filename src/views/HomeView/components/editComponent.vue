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
import { emitter } from '../mitt'
import {
  useInjectSchemas,
  useInjectActiveComponent,
  useInjectFormState,
  useItemContent,
  useInjectPreview
} from '../hooks'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue'
const isPreview = useInjectPreview()
const activeComponent = useInjectActiveComponent()
const schemas = useInjectSchemas()
const props = defineProps<{
  item: IItemContent
}>()
const updateConfigList = (item?: IItemContent) => {
  if (activeComponent.value === item) return
  activeComponent.value = item ?? null
  emitter.emit('update:configList', item)
}
const activeVisible = computed(() => activeComponent.value === props.item)
const formState = useInjectFormState()
const copyItem = () => {
  const currentIndex = schemas.value.findIndex((item) => item === props.item)
  if (currentIndex === -1) return
  const itemContent = useItemContent(props.item, formState, props.item.span)
  updateConfigList(itemContent)
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
  &--active {
    border: 1px solid red;
  }
}
</style>
