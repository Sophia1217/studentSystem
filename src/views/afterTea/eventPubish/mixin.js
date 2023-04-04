/*
 * @Author: qingtian
 * @Date: 2023-03-28 14:19:16
 * @LastEditTime: 2023-04-03 17:09:47
 * @LastEditors: ***
 * @Description:
 * @FilePath: \studentsystem\src\views\afterTea\eventPubish\mixin.js
 */
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

import { getCollege } from "@/api/class/maintenanceClass";

export default {
  data() {
    return {
      allDwh: [],
      lbLsit: [
        {
          dm: "教授午餐会",
          mc: "教授午餐会",
        },
        { dm: "教授下午茶", mc: "教授下午茶" },
      ],
    };
  },
  created() {},
  methods: {
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmhylbm":
            this.hyTypeList = res.data; //行业类别
            break;
          case "dmgjzxdk":
            this.dkTypeList = res.data; //贷款类型
            break;
          case "dmzudkyhm":
            this.yhmcList = res.data; //银行
            break;
          case "dmzzmmm":
            this.zzmmList = res.data; //政治面貌
            break;
        }
      });
    },
  },
};

{
  /* <template>
    <div>
      <div>组件1里的num：{{num}}</div>
    </div>
  </template>
  ​
  <script>
  import myMixins from "@/mixins/myMinixn";
  export default {
    mixins: [myMixins],
    computed: {},
    created(){
      this.num++
    },
    methods: {},
  };
  </script>
  <style>
  </style>
  复制代码 */
}
