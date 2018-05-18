import iViewForm from './iview-form'

const install = (Vue) => {
  Vue.component(iViewForm.name, iViewForm)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default iViewForm