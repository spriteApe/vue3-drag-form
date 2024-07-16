import { getInitFormProps } from '@/views/HomeView/utils'
import type {
  IItemContent,
  IFormProps,
  IFormState,
  IActiveComponent,
  IExportAndImportJSON
} from '@/views/HomeView/types'
import { usePreviewSchemas, useItemContentByItemContent } from '@/views/HomeView/hooks'
export const useDragFormStore = defineStore('dragForm', () => {
  const formState = reactive<IFormState>({})
  const formProps = reactive<IFormProps>(getInitFormProps())
  const schemas = ref<IItemContent[]>([])
  const activeComponent = ref<IActiveComponent>(null)

  const formStatePreview = reactive<IFormState>({})
  const newSchemas = usePreviewSchemas(schemas, formStatePreview)

  const renderComponentGetData = (isPreview: boolean) =>
    isPreview
      ? {
          formState: formStatePreview,
          schemas: newSchemas
        }
      : { formState, schemas }
  const clearObject = (data: Record<string, any>) => {
    // 清空对象
    Object.keys(data).forEach((key) => {
      Reflect.deleteProperty(data, key)
    })
  }
  const restByImport = (res: IExportAndImportJSON) => {
    clearObject(formState)
    const {
      schemas: schemasJson,
      labelCol: { span: labelColSpan },
      wrapperCol: { span: wrapperColSpan },
      layout,
      labelAlign
    } = res
    Reflect.deleteProperty(res, 'schemas')
    // Object.assign(formProps, res) //不能这样,会导致响应式丢失
    formProps.labelCol.span = labelColSpan
    formProps.wrapperCol.span = wrapperColSpan
    formProps.layout = layout
    formProps.labelAlign = labelAlign
    const result = schemasJson.map((options) => {
      return useItemContentByItemContent(options, formState)
    })
    schemas.value = result
    activeComponent.value = null

    clearObject(formStatePreview)
  }

  return {
    formState,
    formProps,
    schemas,
    activeComponent,
    formStatePreview,
    newSchemas,
    renderComponentGetData,
    restByImport
  }
})
