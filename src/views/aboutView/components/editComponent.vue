<template>
  <div
    class="editComponent"
    @click="updateConfigList(item)"
    :class="activeVisible ? 'editComponent--active' : ''"
  >
    <slot></slot>
    <div class="absolute top-0 right-0 z-999" @click.stop v-show="activeVisible">
      <CopyOutlined class="cursor-pointer mx-2" @click="copyItem" />
      <DeleteOutlined class="cursor-pointer mx-2" @click="deleteItem" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IItemContent } from '../types'
import { emitter } from '../mitt'
import {
  useInjectSchemas,
  useInjectActiveComponent,
  useInjectFormState,
  useItemContent
} from '../hooks'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue'

const activeComponent = useInjectActiveComponent()
const schemas = useInjectSchemas()
const props = defineProps<{
  item: IItemContent
}>()
const updateConfigList = (item?: IItemContent) => {
  activeComponent.value = item ?? null
  emitter.emit('update:configList', item)
}
const activeVisible = computed(() => activeComponent.value === props.item)
const formState = useInjectFormState()
const copyItem = () => {
  const currentIndex = schemas.value.findIndex((item) => item === props.item)
  if (currentIndex === -1) return
  const itemContent = useItemContent(props.item, formState)
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
  @apply relative;
  &--active {
    border: 1px solid red;
  }
}
</style>
