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
