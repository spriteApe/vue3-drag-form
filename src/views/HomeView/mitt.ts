import mitt, { type Emitter } from 'mitt'
import type { IItemContent } from './types'
type Events = {
  'update:configList'?: IItemContent
  'check-visible': undefined
}

export const emitter: Emitter<Events> = mitt<Events>()
