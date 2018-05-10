# iview-form

> 让 iview 的 form 使用起来更加简单。

## 例子
[demo][1]

## 安装

### npm（推荐方式）

```bash
$ npm install iview-form
```

## 快速开始

``` html
<template>
  <iViewForm @submit="onSubmit" :formList="formList"></iViewForm>
</template>

<script>
import iViewForm from 'iview-form'

export default {
  components: {
    iViewForm
  },
  data() {
    return {
      formList: [
        {
          title: '姓名',
          type: 'input',
          key: 'name'
        }
      ]
    }
  },
  methods: {
    onSubmit(form, valid) {
      console.log(form, valid)
    }
  }
}
</script>
```
标签大小写随你心情
``` html
<iview-form @submit="onSubmit" :formList="formList"></iview-form>
```
使用 element-ui 组件库
``` html
<iview-form lib="element" @submit="onSubmit" :formList="formList"></iview-form>
```

## iview-form 参数

| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| grid | 网格，更多请看 demo | Number, Array | - |
| formList | 配置项（看下面 formList 参数） | Array | [] |
| notCtrl | 是否不显示 提交、重置 按钮 | Boolean | false |
| enterSubmit | 如果设定这个值为 true，那么 input 按 enter 键会触发 submit 事件 | Boolean | false |
| lib | 可选值（'iview', 'element'），如果指定为 element 那么组件会按照 element 来渲染 | String | 'iview' |
| disabled | 如果设定这个值为 true，那么该表单下所有的表单元素都会被禁用 | Boolean | false |
| label-width | 标签的宽度 | Number | 100 |
| content-width | 内容的宽度 | Number | 240 |
| options | iView 和 element-ui 原生 props ( :options="{size: 'small'}" ) | Object | {} |
| submitText | 提交按钮文本 | String | '提交' |
| resetText | 重置按钮文本 | String | '重置' |
| hasSubmitBtn | 是否显示提交按钮 | Boolean | true |
| hasResetBtn | 是否显示重置按钮 | Boolean | true |
| clearable | 控制是否显示清除 icon | Boolean | true |

## formList 参数
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| title | 显示的标签 | String | '' |
| type | 不同的类型默认值不同，具体看下面 type 的种类 | String | '' |
| key | 可以监听 submit 事件，返回的 form 里面的 key 就是你定义的 key | String | '' |
| defaultValue | item 的默认值 | - | - |
| isShow | isShow 为 false 会不显示这个元素 | Boolean,Function | (form, item) |
| props | 组件库自带的参数,可以参考 iview 或者 element 组件库的文档 | Object | {} |
| attrs | 组件库自带的参数,可以参考 iview 或者 element 组件库的文档 | Object | {} |
| text | type 为 checkbox 或者 radio 时才有用，显示后面跟着的文字 | String | '' |
| options | type 为 checkbox-group 或者 radio-group 时才有用，由 {value: 0, text: '苹果'} 组成，数据项支持异步 | Array | [] |
| onInput | 监听参数改变事件 | Function | (value, item, form) |
| render | 自定义整行 | Function | (h, item, form) |
| renderTitle | 自定义标签 | Function | (h, item, form) |
| renderContent | 自定义内容主题 | Function | (h, item, form) |
| renderOption | type 为 select 时才有用，可以自定义 select 的 option | Function | (h, option, item) |


## type 种类
| 类型 | 默认值 |
| - | - |
| input | '' |
| select | null |
| checkbox | false |
| checkbox-group | [] |
| radio | false |
| radio-group | [] |
| date | 当前时间，new Date() |
| datetime | 当前时间，new Date() |
| daterange | ['', ''] |
| datetimerange | ['', ''] |
| switch | false |
| slider | 0 |

## 内置方法
| 名称 | 说明 | 返回类型 | 返回值 |
| - | - | - | - |
| reset | 还原表单 | - | - |
| getFormBykey | 根据 key 来获取这个 key 在 form 的值 | - | 打印出来你就知道了 |
| getForm | 获取整个 form 的值 | - | 打印出来你就知道了 |
| submit | 手动触发 submit 事件 | - | - |

## 事件
| 名称 | 说明 | 返回类型 | 返回值 |
| - | - | - | - |
| submit | 提交按钮的点击事件，监听这个事件，然后 console 出来，你就知道是啥了 | Object | (form, valid) |

## 更新日志
### 1.0.11

1. 修复 options、submitText、resetText、hasSubmitBtn、hasResetBtn 失效的原因

### 1.0.10

1. isShow 属性，可以使用方法了
2. 添加 clearable 属性，默认为 true

### 1.0.9

1. 添加 isShow 属性

### 1.0.8

1. 修改 tpye 为 switch 时 props 不生效

### 1.0.7

1. 修改 input 的 placeholder 需要添加在 attrs 里面
2. 添加 formList 的 render 函数

### 1.0.6

1. 修改 重置按钮 跟 提交按钮重复的问题

### 1.0.5

1. 添加 options 自定义组建自带 props 属性
2. 添加 hasSubmitBtn、hasResetBtn 自定义是否显示按钮属性
3. 添加 submitText、resetText 自定义按钮文本属性
4. 删除 autocomplete 属性


[1]: https://viewweiwu.github.io/iview-form/examples/dist/