<template>
  <a-radio-group v-model:value="value" :options="radioOptions"> </a-radio-group>
</template>
<script lang="ts" setup>
import { EFormLabelAlign, EFormLayout } from '@/views/HomeView/types'
enum ERadioOptionsValue {
  LEFT_ALIGNMENT = 'leftAlignment',
  RIGHT_ALIGNMENT = 'rightAlignment',
  TOP = 'top'
}
const radioOptions = [
  {
    label: '左对齐',
    value: ERadioOptionsValue['LEFT_ALIGNMENT']
  },
  {
    label: '右对齐',
    value: ERadioOptionsValue['RIGHT_ALIGNMENT']
  },
  {
    label: '顶部',
    value: ERadioOptionsValue['TOP']
  }
]
const value = computed({
  get() {
    if (layout.value === EFormLayout['VERTICAL']) return ERadioOptionsValue['TOP']
    if (labelAlign.value === EFormLabelAlign['LEFT']) return ERadioOptionsValue['LEFT_ALIGNMENT']
    return ERadioOptionsValue['RIGHT_ALIGNMENT']
  },
  set(val) {
    switch (val) {
      case ERadioOptionsValue['LEFT_ALIGNMENT']:
        layout.value = EFormLayout['HORIZONTAL']
        labelAlign.value = EFormLabelAlign['LEFT']
        break
      case ERadioOptionsValue['RIGHT_ALIGNMENT']:
        layout.value = EFormLayout['HORIZONTAL']
        labelAlign.value = EFormLabelAlign['RIGHT']
        break
      default:
        layout.value = EFormLayout['VERTICAL']
        break
    }
  }
})
const layout = defineModel<EFormLayout>('layout', {
  required: true
})
const labelAlign = defineModel<EFormLabelAlign>('labelAlign', {
  required: true
})
</script>

<style lang="scss" scoped></style>
