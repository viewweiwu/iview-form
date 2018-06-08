<script>
const getPrefix = (tag, lib) => {
  let iviewMap = {
    'form': 'i-form',
    'form-item': 'form-item',
    'input': 'i-input',
    'select': 'i-select',
    'option': 'i-option',
    'checkbox': 'checkbox',
    'checkbox-group': 'checkbox-group',
    'date-picker': 'date-picker',
    'radio': 'radio',
    'radio-group': 'radio-group',
    'switch': 'i-switch',
    'slider': 'slider',
    'button': 'i-button',
    'row': 'row',
    'col': 'i-col',
    'input-number': 'input-number'
  }
  let elementMap = {
    'form': 'el-form',
    'form-item': 'el-form-item',
    'input': 'el-input',
    'select': 'el-select',
    'option': 'el-option',
    'checkbox': 'el-checkbox',
    'checkbox-group': 'el-checkbox-group',
    'date-picker': 'el-date-picker',
    'radio': 'el-radio',
    'radio-group': 'el-radio-group',
    'switch': 'el-switch',
    'slider': 'el-slider',
    'button': 'el-button',
    'row': 'el-row',
    'col': 'el-col',
    'input-number': 'el-input-number'
  }

  return lib === 'iview' ? iviewMap[tag] : elementMap[tag]
}

export default {
  name: 'iview-form',
  props: {
    // 是否启用 grid 布局
    grid: {
      type: [Array, Number]
    },
    // formItem 项
    formList: {
      type: Array,
      default: () => []
    },
    // 是否显示整个控制按钮
    notCtrl: {
      type: Boolean,
      default: false
    },
    // 是否开启 input 标签默认
    enterSubmit: {
      type: Boolean,
      default: false
    },
    // 默认 ui 库
    lib: {
      type: String,
      default: 'iview'
    },
    // 是否全局 disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // 默认标签宽度
    'label-width': {
      type: Number,
      default: 100
    },
    // 默认内容宽度
    'content-width': {
      type: [Number, String],
      default: 240
    },
    // submit 按钮文本
    submitText: {
      type: String,
      default: '提交'
    },
    // 重置按钮文本
    resetText: {
      type: String,
      default: '重置'
    },
    // 是否拥有 提交 按钮
    hasSubmitBtn: {
      type: Boolean,
      default: true
    },
    // 是否拥有 重置 按钮
    hasResetBtn: {
      type: Boolean,
      default: true
    },
    // 原生 form 标签上的 props
    options: {
      type: Object
    },
    // 开启全局 clearable
    clearable: {
      type: Boolean,
      default: true
    },
    // 文本框默认字符个数
    maxlength: {
      type: [Number, String],
      default: 20
    },
    // 多行文本框默认字符个数
    textareaMaxlength: {
      type: Number,
      default: 256
    }
  },
  data() {
    return {
      form: this.initForm()
    }
  },
  render(h) {
    return h(getPrefix('form', this.lib), {
      props: {
        model: this.form,
        rules: this.rules,
        'label-width': this.lib === 'iview' ? this['labelWidth'] : this['labelWidth'] + 'px',
        ...this.options
      },
      ref: 'form',
      nativeOn: {
        submit(e) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }, [
      this.$slots.prepend,
      this.renderFormList(h),
      !this.notCtrl && this.renderSubmit(h),
      this.$slots.default
    ])
  },
  computed: {
    rules() {
      let rules = {}
      this.formList.forEach(item => {
        if (item.rule !== undefined) {
          rules[item.key] = item.rule
        }
      })
      return rules
    },
    gridNum() {
      return this.grid
    }
  },
  methods: {
    initForm() {
      let form = {}
      let map = {
        'input': '',
        'select': null,
        'checkbox': false,
        'checkbox-group': [],
        'date': new Date(),
        'datetime': new Date(),
        'daterange': [],
        'datetimerange': [],
        'radio': false,
        'radio-group': '',
        'slider': 0,
        'switch': false,
        'input-number': 0
      }
      this.formList.forEach(item => {
        let defaultValue = ''
        defaultValue = item.defaultValue !== undefined ? item.defaultValue : map[item.type]
        if (item.key) {
          form[item.key] = defaultValue
        }
      })
      return form
    },
    renderFormList(h) {
      let list = []
      let grid = this.grid
      // 处理 grid 为不同值时
      if (typeof grid === 'number') {
        list = this.getFormListByNumber(h)
      } else if (Array.isArray(grid)) {
        if (grid.every(item => !Array.isArray(item))) {
          list = this.getFormListByArray(h)
        } else {
          list = this.getFormListByGrid(h)
        }
      } else {
        list = this.getFormList(h)
      }
      return list
    },
    getFormList(h) {
      return this.formList.map(item => {
        return this.getFormItem(h, item, this.getContent(h, item))
      })
    },
    // 当 grid 为数字时
    getFormListByNumber(h) {
      let list = []
      // 过滤 grid
      let grid = ~~Math.abs(this.grid)
      if (grid < 1) grid = 1
      for (let i = 0; i < this.formList.length; i += grid) {
        let childrenList = []
        // 获取当前分成几列 grid 为 number 时
        for (let j = 0; j < grid && i + j < this.formList.length; j++) {
          let children = this.formList[i + j]
          if (!children) break
          let childrenItem = this.getFormItem(h, children, this.getContent(h, children))
          let childrenParts = h(getPrefix('col', this.lib), {
            props: {
              span: 24 / grid
            }
          }, [
            childrenItem
          ])
          childrenList.push(childrenParts)
        }
        let row = h(getPrefix('row', this.lib), childrenList)
        list.push(row)
      }
      return list
    },
    // 当 grid 为一维数组时
    getFormListByArray(h) {
      let list = []
      let gridIndex = 0
      for (let i = 0; i < this.formList.length;) {
        let childrenList = []
        let grid = this.grid[gridIndex]
        for (let j = 0; j < grid; j++) {
          let children = this.formList[i + j]
          if (!children) break
          let childrenItem = this.getFormItem(h, children, this.getContent(h, children))
          let childrenParts = h(getPrefix('col', this.lib), {
            props: {
              span: 24 / grid
            }
          }, [
            childrenItem
          ])
          childrenList.push(childrenParts)
        }
        let row = h(getPrefix('row', this.lib), childrenList)
        list.push(row)
        gridIndex += 1
        i += grid
      }
      return list
    },
    // 当 grid 为二维数组
    getFormListByGrid(h) {
      let list = []
      let gridIndex = 0
      for (let i = 0; i < this.formList.length;) {
        let childrenList = []
        let grid = this.grid[gridIndex]
        if (!grid) grid = [1]
        for (let j = 0; j < grid.length; j++) {
          let children = this.formList[i + j]
          if (!children) break
          let childrenItem = this.getFormItem(h, children, this.getContent(h, children))
          let childrenParts = h(getPrefix('col', this.lib), {
            props: {
              span: grid[j]
            }
          }, [
            childrenItem
          ])
          childrenList.push(childrenParts)
        }
        let row = h(getPrefix('row', this.lib), childrenList)
        list.push(row)
        gridIndex += 1
        i += grid.length
      }
      return list
    },
    getContent(h, item) {
      let content
      switch (item.type) {
        case 'input':
          content = this.renderInput(h, item)
          break
        case 'select':
          content = this.renderSelect(h, item)
          break
        case 'checkbox':
          content = this.renderCheckbox(h, item)
          break
        case 'checkbox-group':
          content = this.renderCheckboxGroup(h, item)
          break
        case 'date':
          content = this.renderDatePicker(h, item)
          break
        case 'datetime':
          content = this.renderDatePicker(h, item)
          break
        case 'daterange':
          content = this.renderDateRange(h, item)
          break
        case 'datetimerange':
          content = this.renderDateRange(h, item)
          break
        case 'radio':
          content = this.renderRadio(h, item)
          break
        case 'radio-group':
          content = this.renderRadioGroup(h, item)
          break
        case 'switch':
          content = this.renderSwitch(h, item)
          break
        case 'slider':
          content = this.renderSlider(h, item)
          break
        case 'input-number':
          content = this.renderInputNumber(h, item)
          break
        default:
          if (typeof item.renderContent === 'function') {
            content = item.renderContent(h, item, this.form)
          }
          break
      }
      return content
    },
    getFormItem(h, item, content) {
      if (item.isShow === false) return
      else if (typeof item.isShow === 'function') {
        if (item.isShow(this.form, item) === false) {
          return
        }
      }
      if (typeof item.render === 'function') {
        return item.render(h, item)
      } else {
        return h(getPrefix('form-item', this.lib), {
          props: {
            prop: item.key
          }
        }, [
          this.renderTitle(h, item),
          content
        ])
      }
    },
    // 渲染 title
    renderTitle(h, item) {
      return <span slot="label">
        {
          item.required === true
            ? <span style="color: font">*</span>
            : ''
        }
        {
          typeof item.renderTitle === 'function'
            ? <span>{item.renderTitle(h, item, this.getFormBykey(item.key))}</span>
            : <span>{item.title}</span>
        }
      </span>
    },
    // 渲染提交 按钮
    renderSubmit(h) {
      let btns = []
      if (this.hasSubmitBtn) {
        btns.push(h(getPrefix('button', this.lib), {
          props: {
            type: 'primary'
          },
          on: {
            click: this.submit
          }
        }, this.submitText))
      }
      if (this.hasResetBtn) {
        btns.push(h(getPrefix('button', this.lib), {
          style: {
            'margin-left': '10px'
          },
          on: {
            click: this.reset
          }
        }, this.resetText))
      }

      return h(getPrefix('form-item', this.lib), btns)
    },
    // 渲染 input
    renderInput(h, item) {
      let props = item.props || {}
      let attrs = item.attrs || {}
      // 让 element-ui 在 props 里也可以设置 placeholder
      if (props.placeholder) {
        attrs.placeholder = props.placeholder
      }

      // 让 element-ui 在 props 里也可以设置 maxlength
      if (props.type !== 'textarea') {
        attrs.maxlength = props.maxlength || this.maxlength
      } else {
        // textarea 长度
        attrs.maxlength = props.maxlength || this.textareaMaxlength
      }

      item.attrs = attrs

      let tag = {
        h,
        item,
        tagName: getPrefix('input', this.lib),
        props: {
          clearable: this.clearable,
          ...props
        },
        nativeOn: {
          keydown: (e) => {
            if (e.keyCode === 13 && this.enterSubmit && props.type !== 'textarea') {
              this.submit()
            }
          }
        }
      }
      return this.generateTag(tag)
    },
    // 渲染 select
    renderSelect(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('select', this.lib),
        props: {
          clearable: this.clearable,
          ...(item.props || {})
        },
        children: item.options.map(option => {
          return h(getPrefix('option', this.lib), {
            props: {
              label: option.text,
              value: option.value
            }
          }, [
            typeof item.renderOption === 'function'
              ? item.renderOption(h, option, item)
              : item.text
          ])
        })
      }
      return this.generateTag(tag)
    },
    // 渲染 单个checkbox
    renderCheckbox(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('checkbox', this.lib),
        props: item.props || {},
        children: item.text
      }
      return this.generateTag(tag)
    },
    // 渲染 checkbox group
    renderCheckboxGroup(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('checkbox-group', this.lib),
        props: item.props || {},
        children: item.options.map(option => {
          return h(getPrefix('checkbox', this.lib), {
            props: {
              label: option.value
            }
          }, option.text)
        })
      }
      return this.generateTag(tag)
    },
    // 渲染 datepicker
    renderDatePicker(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('date-picker', this.lib),
        props: {
          clearable: this.clearable,
          type: item.type,
          ...(item.props || {})
        }
      }
      return this.generateTag(tag)
    },
    // 渲染范围的 daterange
    renderDateRange(h, item) {
      // 处理 datetimerange 可能宽度不够的问题
      if (item.type === 'datetimerange') {
        item.width = item.width || 360
      }
      let tag = {
        h,
        item,
        tagName: getPrefix('date-picker', this.lib),
        props: {
          clearable: this.clearable,
          type: item.type,
          ...(item.props || {})
        }
      }
      return this.generateTag(tag)
    },
    // 渲染 radio
    renderRadio(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('radio', this.lib),
        props: item.props || {},
        children: item.text
      }
      return this.generateTag(tag)
    },
    // 渲染 radio group
    renderRadioGroup(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('radio-group', this.lib),
        props: item.props || {},
        children: item.options.map(option => {
          return h(getPrefix('radio', this.lib), {
            props: {
              label: option.value
            }
          }, option.text)
        })
      }
      return this.generateTag(tag)
    },
    // 渲染 switch
    renderSwitch(h, item) {
      item.width = item.width || 60
      let tag = {
        h,
        item,
        tagName: getPrefix('switch', this.lib),
        props: item.props || {}
      }
      return this.generateTag(tag)
    },
    // 渲染 slider
    renderSlider(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('slider', this.lib),
        props: item.props || {}
      }
      return this.generateTag(tag)
    },
    // 渲染 slider
    renderInputNumber(h, item) {
      item.width = item.width || 150
      let tag = {
        h,
        item,
        tagName: getPrefix('input-number', this.lib),
        props: item.props || {}
      }
      return this.generateTag(tag)
    },
    // 生产 tag
    generateTag({h, item, tagName, props, children, on = {}, nativeOn = {}}) {
      return h(tagName, {
        props: {
          value: this.form[item.key],
          min: 0,
          max: 9999999,
          ...props,
          disabled: this.disabled || item.disabled
        },
        attrs: item.attrs || {},
        style: {
          width: item.type === 'switch' ? null : (item.width || this['contentWidth']) + 'px'
        },
        on: {
          input: (value) => {
            value = this.formatDateValue(value, item)
            this.form[item.key] = value
            this.emitInput(value, item)
          },
          ...on
        },
        nativeOn
      }, children)
    },
    // 格式化日期返回，避免 null 的出现
    formatDateValue(value, item) {
      switch (item.type) {
        case 'date':
        case 'datetitme':
          if (!value) {
            value = ''
          }
          break
        case 'daterange':
        case 'datetimerange':
          if (!value) {
            value = ['', '']
          }
          break
      }
      return value
    },
    // 触发 item onInput 事件
    emitInput(value, item) {
      if (typeof item.onInput === 'function') {
        item.onInput(value, item, this.form)
      }
    },
    // 提交事件
    submit() {
      this.$refs.form.validate(valid => {
        this.$emit('submit', this.getForm(), valid)
      })
    },
    // 清空 form 表单
    reset() {
      this.form = this.initForm()
    },
    // 根据 key 获取 value
    getFormBykey(key) {
      return this.form[key]
    },
    // 获取整个 form
    getForm() {
      return {
        ...this.form
      }
    },
    // 设值
    setForm(form) {
      for (let key in form) {
        this.form[key] = form[key]
      }
    }
  }
}
</script>