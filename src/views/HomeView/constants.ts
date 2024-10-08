import type { IItem, IConfigOptions } from './types'
import { ESymbols } from '@/components/visibleConfig/types'
const defaultOptions = [
  {
    value: 'jack',
    label: 'Jack'
  },
  {
    value: 'lucy',
    label: 'Lucy'
  }
]
export const formComponentList: IItem[] = [
  {
    title: '输入框',
    component: 'a-input',
    required: true,
    componentProps: {
      placeholder: '请输入内容',
      showCount: true
    },
    icon: 'carbon:string-text',
    symbols: [
      ESymbols['EQUAL'],
      ESymbols['NOT_EQUAL'],
      ESymbols['CONTAIN'],
      ESymbols['NOT_CONTAIN'],
      ESymbols['EMPTY'],
      ESymbols['NOT_EMPTY']
    ]
  },
  {
    title: '数字输入框',
    component: 'a-input-number',
    icon: 'carbon:character-whole-number',
    componentProps: {
      placeholder: '请输入',
      class: 'w-full'
    },
    symbols: [
      ESymbols['EQUAL'],
      ESymbols['NOT_EQUAL'],
      ESymbols['GREATER_THAN'],
      ESymbols['GREATER_THAN_EQUAL'],
      ESymbols['LESS_THAN'],
      ESymbols['LESS_THAN_EQUAL'],
      ESymbols['EMPTY'],
      ESymbols['NOT_EMPTY']
    ]
  },
  {
    title: '开关',
    component: 'a-switch',
    icon: 'carbon:cut-in-half',
    componentProps: {
      checked: true
    },
    symbols: [ESymbols['EQUAL'], ESymbols['NOT_EQUAL']]
  },
  {
    title: '选择器',
    component: 'a-select',
    icon: 'carbon:partition-same',
    componentProps: {
      placeholder: '请选择内容',
      options: defaultOptions
    },
    symbols: [
      ESymbols['EQUAL'],
      ESymbols['NOT_EQUAL'],
      ESymbols['CONTAIN'],
      ESymbols['NOT_CONTAIN'],
      ESymbols['EMPTY'],
      ESymbols['NOT_EMPTY']
    ]
  },
  {
    title: '多选框',
    component: 'a-checkbox-group',
    icon: 'carbon:checkbox-checked',
    componentProps: {
      placeholder: '请选择内容',
      options: defaultOptions
    },
    symbols: [
      ESymbols['EQUAL'],
      ESymbols['NOT_EQUAL'],
      ESymbols['CONTAIN'],
      ESymbols['NOT_CONTAIN'],
      ESymbols['EMPTY'],
      ESymbols['NOT_EMPTY']
    ]
  },
  {
    title: '日期选择器',
    component: 'a-date-picker',
    icon: 'carbon:calendar',
    componentProps: {
      placeholder: '请选择日期'
    },
    symbols: [ESymbols['EQUAL'], ESymbols['NOT_EQUAL'], ESymbols['EMPTY'], ESymbols['NOT_EMPTY']]
  },
  {
    title: '单选框',
    component: 'a-radio-group',
    icon: 'carbon:radio-button-checked',

    componentProps: {
      options: defaultOptions
    },
    symbols: [ESymbols['EQUAL'], ESymbols['NOT_EQUAL'], ESymbols['EMPTY'], ESymbols['NOT_EMPTY']]
  },
  {
    title: '评分',
    component: 'a-rate',
    icon: 'carbon:star-filled',
    symbols: [
      ESymbols['EQUAL'],
      ESymbols['NOT_EQUAL'],
      ESymbols['GREATER_THAN'],
      ESymbols['GREATER_THAN_EQUAL'],
      ESymbols['LESS_THAN'],
      ESymbols['LESS_THAN_EQUAL'],
      ESymbols['EMPTY'],
      ESymbols['NOT_EMPTY']
    ]
  }
]
export const notFormComponentList: IItem[] = [
  {
    title: '按钮',
    component: 'a-button',
    width: 200,
    slot: '默认按钮',
    componentProps: {
      type: 'primary'
    },
    icon: 'carbon:button-centered'
  },
  {
    title: '表格',
    component: 'a-table',
    componentProps: {
      pagination: false,
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
        }
      ],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '年龄',
          dataIndex: 'age'
        },
        {
          title: '住址',
          dataIndex: 'address'
        }
      ]
    },
    icon: 'carbon:data-table'
  }
]
export const formConfigOptions: IConfigOptions[] = [
  {
    options: {
      component: 'a-slider',
      title: 'labelCol',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    path: 'labelCol.span'
  },
  {
    options: {
      component: 'a-slider',
      title: 'wrapperCol',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    path: 'wrapperCol.span'
  },
  {
    options: {
      component: 'formLabelConfig',
      title: '标签的位置'
    },
    path: ['layout', 'labelAlign']
  }
]
export const componentConfigOptions: IConfigOptions[] = [
  {
    options: {
      component: 'a-input',
      title: '标题',
      componentProps: {
        placeholder: '请输入'
      }
    },
    isForm: true,
    path: 'title'
  },
  {
    options: {
      component: 'a-input',
      title: '字段ID',
      componentProps: {
        placeholder: '请输入'
      }
    },
    isForm: true,
    path: 'id'
  },
  {
    options: {
      component: 'a-slider',
      title: '栅格',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    path: 'span'
  },
  {
    options: {
      component: 'requiredConfig',
      title: '必填'
    },
    isForm: true,
    path: ['required', 'message']
  },
  {
    options: {
      component: 'a-slider',
      title: '宽度',
      componentProps: {
        min: 100,
        max: 500
      }
    },
    path: 'width'
  },
  {
    options: {
      component: 'a-input',
      title: '按钮文本'
    },
    path: 'slot'
  },
  {
    options: {
      component: 'a-input',
      title: 'placeholder',
      componentProps: {
        placeholder: '请输入'
      }
    },
    path: 'componentProps.placeholder'
  },
  {
    options: {
      component: 'optionDataConfig',
      title: '选项数据'
    },
    path: 'componentProps.options'
  },
  {
    options: {
      component: 'visibleConfig',
      title: '隐藏条件'
    },
    path: 'hideCondition'
  },
  {
    options: {
      component: 'tableDataSourceConfig',
      title: '表格数据'
    },
    path: 'componentProps.dataSource'
  },
  {
    options: {
      component: 'tableColumnsConfig',
      title: '表格列表'
    },
    path: ['componentProps.columns', 'componentProps.dataSource']
  },
  {
    options: {
      component: 'a-checkbox',
      title: '显示数字'
    },
    path: 'componentProps.showCount'
  }
]
