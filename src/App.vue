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
.el-tabs__item:hover {
  color: #005657!important;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #005657!important;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #005657!important;
  background: #005657!important;
}
.el-transfer-panel__item:hover {
  color: #005657!important;
}
.el-button--primary.is-disabled, .el-button--primary.is-disabled:hover, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:active {
  color: #FFFFFF;
  background-color: #005657!important;
  border-color: #005657!important;
}
.el-button--primary {
  color: #FFFFFF;
  background-color: #005657!important;
  border-color: #005657!important;
}
.el-button:hover, .el-button:focus {
  color: #000!important;
  border-color: none !important;
  background-color: #f7f8f9 !important;
}
.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus {
  background-color: #005657;
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #005657;
    color: #FFFFFF;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #005657;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #fff;
}
</style>
