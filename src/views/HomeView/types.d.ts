export type IListens = Record<string, (...any: any[]) => void>
export type IItem = {
  title: string
  component: string
  required?: boolean
  visible?: boolean
  width?: number
  slot?: string
  componentProps?: Record<string, any>
  on?: IListens
}
export interface IItemContentOther {
  id: string
  _id: string
  span: number
}
export type IItemContent = IItem & IItemContentOther
export type IConfigList = Omit<IItemContent, 'span'>
export type IFormLayout = 'horizontal' | 'vertical' | 'inline'
export type IActiveComponent = IItemContent | null

export interface IFormProps {
  labelCol: { span: number }
  wrapperCol: { span: number }
  layout: IFormLayout
}
export type IFormState = Record<string, any>
export type IConfigOptions = {
  options: IItem | IConfigList
  path: string
}
export type IExportAndImportJSON = IFormProps & { schemas: IItemContent[] }
