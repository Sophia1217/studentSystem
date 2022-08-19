<template>
  <div>
    <tea-search></tea-search>
    <tea-table :table_content="noticeList"></tea-table>
  </div>
</template>

<script>
import teaSearch from "./form/teaSearch.vue";
import teaTable from "./form/teaTable.vue";

import {
  classList,
  modifyClassName,
  getCollege,
  getLevel,
  getGrade,
  addClass,
  deleteEmptyClass,
} from "@/api/class/maintenanceClass"; // 引入班级列表查询、修改班级名称接口
export default {
  name: "instructor", //辅导员管理主界面
  components: {
    teaSearch,
    teaTable,
  },
  mounted() {
    this.getList();
    this.getOptions();
  },
  data() {
    return {
      noticeList: [],
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdm: "", // 培养单位
        pycc: "", // 培养层次
        ssnj: "", // 年级
        bjdm: "", // 班级编号
      },
    };
  },
  methods: {
    getList(data = {}) {
      // this.loading = true;
      var data = this.queryParams
      classList(data).then((response) => {
        // 获取班级列表数据
        if (response.errcode == "00") {
          this.noticeList = response.data.rows; // 根据状态码接收数据
          this.total = response.data.total; //总条数
          //  this.loading = false;
        }
        //  this.total = response.total;
        //  this.loading = false;
        console.log(this.noticeList);
      });
    },
    getOptions() {
      getCollege().then((response) => {
        // 获取培养单位列表数据
        this.collegeOptions = response.data.rows;
        //  this.loading = false;
      });
      getLevel().then((response) => {
        // 获取培养层次列表数据
        this.levelOptions = response.rows;
      });
      getGrade().then((response) => {
        // 获取年级列表数据
        this.gradeOptions = response.rows;
      });
    },
  },
};
</script>

<style scoped></style>
