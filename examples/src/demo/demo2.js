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
        key: 'birthday'
      }, {
        title: 'datetime',
        type: 'datetime',
        key: 'datetime'
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