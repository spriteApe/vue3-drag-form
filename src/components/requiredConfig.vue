<template>
  <div>
    <a-switch v-model:checked="switchChecked" />
    <a-input
      v-model:value="inputVal"
      placeholder="请输入提示信息"
      v-if="switchChecked"
      class="w-50 ml-4"
    />
  </div>
</template>
<script lang="ts" setup>
const switchChecked = defineModel<boolean>('required', {
  required: true
})
const inputVal = defineModel<string>('message', {
  required: true
})
</script>

<style lang="scss" scoped></style>
