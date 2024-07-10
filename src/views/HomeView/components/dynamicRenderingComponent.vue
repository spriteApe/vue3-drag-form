<template>
  <component
    :is="item.component"
    :style="item.width ? { width: item.width + 'px' } : {}"
    v-bind="item.componentProps"
  >
    {{ item.slot }}
  </component>
</template>
<script lang="ts" setup>
import type { IConfigList } from '../types'
defineProps<{
  item: IConfigList
}>()
</script>
<style lang="scss" scoped></style>
