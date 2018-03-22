export default `
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
      formList: [{
        title: 'date',
        type: 'date',
        formatValue: 'yyyy年MM月dd日', // 指定返回格式
        key: 'birthday'
      }, {
        title: 'datetime',
        type: 'datetime',
        key: 'datetime',
        props: {
          type: 'datetime',
          format: 'yyyy-MM-dd hh:mm' // 这里不填的话 自动有秒
        }
      }, {
        title: 'daterange',
        type: 'daterange',
        key: 'daterange'
      }, {
        title: 'datetimerange',
        type: 'datetimerange',
        key: 'datetimerange'
      }]
  },
  methods: {
    onSubmit(form) {
      console.log(form)
    }
  }
}
</script>
`