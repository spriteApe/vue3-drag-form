import { handleOn, getInitFormProps } from './utils'
import { v4 as uuidv4 } from 'uuid'
import type { IConfigList, IFormLayout, IFormProps, IFormState, IItemContent } from './types'
import type { Ref } from 'vue'
export const useCompileFormConfigList = (formProps: IFormProps) => {
  const res: IConfigList[] = []
  const labelCol = ref(formProps.labelCol.span)
  res.push({
    id: uuidv4(),
    component: 'a-slider',
    title: 'labelCol',
    componentProps: {
      value: labelCol,
      min: 1,
      max: 24
    },
    on: {
      'update:value': (val: number) => {
        labelCol.value = val
        formProps.labelCol.span = val
      }
    }
  })
  const wrapperCol = ref(formProps.wrapperCol.span)
  res.push({
    id: uuidv4(),
    component: 'a-slider',
    title: 'wrapperCol',
    componentProps: {
      value: wrapperCol,
      min: 1,
      max: 24
    },
    on: {
      'update:value': (val: number) => {
        wrapperCol.value = val
        formProps.wrapperCol.span = val
      }
    }
  })
  const layout = ref(formProps.layout)
  res.push({
    id: uuidv4(),
    component: 'a-select',
    title: 'layout',
    componentProps: {
      value: layout,
      options: [
        {
          value: 'horizontal',
          label: 'horizontal'
        },
        {
          value: 'vertical',
          label: 'vertical'
        },
        {
          value: 'inline',
          label: 'inline'
        }
      ]
    },
    on: {
      'update:value': (val: IFormLayout) => {
        layout.value = val
        formProps.layout = val
      }
    }
  })
  return ref(res.map((item) => handleOn(item) as IConfigList))
}
export const useCompileConfigList = () => {
  const configList = ref<IConfigList[]>([])

  const updateConfigList = (item: IItemContent) => {
    const res: IConfigList[] = []
    const titleRef = ref(item.title)
    res.push({
      id: uuidv4(),
      component: 'a-input',
      title: '标题',
      componentProps: {
        placeholder: '请输入',
        value: titleRef
      },
      on: {
        'update:value': (val: string) => {
          item.title = val
          titleRef.value = val
        }
      }
    })
    const spanRef = ref(item.span)
    res.push({
      id: uuidv4(),
      component: 'a-slider',
      title: '栅格',
      componentProps: {
        value: spanRef,
        min: 1,
        max: 24
      },
      on: {
        'update:value': (val: number) => {
          item.span = val
          spanRef.value = val
        }
      }
    })
    if (item.width) {
      const widthRef = ref(item.width)
      res.push({
        id: uuidv4(),
        component: 'a-slider',
        title: '宽度',
        componentProps: {
          value: widthRef,
          min: 100,
          max: 500
        },
        on: {
          'update:value': (val: number) => {
            item.width = val
            widthRef.value = val
          }
        }
      })
    }

    if (item.slot) {
      const slotRef = ref(item.slot)
      res.push({
        id: uuidv4(),
        component: 'a-input',
        title: '按钮文本',
        componentProps: {
          placeholder: '请输入',
          value: slotRef
        },
        on: {
          'update:value': (val: string) => {
            item.slot = val
            slotRef.value = val
          }
        }
      })
    }
    if (!item.componentProps) return
    const { placeholder, showCount } = item.componentProps
    if (placeholder) {
      const placeholderRef = ref(item.componentProps!.placeholder)
      res.push({
        id: uuidv4(),
        component: 'a-input',
        title: 'placeholder',
        componentProps: {
          placeholder: '请输入',
          value: placeholderRef
        },
        on: {
          'update:value': (val: string) => {
            item.componentProps!.placeholder = val
            placeholderRef.value = val
          }
        }
      })
    }
    if (showCount) {
      const showCountRef = ref(item.componentProps!.showCount)
      res.push({
        id: uuidv4(),
        component: 'a-checkbox',
        title: '显示数字',
        componentProps: {
          checked: showCountRef
        },
        on: {
          'update:checked': (val: boolean) => {
            item.componentProps!.showCount = val
            showCountRef.value = val
          }
        }
      })
    }

    configList.value = res.map((item) => handleOn(item)) as IConfigList[]
  }
  return {
    configList,
    updateConfigList
  }
}

const formStateKey = Symbol('formState')
export const useProvideFormState = (data: IFormState) => {
  provide(formStateKey, data)
}
export const useInjectFormState = (data: IFormState = {}) => {
  return inject(formStateKey, data) ?? data
}
const formPropsKey = Symbol('formProps')
export const useProvideFormProps = (data: IFormProps) => {
  provide(formPropsKey, data)
}
export const useInjectFormProps = (data = getInitFormProps()) => {
  return inject(formPropsKey, data) ?? data
}
const schemasKey = Symbol('schemas')
type ISchemasRef = Ref<IItemContent[]>
export const useProvideSchemas = (data: ISchemasRef) => {
  provide(schemasKey, data)
}
export const useInjectSchemas = (data: ISchemasRef = ref([])) => {
  return inject(schemasKey, data) ?? data
}
