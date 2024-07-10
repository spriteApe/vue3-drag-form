import mitt, { type Emitter } from 'mitt'
import type { IItemContent } from './types'
type Events = {
  'update:configList'?: IItemContent
}

export const emitter: Emitter<Events> = mitt<Events>()
