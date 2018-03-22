<script>
const formatDate = (date, formatValue) => {
  if (!date) return ''
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(formatValue)) {
    formatValue = formatValue.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(formatValue)) {
      formatValue = formatValue.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return formatValue
}

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
    'slider': 'slider'
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
    'slider': 'el-slider'
  }

  return lib === 'iview' ? iviewMap[tag] : elementMap[tag]
}

export default {
  name: 'iview-form',
  props: {
    formList: {
      type: Array,
      default: () => []
    },
    notCtrl: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    enterSubmit: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    lib: {
      type: String,
      default: 'iview'
    },
    'label-width': {
      type: Number,
      default: 100
    },
    'formatValue': {
      type: String,
      default: 'yyyy-MM-dd'
    },
    'datetimeFormatValue': {
      type: String,
      default: 'yyyy-MM-dd hh:mm:ss'
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
        inline: this.inline,
        autocomplete: this.autocomplete,
        'label-width': this.lib === 'iview' ? this['labelWidth'] : this['labelWidth'] + 'px'
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
        'date': formatDate(new Date(), this.formatValue),
        'datetime': formatDate(new Date(), this.datetimeFormatValue),
        'daterange': [],
        'datetimerange': [],
        'radio': false,
        'radio-group': '',
        'switch': false
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
      return this.formList.map(item => {
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
            content = this.renderDatePicker(h, item, item.formatValue || this.formatValue)
            break
          case 'datetime':
            content = this.renderDatePicker(h, item, item.formatValue || this.datetimeFormatValue)
            break
          case 'daterange':
            content = this.renderDateRange(h, item, item.formatValue || this.formatValue)
            break
          case 'datetimerange':
            content = this.renderDateRange(h, item, item.formatValue || this.datetimeFormatValue)
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
          default:
            if (typeof item.renderContent === 'function') {
              content = item.renderContent(h, item, this.form)
            }
            break
        }
        return h(getPrefix('form-item', this.lib), {
          props: {
            prop: item.key
          }
        }, [
          this.renderTitle(h, item),
          content
        ])
      })
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
      if (this.lib === 'iview') {
        return <form-item>
          <i-button onClick={this.submit} type="primary">提交</i-button>
          <i-button onClick={this.reset} style="margin-left: 10px">重置</i-button>
        </form-item>
      } else {
        return <el-form-item>
          <el-button onClick={this.submit} type="primary">提交</el-button>
          <el-button onClick={this.reset} style="margin-left: 10px">重置</el-button>
        </el-form-item>
      }
    },
    // 渲染 input
    renderInput(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('input', this.lib),
        props: {
          clearable: true,
          ...(item.props || {})
        },
        nativeOn: {
          keydown: (e) => {
            if (e.keyCode === 13 && this.enterSubmit) {
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
          clearable: true,
          ...(item.props || {})
        },
        children: item.options.map(option => {
          return h(getPrefix('option', this.lib),{
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
    renderDatePicker(h, item, formatValue) {
      let tag = {
        h,
        item,
        tagName: getPrefix('date-picker', this.lib),
        formatValue: formatValue,
        props: {
          clearable: true,
          type: 'date',
          ...(item.props || {})
        }
      }
      return this.generateTag(tag)
    },
    // 渲染范围的 daterange
    renderDateRange(h, item, formatValue) {
      let tag = {
        h,
        item,
        tagName: getPrefix('date-picker', this.lib),
        formatValue: formatValue,
        props: {
          clearable: true,
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
        tagName: getPrefix('switch', this.lib)
      }
      return this.generateTag(tag)
    },
    // 渲染 slider
    renderSlider(h, item) {
      let tag = {
        h,
        item,
        tagName: getPrefix('slider', this.lib)
      }
      return this.generateTag(tag)
    },
    // 生产 tag
    generateTag({h, item, tagName, props, children, formatValue, on = {}, nativeOn = {}}) {
      return h(tagName, {
        props: {
          value: this.form[item.key],
          ...props,
          disabled: this.disabled || item.disabled
        },
        style: {
          width: item.width || 240 + 'px'
        },
        on: {
          input: (value) => {
            value = this.formatDateValue(value, item, formatValue)
            this.form[item.key] = value
            this.emitInput(value, item)
          },
          ...on
        },
        nativeOn
      }, children)
    },
    // 时间 format
    formatDateValue(value, item, formatValue) {
      switch (item.type) {
        case 'date':
        case 'datetime':
          value = formatDate(value, formatValue)
          break
        case 'daterange':
        case 'datetimerange':
          value = [formatDate(value[0], formatValue), formatDate(value[1], formatValue)]
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
    getForm() {
      return {
        ...this.form
      }
    }
  }
}
</script>