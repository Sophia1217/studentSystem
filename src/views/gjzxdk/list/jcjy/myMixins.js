/*
 * @Author: luosheng
 * @Date: 2023-03-14 16:37:11
 * @LastEditTime: 2023-03-15 17:04:32
 * @LastEditors: ***
 * @Description: 
 * @FilePath: \studentsystem\src\views\gjzxdk\list\jcjy\myMixins.js
 */
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { getStreet } from "@/api/jccy/index";
import {
    getCityList,
  } from "@/api/assistantWork/homeSchool";
export default {
    data(){
        return{
          zzmmList:[],//政治面貌
          provinceList:[],//省
          cityList:[],//城市
          zonetList:[],//区
          streetList:[],//街道
          hyTypeList:[],//行业类别
          dkTypeList:[],//贷款类型
          yhmcList:[],//银行类别
        }
    },
    created() {
    },
    methods: {
        getCity(){
            getCityList({}).then((res) => {
                this.provinceList = res.data;
              });
        },
        getCity1(val){
            let data = { dm: val };
            getCityList(data).then((res) => {
                this.cityList = res.data;
              });
        },
        getCity2(val){
            let data = { dm: val };
            getCityList(data).then((res) => {
                this.zonetList = res.data;
              });
        },
        getCity3(val){
          let data = { dm: val };
          getStreet(data).then((res) => {
              this.streetList = res.data;
            });
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
  }
  
  {/* <template>
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
  复制代码 */}