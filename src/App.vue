<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App',
    metaInfo() {
        return {
            title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
}
</script>
<style>
.el-tabs__item.is-active{
  color:#005657 !important;
}
.el-tabs__active-bar{
  background-color:#005657 !important;
}
.el-table .descending .sort-caret.descending{
  border-top-color: #005657 !important;
}
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: #005657 !important;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #005657 !important;
  border-color: #005657 !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #005657!important;
  border-color: #005657!important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #005657!important;
}
</style>
