# iview-form

> 让 iview 和 element-ui 的 form 使用起来更加简单。

## 例子
[demo][1]

## 安装

### npm（推荐方式）

```bash
$ npm install iview-form
```

### script

```html
<script src="//cdn.jsdelivr.net/npm/iview-form@1.0.12/lib/iview-form.js"></script>
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

## 注意
    如果你是 script 标签引入的，那么所有的参数要用小写，并且单词用 - 链接。
    iViewForm => iview-form
    formList => form-list

## iview-form 参数

| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| grid | 网格，更多请看 demo | Number, Array | - |
| gutter | 当使用了 grid 属性时，设置此属性可以调整间距 | Number, Array | - |
| formList | 配置项（看下面 formList 参数） | Array | [] |
| notCtrl | 是否不显示 提交、重置 按钮 | Boolean | false |
| enterSubmit | 如果设定这个值为 true，那么 input 按 enter 键会触发 submit 事件 | Boolean | false |
| lib | 可选值（'iview', 'element'），如果指定为 element 那么组件会按照 element 来渲染 | String | 'iview' |
| label-width | 标签的宽度 | Number | 100 |
| content-width | 内容的宽度(支持 百分比 auto) | Number, String | 240 |
| options | iView 和 element-ui 原生 props ( :options="{size: 'small'}" ) | Object | {} |
| submitText | 提交按钮文本 | String | '提交' |
| resetText | 重置按钮文本 | String | '重置' |
| hasSubmitBtn | 是否显示提交按钮 | Boolean | true |
| hasResetBtn | 是否显示重置按钮 | Boolean | true |
| clearable | 控制是否显示清除 icon | Boolean | true |
| maxlength | 默认全局 input 的 maxlength | Boolean | 20 |
| textareaMaxlength | 默认全局 textarea 的 maxlength | Boolean | 256 |
| readonly | 如果设定这个值为 true，那么该表单下所有的表单元素都会是 read
| disabled | 如果设定这个值为 true，那么该表单下所有的表单元素都会被禁用 | Boolean | false |nly | Boolean | false |

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
| disabled | 禁用表单元素，优先级比标签上的低 | Boolean | false |
| readonly | 只读表单元素，优先级比标签上的低 | Boolean | false |
| settings | formItem 的标签属性，比如 style，class | Object | {} |


## type 种类
| 类型 | 默认值 | 其它 |
| - | - | - |
| input | '' | 默认 maxlength: 20, textarea: 256 |
| input-number | 0 | 默认 min: 0, max: 9999999 |
| select | null | |
| checkbox | false | |
| checkbox-group | [] | |
| radio | false | 没有意义，不建议使用 |
| radio-group | [] | |
| date | 当前时间，new Date() | |
| datetime | 当前时间，new Date() | |
| daterange | ['', ''] | |
| datetimerange | ['', ''] | |
| time | '' | |
| switch | false | |
| slider | 0 | |

## 内置方法
| 名称 | 说明 | 返回类型 | 返回值 |
| - | - | - | - |
| reset | 还原表单 | - | - |
| getFormBykey | 根据 key 来获取这个 key 在 form 的值 | - | 打印出来你就知道了 |
| getForm | 获取 form 的值 | - | 打印出来你就知道了 |
| setForm | 设置 form 的值，传入 key: value 格式的对象，例如 setForm({ key1: 'xxxx' }) | - | - |
| submit | 手动触发 submit 事件 | - | - |

## 事件
| 名称 | 说明 | 返回类型 | 返回值 |
| - | - | - | - |
| submit | 提交按钮的点击事件，监听这个事件，然后 console 出来，你就知道是啥了 | Object | (form, valid) |

## 更新日志

### 1.1.5

1. 添加标签的 gutter 属性
2. content-width 支持 auto 100% 值

### 1.1.4

1. 修改 1.1.3 失效问题

### 1.1.3

1. 添加 item 的 setting 属性，可以在 formItem 上添加样式了

### 1.1.2

1. 添加全局和单体 readonly 属性

### 1.1.1

1. 添加 type: time 类型
2. 修改 reset 方法不能清空验证

### 1.1.0

1. 添加 type: input-number 类型
2. 添加 maxlength 和 textareaMaxlength 属性，分别作用于 input 和 textarea 上，默认值分别是 20 、256
3. 添加 setForm 方法
4. 修改 datetimerange 的默认宽度为 360
5. 修改 textarea 如果设置了 enterSubmit，不再触发 submit 事件 
6. 修改 element-ui 的 placeholder 现在可以写在 props 里 

### 1.0.12

1. 可以在网页里面用 script 标签引入啦！

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

## LICENSE
MIT


[1]: https://viewweiwu.github.io/iview-form/examples/dist/