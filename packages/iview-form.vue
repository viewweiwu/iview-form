<script>
const formatDate = (date, formatValue) => {
  if (!date) return ''
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
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
    return <i-form inline={this.inline} label-width={this['labelWidth']}>
      {this.renderFormList(h)}
      {
        !this.notCtrl && this.renderSubmit(h)
      }
    </i-form>
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
          default:
            if (typeof item.renderContent === 'function') {
              content = item.renderContent(h, item, this.form)
            }
            break
        }
        return <form-item>
          {this.renderTitle(h, item)}
          {content}
        </form-item>
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
      return <form-item>
        <i-button onClick={this.submit} type="primary">提交</i-button>
        <i-button onClick={this.reset} style="margin-left: 10px">重置</i-button>
      </form-item>
    },
    // 渲染 input
    renderInput(h, item) {
      let tag = {
        h,
        item,
        tagName: 'i-input',
        props: {
          clearable: true,
          ...(item.props || {})
        }
      }
      return this.generateTag(tag)
    },
    // 渲染 select
    renderSelect(h, item) {
      let tag = {
        h,
        item,
        tagName: 'i-select',
        props: {
          clearable: true,
          ...(item.props || {})
        },
        children: item.options.map(option => {
          return <i-option key={option.value} label={option.text} value={option.value}>
            {
              typeof item.renderOption === 'function'
                ? item.renderOption(h, option, item)
                : item.text
            }
          </i-option>
        })
      }
      return this.generateTag(tag)
    },
    // 渲染 单个checkbox
    renderCheckbox(h, item) {
      let tag = {
        h,
        item,
        tagName: 'checkbox',
        children: item.text
      }
      return this.generateTag(tag)
    },
    // 渲染 checkbox group
    renderCheckboxGroup(h, item) {
      let tag = {
        h,
        item,
        tagName: 'checkbox-group',
        children: item.options.map(option => {
          return <checkbox label={option.value}>{option.text}</checkbox>
        })
      }
      return this.generateTag(tag)
    },
    // 渲染 datepicker
    renderDatePicker(h, item, formatValue) {
      let tag = {
        h,
        item,
        tagName: 'date-picker',
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
        tagName: 'date-picker',
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
        tagName: 'radio',
        children: item.text
      }
      return this.generateTag(tag)
    },
    // 渲染 radio group
    renderRadioGroup(h, item) {
      let tag = {
        h,
        item,
        tagName: 'radio-group',
        children: item.options.map(option => {
          return <radio label={option.value}>{option.text}</radio>
        })
      }
      return this.generateTag(tag)
    },
    renderSwitch(h, item) {
      let tag = {
        h,
        item,
        tagName: 'i-switch'
      }
      return this.generateTag(tag)
    },
    // 生产 tag
    generateTag({h, item, tagName, props, children, formatValue}) {
      return h(tagName, {
        props: {
          value: this.form[item.key],
          ...props
        },
        on: {
          input: (value) => {
            value = this.formatDateValue(value, item, formatValue)
            this.form[item.key] = value
            this.emitInput(value, item)
          }
        }
      }, children)
    },
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
      this.$emit('submit', this.getForm())
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