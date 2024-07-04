export type IListens = Record<string, (...any: any[]) => void>
export type IItem = {
  title: string
  component: string
  width?: number
  slot?: string
  componentProps?: Record<string, any>
  on?: IListens
}
export type IItemContent = IItem & {
  id: string
  span: number
}
export type IConfigList = Omit<IItemContent, 'span'>
export type IFormLayout = 'horizontal' | 'vertical' | 'inline'

export interface IFormProps {
  labelCol: { span: number }
  wrapperCol: { span: number }
  layout: IFormLayout
}
export type IFormState = Record<string, any>
