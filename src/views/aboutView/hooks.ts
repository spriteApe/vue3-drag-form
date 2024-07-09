import { handleOn, getInitFormProps, getModelKey } from './utils'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import type {
  IConfigList,
  IFormProps,
  IFormState,
  IItemContent,
  IItem,
  IActiveComponent
} from './types'
import type { Ref } from 'vue'

function toNestedRef(obj: Record<string, any>, path: string) {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const parent = keys.reduce((acc, key) => acc[key], obj)
  const nestedRef = ref(parent[lastKey])
  watch(nestedRef, (newValue) => {
    parent[lastKey] = newValue
  })
  watch(
    () => parent[lastKey],
    (newValue) => {
      nestedRef.value = newValue
    }
  )
  return nestedRef
}
const getOption = <T extends IConfigList = IConfigList>(
  option: T,
  obj: Record<string, any>,
  key: string
): T => {
  const dataRef = toNestedRef(obj, key)
  const { component, componentProps = {}, on = {} } = option
  const modelKey = getModelKey(component)
  const updateModelKey = 'update:' + modelKey
  return {
    ...option,
    componentProps: {
      ...componentProps,
      [modelKey]: dataRef
    },
    on: {
      ...on,
      [updateModelKey]: (val: number | string) => {
        dataRef.value = val
        if (option.on?.[updateModelKey]) {
          option.on[updateModelKey](val)
        }
      }
    }
  }
}
const getComponent = (option: IItem, obj: Record<string, any>, key: string) => {
  const { component } = option
  return getOption(
    {
      ...option,
      id: uuidv4(),
      component: 'a-' + component
    },
    obj,
    key
  )
}
export const useCompileFormConfigList = (formProps: IFormProps) => {
  const res: IConfigList[] = []
  const widthComponent = getComponent(
    {
      component: 'slider',
      title: '宽度',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    formProps,
    'labelCol.span'
  )
  const wrapperColSpanComponent = getComponent(
    {
      component: 'slider',
      title: 'wrapperCol',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    formProps,
    'wrapperCol.span'
  )
  const layoutComponent = getComponent(
    {
      component: 'select',
      title: 'layout',
      componentProps: {
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
      }
    },
    formProps,
    'layout'
  )
  res.push(widthComponent, wrapperColSpanComponent, layoutComponent)

  return ref(res.map((item) => handleOn(item)))
}
export const useCompileConfigList = () => {
  const configList = ref<IConfigList[]>([])

  const updateConfigList = (item?: IItemContent) => {
    if (!item) {
      configList.value = []
      return
    }
    const res: IConfigList[] = []
    const titleComponent = getComponent(
      {
        component: 'input',
        title: '标题',
        componentProps: {
          placeholder: '请输入'
        }
      },
      item,
      'title'
    )
    const idComponent = getComponent(
      {
        component: 'input',
        title: '字段ID',
        componentProps: {
          placeholder: '请输入'
        }
      },
      item,
      'id'
    )
    const gridComponent = getComponent(
      {
        component: 'slider',
        title: '栅格',
        componentProps: {
          min: 1,
          max: 24
        }
      },
      item,
      'span'
    )
    item.required = item.required ?? false
    const requiredComponent = getComponent(
      {
        component: 'switch',
        title: '必填'
      },
      item,
      'required'
    )
    res.push(titleComponent, idComponent, gridComponent, requiredComponent)
    if (item.width !== undefined) {
      const widthComponent = getComponent(
        {
          component: 'slider',
          title: '宽度',
          componentProps: {
            min: 100,
            max: 500
          }
        },
        item,
        'width'
      )
      res.push(widthComponent)
    }

    if (item.slot !== undefined) {
      const slotComponent = getComponent(
        {
          component: 'input',
          title: '按钮文本'
        },
        item,
        'slot'
      )
      res.push(slotComponent)
    }
    if (!item.componentProps) return
    const { placeholder, showCount } = item.componentProps
    if (placeholder !== undefined) {
      const placeholderComponent = getComponent(
        {
          component: 'input',
          title: 'placeholder',
          componentProps: {
            placeholder: '请输入'
          }
        },
        item,
        'componentProps.placeholder'
      )
      res.push(placeholderComponent)
    }
    if (showCount !== undefined) {
      const numberComponent = getComponent(
        {
          component: 'checkbox',
          title: '显示数字'
        },
        item,
        'componentProps.showCount'
      )
      res.push(numberComponent)
    }
    configList.value = res.map((item) => handleOn(item))
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
export const usePreviewSchemas = (schemas: ISchemasRef, formState: IFormState) => {
  const newSchemas = ref<IItemContent[]>([])
  watch(
    schemas,
    (data) => {
      newSchemas.value = data.map((item) => {
        const { id } = item //保持原来的id
        Reflect.deleteProperty(item, 'on') //相关的事件删除 避免影响最外层的formState
        const itemContent = useGetItemContent(item, formState, id)
        return itemContent
      })
    },
    {
      immediate: true,
      deep: true
    }
  )
  return newSchemas
}
const activeComponentKey = Symbol('activeComponent')
type IActiveComponentKeyRef = Ref<IActiveComponent>
export const useProvideActiveComponent = (data: IActiveComponentKeyRef) => {
  provide(activeComponentKey, data)
}
export const useInjectActiveComponent = (data: IActiveComponentKeyRef = ref(null)) => {
  return inject(activeComponentKey, data) ?? data
}
const useGetItemContent = (item: IItem, formState: IFormState, id: string): IItemContent => {
  const itemClone = cloneDeep(item)
  const itemContent = getOption(
    {
      ...itemClone,
      id,
      span: 24
    },
    formState,
    id
  )
  return reactive(handleOn(itemContent))
}
export const useItemContent = (item: IItem, formState: IFormState): IItemContent => {
  return useGetItemContent(item, formState, uuidv4())
}

const previewKey = Symbol('preview')
export const useProvidePreview = (data: boolean) => {
  provide(previewKey, data)
}
export const useInjectPreview = (data = false) => {
  return inject(previewKey, data) ?? data
}
