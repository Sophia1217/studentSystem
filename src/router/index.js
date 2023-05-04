import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect"),
      },
    ],
  },
  // {
  //   path: "/login",
  //   component: () => import("@/views/login"),
  //   hidden: true,
  // },
  // {
  //   path: "/register",
  //   component: () => import("@/views/register"),
  //   hidden: true,
  // },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  {
    path: "/selectRole",
    component: () => import("@/views/homepage/selectRole"),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
    
  },
  {
    path: "/studentHomePage",
    component: () => import("@/views/homepage/studentAngle/studentHomePage.vue"),
    name: "studentHomePage",
    hidden: true,
  },

  
  
  // {
  //   path: '/user',
  //   component: Layout,
  //   hidden: true,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'profile',
  //       component: () => import('@/views/system/user/profile/index'),
  //       name: 'Profile',
  //       meta: { title: '个人中心', icon: 'user' }
  //     }
  //   ]
  // },
//   {
//     path: "/student",
//     meta: { title: "学生信息管理", icon: "monitor" },
//     component: Layout,
//     hidden: false,
//     children: [
//       {
//         path: "absentee",
//         component: resolve => require(["@/views/student/absentee/index"], resolve),
//         name: "absentee",
//         meta: { title: "在籍学生信息", icon: "" },
//       },
//       {
//         path: "studetails",
//         hidden: true,
//         component: resolve => require(["@/views/student/absentee/manStudent/details/index"], resolve),
//         name: "studetails",
//         meta: { title: "学生信息", icon: "" }
//       },
//       {
//         path: "informationStu",
//         name: "informationStu",
//         hidden: false,
//         meta: { title: "学生信息修改", icon: "" },
//         component: ParentView,//() => import('../index.vue'),
//         children: [
//           {
//             path: "forcedEdit",
//             component: resolve => require(["@/views/student/informationStu/forcedEdit/index"], resolve),
//             name: "forcedEdit",
//             meta: { title: "强制修改名单设置", icon: "" }
//           },
//           {
//             path: "auditStu",
//             component: resolve => require(["@/views/student/informationStu/auditStu/index"], resolve),
//             name: "auditStu",
//             meta: {
//               title: "学生信息修改审核",
//               icon: ""
//             }
//           },
//           {
//             path: "auditSteps",
//             hidden: true,
//             component: resolve => require(["@/views/student/informationStu/auditStu/processed/auditSteips/index"], resolve),
//             name: "auditSteps",
//             meta: {
//               title: "审核",
//               icon: ""
//             }
//           },
//           {
//             path: "parameterStu",
//             component: resolve => require(["@/views/student/informationStu/parameterStu/index"], resolve),
//             name: "parameterStu",
//             meta: {
//               title: "学生信息修改参数",
//               icon: ""
//             }
//           },
//           {
//             path: "fieldSettings",
//             component: resolve => require(["@/views/student/informationStu/fieldSettings/index"], resolve),
//             name: "fieldSettings",
//             meta: {
//               title: "信息修改字段设置",
//               icon: ""
//             }
//           },
//         ]
//       },
//       {
//         path: "stuChange",
//         component: resolve => require(["@/views/student/stuChange/index"], resolve),
//         name: "stuChange",
//         meta: { title: "学籍异动情况", icon: "" },
//       },
//       {
//         path: "stuChangeDetail",
//         hidden: true,
//         component: resolve => require(["@/views/student/stuChange/detail/index"], resolve),
//         name: "stuChangeDetail",
//         meta: { title: "学籍异动情况详情", icon: "" },
//       },
//       {
//         path: "graduate",
//         component: resolve => require(["@/views/student/graduate/index"], resolve),
//         name: "graduate",
//         meta: { title: "毕业学生信息", icon: "" },
//       },
//       {
//         path: "graduateDetail",
//         hidden: true,
//         component: resolve => require(["@/views/student/graduate/detail/index"], resolve),
//         name: "graduateDetail",
//         meta: { title: "毕业学生信息详情", icon: "" },
//       },
//     ]
//   },
//   {
//     path: "/politicalwork",
//     meta: { title: "政工队伍管理", icon: "monitor" },
//     component: Layout,
//     hidden: false,
//     children: [
//       {
//         path: "basicinfo",
//         component: resolve => require(["@/views/politicalwork/basicInfo/index"], resolve),
//         name: "basicinfo",
//         meta: {
//           title: "政工干部基本信息",
//           icon: ""
//         }
//       },
//       {
//         path: "detailinfo",
//         hidden: true,
//         component: resolve => require(["@/views/politicalwork/basicInfo/detailInfo/index"], resolve),
//         name: "detailinfo",
//         meta: { title: "详情", icon: "" }
//       },
//       {
//         path: "assistantappoint",
//         component: resolve => require(["@/views/politicalwork/assistantappoint/index"], resolve),
//         name: "assistantappoint",
//         meta: {
//           title: "辅导员任命",
//           icon: ""
//         }
//       },
//       {
//         path: "teacherappoint",
//         component: resolve => require(["@/views/politicalwork/teacherappoint/index"], resolve),
//         name: "teacherappoint",
//         meta: {
//           title: "班主任任命",
//           icon: ""
//         }
//       },
//       {
//         path: "infoEdit",
//         component: resolve => require(["@/views/politicalwork/infoEdit/index"], resolve),
//         name: "infoEdit",
//         meta: {
//           title: "信息修改字段设置",
//           icon: ""
//         }
//       }
//     ]
//   },
//   {
//     path: "/class",
//     meta: { title: "班级管理", icon: "monitor" },
//     component: Layout,
//     hidden: false,
//     children: [
//       {
//         name: "class_maintenance",
//         path: "maintenanceClass",
//         component: (resolve) =>
//           require(["@/views/class/maintenanceClass/index"], resolve),
//         meta: {
//           title: "班级维护",
//           icon: "",
//         },
//       },
//       {
//         name: "record",
//         path: "record",
//         hidden: true,
//         meta: { title: "任职记录", icon: "" },
//         component: () => import("@/views/class/headerTeacher/record"),
//       },

//       {
//         path: "divisionclass",
//         name: "divisionclass",
//         hidden: false,
//         meta: { title: "分班管理", icon: "" },
//         component: () => import("@/views/class/divisionclass/index"),
//       },
//       {
//         path: "operateClass",
//         name: "operateClass",
//         hidden: true,
//         component: () =>
//           import("@/views/class/divisionclass/subComponents/operateClass.vue"),
//         meta: { title: "分班管理操作" },
//       },
//       {
//         path: "headerTeacher",
//         name: "headerTeacher",
//         hidden: false,
//         meta: { title: "班主任管理", icon: "" },
//         component: () => import("@/views/class/headerTeacher/index"),
//       },
//       {
//         name: "LeadRecord",
//         path: "leadRecord",
//         hidden: true,
//         meta: { title: "任职记录", icon: "" },
//         component: () => import("@/views/class/classleader/leadRecord"),
//       },
//       {
//         path: 'classTeacher',
//         name: 'classTeacher',
//         hidden: true,
//         meta: { title: "分配班主任", icon: "" },
//         component: () => import('@/views/class/headerTeacher/classTeacher')
//       },
//       {
//         path: "instructor",
//         name: "instructor",
//         hidden: false,
//         meta: { title: "辅导员管理", icon: "" },
//         component: () => import("@/views/class/instructor/index"),
//       },
//       {
//         path: "empRecord",
//         name: "empRecord",
//         hidden: true,
//         meta: { title: "任职记录", icon: "" },
//         component: () => import("@/views/class/instructor/subComponents/empRecord.vue"),
//       },
//       {
//         path: "assignTea",
//         name: "assignTea",
//         hidden: true,
//         meta: { title: "分配辅导员", icon: "" },
//         component: () => import("@/views/class/instructor/subComponents/assignTea.vue"),
//       },
//       {
//         path: "classleader",
//         name: "classleaderu",
//         hidden: false,
//         meta: { title: "班干部管理", icon: "" },
//         component: () => import("@/views/class/classleader/index"),
//       },
//       {
//         path: "leaderAssign",
//         name: "leaderAssign",
//         hidden: true,
//         meta: { title: "班干部任命", icon: "" },
//         component: () => import("@/views/class/classleader/subComponents/leaderAssign.vue"),
//       },
//     ],
//   },
//   {
//     path: "/systems",
//     meta: { title: "系统管理", icon: "monitor" },
//     component: Layout,
//     hidden: false,
//     children: [
//       {
//         name: "role",
//         path: "role",
//         component: (resolve) => require(["@/views/systemMan/role/index"], resolve),
//         meta: { title: "角色管理", icon: "", },
//       },
//       {
//         name: "addRole",
//         path: "addRole",
//         hidden: true,
//         component: (resolve) => require(["@/views/systemMan/role/addRole"], resolve),
//         meta: { title: "角色信息", icon: "", },
//       },
//       {
//         name: "user",
//         path: "user",
//         component: (resolve) => require(["@/views/systemMan/user/index"], resolve),
//         meta: { title: "用户管理", icon: "", },
//       },
//       {
//         name: "dataPermis",
//         path: "dataPermis",
//         hidden: true,
//         component: (resolve) => require(["@/views/systemMan/user/permissions/index"], resolve),
//         meta: { title: "数据权限", icon: "", },
//       },
//       {
//         name: "dictionary",
//         path: "dictionary",
//         component: (resolve) => require(["@/views/systemMan/dictionary/index"], resolve),
//         meta: { title: "字典管理", icon: "", },
//       },
//       {
//         name: "dictionaryDetail",
//         path: "dictionaryDetail",
//         hidden: true,
//         component: (resolve) => require(["@/views/systemMan/dictionary/dictionaryDetail"], resolve),
//         meta: { title: "字典列表", icon: "", },
//       },
//     ]
//   }
];

// 班级管理内部路由
export const classRoutes = [];

export const stuRoutes = [
        // {
        //     "id":0,
        //     "modId":"00",
        //     "name":"studentHomePage",
        //     "path":"/studentHomePage",
        //     "title":"学生首页",
        //     "component":"homepage/studentAngle/studentHomePage.vue",
        //     "icon":"",
        //     "modPid":"-1",
        //     "isChild":"2",
        //     "sortId":4,
        //     "modStatus":"1",
        //     "hidden":true,
        //     "alwaysShow":true,
        //     "rem":"",
        //     "roleIds":null,
        //     "isChecked":null,
        //     "vueChecked":false,
        //     "meta":{
        //         "icon":"",
        //         "title":"学生首页"
        //     },
        //     "children":[

        //     ],
        //     "childrenId":null,
        //     "auth":"1"
        // },
        {
            "id":0,
            "modId":"5101",
            "name":"studetails",
            "path":"/student/studetails",
            "title":"学生信息",
            "component":"student/absentee/manStudent/details/index",
            "icon":"studetails",
            "modPid":"-1",
            "isChild":"2",
            "sortId":5,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"studetails",
                "title":"学生信息"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5105",
            "name":"xjydswStu",
            "path":"/xjydswStu",
            "title":"学籍异动事务",
            "component":"dailyBehavior/xjydsw/stu/index",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":5,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"学籍异动事务"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5102",
            "name":"filesDetail",
            "path":"/stuGrowFiles/filesDetail",
            "title":"学生档案详情",
            "component":"stuGrowFiles/GrowFiles/detail",
            "icon":"stuFilesDetail",
            "modPid":"-1",
            "isChild":"2",
            "sortId":6,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"stuFilesDetail",
                "title":"学生档案详情"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5106",
            "name":"dormStudent",
            "path":"/dormStudent",
            "title":"住宿申请",
            "component":"dailyBehavior/dormApply/dormStu",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":6,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"住宿申请"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5103",
            "name":"stuTravelDetails",
            "path":"/dailyBehavior/stuTravelDetails",
            "title":"学生乘车区间优惠",
            "component":"dailyBehavior/stuTravel/stu/index",
            "icon":"stuTravelDetails",
            "modPid":"-1",
            "isChild":"2",
            "sortId":7,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"stuTravelDetails",
                "title":"学生乘车区间优惠"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5107",
            "name":"lsknStu",
            "path":"/lsknStu",
            "title":"临时困难",
            "component":"dailyBehavior/lskn/stu/index",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":7,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"临时困难"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5104",
            "name":"docReplace",
            "path":"/dailyBehavior/docReplace",
            "title":"证件补办",
            "component":"dailyBehavior/docReplace/index",
            "icon":"docReplace",
            "modPid":"-1",
            "isChild":"2",
            "sortId":8,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"docReplace",
                "title":"证件补办"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5108",
            "name":"vocationStu",
            "path":"/vocationStu",
            "title":"日常请销假",
            "component":"dailyBehavior/vocation/stu/index",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":8,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"日常请销假"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5109",
            "name":"fdyTestStu",
            "path":"/fdyTest",
            "title":"辅导员测评",
            "component":"assistantTest/stuTest/stuView/testList",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":9,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"辅导员测评"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5110",
            "name":"fdyTestStutu",
            "path":"/fdyTestDetail",
            "title":"辅导员测评问卷",
            "component":"assistantTest/stuTest/stuView/testDetail",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":10,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"辅导员测评问卷"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5111",
            "name":"yearSumStuList",
            "path":"/yearSumStuList",
            "title":"学年小结",
            "component":"dailyBehavior/yearSum/stu",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":11,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"学年小结"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5112",
            "name":"awardsApply",
            "path":"/awardsApply",
            "title":"评奖评优",
            "component":"Awards/stu/index",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":12,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"评奖评优"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5113",
            "name":"familyTable",
            "path":"/familySituationTable",
            "title":"家庭情况调查表",
            "component":"familyDifficulties/stu/table",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":13,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"家庭情况调查表"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5114",
            "name":"difficultIdentity",
            "path":"/difficultIdentity",
            "title":"困难生认定",
            "component":"familyDifficulties/stu/apply",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":14,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"困难生认定"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5115",
            "name":"graduateIdentification",
            "path":"/graduateIdentification",
            "title":"毕业生鉴定表学生端",
            "component":"dailyBehavior/graduateIdt/stu/table",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":15,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"毕业生鉴定表学生端"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5116",
            "name":"awardSubsidyApply",
            "path":"/awardSubsidyApply",
            "title":"奖助申请",
            "component":"awardSubsidy/stu/index",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":16,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"奖助申请"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
        },
        {
            "id":0,
            "modId":"5117",
            "name":"awardSubsidyTable",
            "path":"/awardSubsidyTable",
            "title":"奖助申请表",
            "component":"awardSubsidy/stu/table",
            "icon":"",
            "modPid":"-1",
            "isChild":"2",
            "sortId":17,
            "modStatus":"1",
            "hidden":true,
            "alwaysShow":true,
            "rem":"",
            "roleIds":null,
            "isChecked":null,
            "vueChecked":false,
            "meta":{
                "icon":"",
                "title":"奖助申请表"
            },
            "children":[

            ],
            "childrenId":null,
            "auth":"1"
      },  
       {
          "id":0,
          "modId":"5118",
          "name":"qgzxApply",
          "path":"/qgzxApply",
          "title":"勤工助学",
          "component":"Thrift/stu/list",
          "icon":"",
          "modPid":"-1",
          "isChild":"2",
          "sortId":18,
          "modStatus":"1",
          "hidden":true,
          "alwaysShow":true,
          "rem":"",
          "roleIds":null,
          "isChecked":null,
          "vueChecked":false,
          "meta":{
              "icon":"",
              "title":"勤工助学"
          },
          "children":[

          ],
          "childrenId":null,
          "auth":"1"
      },
      {
        "id":0,
        "modId":"5119",
        "name":"qgzxDetail",
        "path":"/qgzxDetail",
        "title":"勤工助学详情",
        "component":"Thrift/stu/detail",
        "icon":"",
        "modPid":"-1",
        "isChild":"2",
        "sortId":19,
        "modStatus":"1",
        "hidden":true,
        "alwaysShow":true,
        "rem":"",
        "roleIds":null,
        "isChecked":null,
        "vueChecked":false,
        "meta":{
            "icon":"",
            "title":"勤工助学详情"
        },
        "children":[

        ],
        "childrenId":null,
        "auth":"1"
    },
    {
      "id":0,
      "modId":"5120",
      "name":"yjsHelpApply",
      "path":"/yjsHelpApply",
      "title":"研究生三助",
      "component":"yjsHelp/stu/list",
      "icon":"",
      "modPid":"-1",
      "isChild":"2",
      "sortId":20,
      "modStatus":"1",
      "hidden":true,
      "alwaysShow":true,
      "rem":"",
      "roleIds":null,
      "isChecked":null,
      "vueChecked":false,
      "meta":{
          "icon":"",
          "title":"研究生三助"
      },
      "children":[

      ],
      "childrenId":null,
      "auth":"1"
    },
    {
    "id":0,
    "modId":"5121",
    "name":"yjsHelpDetail",
    "path":"/yjsHelpDetail",
    "title":"研究生三助详情",
    "component":"yjsHelp/stu/detail",
    "icon":"",
    "modPid":"-1",
    "isChild":"2",
    "sortId":21,
    "modStatus":"1",
    "hidden":true,
    "alwaysShow":true,
    "rem":"",
    "roleIds":null,
    "isChecked":null,
    "vueChecked":false,
    "meta":{
        "icon":"",
        "title":"研究生三助详情"
    },
    "children":[

    ],
    "childrenId":null,
    "auth":"1"
 },
 {
  "id":0,
  "modId":"5122",
  "name":"gjzxdk",
  "path":"/gjzxdk",
  "title":"国家助学贷款",
  "component":"gjzxdk/stu/index",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":22,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"国家助学贷款"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5123",
  "name":"friendTutor",
  "path":"/friendTutor",
  "title":"朋辈辅导",
  "component":"friendTutor/stu/index",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":23,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"朋辈辅导"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5124",
  "name":"tutorDetail",
  "path":"/tutorDetail",
  "title":"朋辈导师资料",
  "component":"friendTutor/stu/apply/table",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":24,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"朋辈导师资料"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5125",
  "name":"zbrwbc",
  "path":"/zbrwbc",
  "title":"征兵入伍补偿",
  "component":"zbrwbc/stu/table",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":25,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"征兵入伍补偿"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5126",
  "name":"jcjyadd",
  "path":"/jcjyadd",
  "title":"基层就业代偿申请表新增",    
  "component":"gjzxdk/list/jcjy/add.vue",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":26,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"基层就业代偿申请表新增"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5127",
  "name":"jcjyedit",
  "path":"/jcjyedit",
  "title":"基层就业代偿申请表详情",
  "component":"gjzxdk/list/jcjy/edit",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":27,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"基层就业代偿申请表详情"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5128",
  "name":"lessonDetail",
  "path":"/lessonDetail",
  "title":"朋辈辅导课程详情",
  "component":"friendTutor/stu/classSet/detail",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":28,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"朋辈辅导课程详情"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5129",
  "name":"afterTea",
  "path":"/afterTea",
  "title":"教授下午茶",
  "component":"afterTea/stu/index",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":29,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"教授下午茶"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5130",
  "name":"afterTeaDetail",
  "path":"/afterTeaDetail",
  "title":"教授下午茶活动详情",
  "component":"afterTea/stu/apply/table",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":30,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"教授下午茶活动详情"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5131",
  "name":"stuPunish",
  "path":"/stuPunish",
  "title":"学生处分",
  "component":"stuPunish/stu/index",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":31,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"学生处分"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
 {
  "id":0,
  "modId":"5132",
  "name":"stuPunishdetail",
  "path":"/stuPunishdetail",
  "title":"矫正教育鉴定",
  "component":"stuPunish/stu/jzjyIdentify",
  "icon":"",
  "modPid":"-1",
  "isChild":"2",
  "sortId":32,
  "modStatus":"1",
  "hidden":true,
  "alwaysShow":true,
  "rem":"",
  "roleIds":null,
  "isChecked":null,
  "vueChecked":false,
  "meta":{
      "icon":"",
      "title":"矫正教育鉴定"
  },
  "children":[

  ],
  "childrenId":null,
  "auth":"1"
 },
  {
    "id": 0,
    "modId": "5133",
    "name": "jzjyDetail",
    "path": "/jzjyDetail",
    "title": "矫正教育详情",
    "component": "stuPunish/stu/jzjyDetail",
    "icon": "",
    "modPid": "-1",
    "isChild": "2",
    "sortId": 33,
    "modStatus": "1",
    "hidden": true,
    "alwaysShow": true,
    "rem": "",
    "roleIds": null,
    "isChecked": null,
    "vueChecked": false,
    "meta": {
      "icon": "",
      "title": "矫正教育详情"
    },
    "children": [

    ],
    "childrenId": null,
    "auth": "1"
  },
  {
    "id": 0,
    "modId": "5134",
    "name": "vacationSchoolStu",
    "path": "/vacationSchoolStu",
    "title": "假期留校",
    "component": "dailyBehavior/vacationSchool/stu/index",
    "icon": "",
    "modPid": "-1",
    "isChild": "2",
    "sortId": 34,
    "modStatus": "1",
    "hidden": true,
    "alwaysShow": true,
    "rem": "",
    "roleIds": null,
    "isChecked": null,
    "vueChecked": false,
    "meta": {
      "icon": "",
      "title": "假期留校"
    },
    "children": [

    ],
    "childrenId": null,
    "auth": "1"
  },
  {
    "id": 0,
    "modId": "5135",
    "name": "careerStu",
    "path": "/careerStu",
    "title": "生涯发展与咨询",
    "component": "dailyBehavior/career/stu/index",
    "icon": "",
    "modPid": "-1",
    "isChild": "2",
    "sortId": 35,
    "modStatus": "1",
    "hidden": true,
    "alwaysShow": true,
    "rem": "",
    "roleIds": null,
    "isChecked": null,
    "vueChecked": false,
    "meta": {
      "icon": "",
      "title": "生涯发展与咨询"
    },
    "children": [

    ],
    "childrenId": null,
    "auth": "1"
  },
  {
    "id": 0,
    "modId": "5136",
    "name": "careerBookDetail",
    "path": "/careerBookDetail",
    "title": "预约登记",
    "component": "dailyBehavior/career/stu/bookDetail",
    "icon": "",
    "modPid": "-1",
    "isChild": "2",
    "sortId": 36,
    "modStatus": "1",
    "hidden": true,
    "alwaysShow": true,
    "rem": "",
    "roleIds": null,
    "isChecked": null,
    "vueChecked": false,
    "meta": {
      "icon": "",
      "title": "预约登记"
    },
    "children": [

    ],
    "childrenId": null,
    "auth": "1"
  },
  {
    "id": 0,
    "modId": "5137",
    "name": "careerMybook",
    "path": "/careerMybook",
    "title": "我的预约",
    "component": "dailyBehavior/career/stu/mybook",
    "icon": "",
    "modPid": "-1",
    "isChild": "2",
    "sortId": 37,
    "modStatus": "1",
    "hidden": true,
    "alwaysShow": true,
    "rem": "",
    "roleIds": null,
    "isChecked": null,
    "vueChecked": false,
    "meta": {
      "icon": "",
      "title": "我的预约"
    },
    "children": [

    ],
    "childrenId": null,
    "auth": "1"
  },
  {
    "id": 0,
    "modId": "5138",
    "name": "graduateIdtyjs",
    "path": "/graduateIdtyjs",
    "title": "毕业生鉴定研究生",
    "component": "dailyBehavior/graduateIdt/stu/tableyjs",
    "icon": "",
    "modPid": "-1",
    "isChild": "2",
    "sortId": 38,
    "modStatus": "1",
    "hidden": true,
    "alwaysShow": true,
    "rem": "",
    "roleIds": null,
    "isChecked": null,
    "vueChecked": false,
    "meta": {
      "icon": "",
      "title": "毕业生鉴定研究生"
    },
    "children": [

    ],
    "childrenId": null,
    "auth": "1"
  },
  {
    "id": 0,
    "modId": "5139",
    "name": "graduateIdtList",
    "path": "/graduateIdtList",
    "title": "毕业生鉴定",
    "component": "dailyBehavior/graduateIdt/stu/index",
    "icon": "",
    "modPid": "-1",
    "isChild": "2",
    "sortId": 39,
    "modStatus": "1",
    "hidden": true,
    "alwaysShow": true,
    "rem": "",
    "roleIds": null,
    "isChecked": null,
    "vueChecked": false,
    "meta": {
      "icon": "",
      "title": "毕业生鉴定"
    },
    "children": [

    ],
    "childrenId": null,
    "auth": "1"
  },
    ];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: "/system/user-auth",
    component: Layout,
    hidden: false,
    permissions: ["system:user:edit"],
    children: [
      {
        path: "role/:userId(\\d+)",
        component: () => import("@/views/system/user/authRole"),
        name: "AuthRole",
        meta: { title: "分配角色", activeMenu: "/system/user" },
      },
    ],
  },
  {
    path: "/system/role-auth",
    component: Layout,
    hidden: true,
    permissions: ["system:role:edit"],
    children: [
      {
        path: "user/:roleId(\\d+)",
        component: () => import("@/views/system/role/authUser"),
        name: "AuthUser",
        meta: { title: "分配用户", activeMenu: "/system/role" },
      },
    ],
  },
  {
    path: "/system/dict-data",
    component: Layout,
    hidden: true,
    permissions: ["system:dict:list"],
    children: [
      {
        path: "index/:dictId(\\d+)",
        component: () => import("@/views/system/dict/data"),
        name: "Data",
        meta: { title: "字典数据", activeMenu: "/system/dict" },
      },
    ],
  },
  {
    path: "/monitor/job-log",
    component: Layout,
    hidden: true,
    permissions: ["monitor:job:list"],
    children: [
      {
        path: "index",
        component: () => import("@/views/monitor/job/log"),
        name: "JobLog",
        meta: { title: "调度日志", activeMenu: "/monitor/job" },
      },
    ],
  },
  {
    path: "/tool/gen-edit",
    component: Layout,
    hidden: true,
    permissions: ["tool:gen:edit"],
    children: [
      {
        path: "index/:tableId(\\d+)",
        component: () => import("@/views/tool/gen/editTable"),
        name: "GenEdit",
        meta: { title: "修改生成配置", activeMenu: "/tool/gen" },
      },
    ],
  },
];

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

export default new Router({
  mode: "history", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
