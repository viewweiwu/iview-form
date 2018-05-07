export default `
<template>
  <div>
    <iViewForm
      enterSubmit
      @submit="onSubmit"
      :grid="2"
      :lib="lib"
      :label-width="40"
      contentWidth="auto"
      :formList="formList">
    </iViewForm>
    <iViewForm
      enterSubmit
      @submit="onSubmit"
      :grid="[3, 1, 2]"
      :lib="lib"
      :label-width="40"
      contentWidth="auto"
      :formList="formList">
    </iViewForm>
    <iViewForm
      enterSubmit
      @submit="onSubmit"
      :grid="[[6, 12, 6], [12, 12], [24]]"
      :lib="lib"
      :label-width="40"
      contentWidth="auto"
      :formList="formList">
    </iViewForm>
  </div>
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
        title: 'a',
        type: 'input',
        key: 'a'
      }, {
        title: 'b',
        type: 'input',
        key: 'b'
      }, {
        title: 'c',
        type: 'input',
        key: 'c'
      }, {
        title: 'd',
        type: 'slider',
        key: 'd'
      }, {
        title: 'e',
        type: 'slider',
        key: 'e'
      }, {
        title: 'f',
        type: 'input',
        key: 'f'
      }]
    }
  },
  methods: {
    onSubmit(form) {
      console.log(form)
    }
  }
}
</script>
`