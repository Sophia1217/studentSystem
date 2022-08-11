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
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register"),
    hidden: true,
  },
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
    path: "",
    component: Layout,
    redirect: "index",
    meta: { title: "首页", icon: "dashboard", affix: true },
    children: [
      {
        path: "index",
        component: () => import("@/views/index"),
        name: "Index",
        hidden: false,
        meta: { title: "首页", icon: "" },
      },
      {
        path: "studentAngle",
        component: () => import("../index.vue"),
        name: "studentAngle",
        hidden: false,
        meta: { title: "学生视角", icon: "", affix: true },
        children:[
          {
            path: "studentHomePage",
            component: () => import("@/views/homepage/studentAngle/studentHomePage.vue"),
            name: "studentHomePage",
            hidden: false,
            meta: { title: "学生视角首页", icon: "", affix: true },
          },
          {
            path: "lookAngle",
            component: () => import("@/views/homepage/studentAngle/lookAngle.vue"),
            name: "lookAngle",
            hidden: false,
            meta: { title: "学生视角查看", icon: "", affix: true },
          },
          {
            path: "editAngle",
            component: () => import("@/views/homepage/studentAngle/editAngle.vue"),
            name: "editAngle",
            hidden: false,
            meta: { title: "学生视角编辑", icon: "", affix: true },
          },

        ]
      }
    ],
  },
  {
    path: "",
    component: Layout,
    hidden: true,
    redirect: "selectRole",
    children: [
      {
        path: "selectRole",
        component: () => import("@/views/selectRole/index"),
        name: "selectRole",
        hidden: false,
        meta: { title: "角色选择", icon: "dashboard" },
      },
    ],
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
  {
    path: "/student",
    meta: { title: "学生信息管理", icon: "monitor" },
    component: Layout,
    hidden: false,
    children: [
      {
        path: "absentee",
        component: resolve => require(["@/views/student/absentee/index"], resolve),
        name: "absentee",
        meta: { title: "在籍学生信息", icon: "" },
      },
      {
        path: "studetails",
        hidden: true,
        component: resolve => require(["@/views/student/absentee/manStudent/details/index"], resolve),
        name: "studetails",
        meta: { title: "学生信息", icon: "" }
      },
      {
        path: "informationStu",
        name: "informationStu",
        hidden: false,
        meta: { title: "学生信息修改", icon: "" },
        component: () => import('../index.vue'),
        children: [
          {
            path: "forcedEdit",
            component: resolve => require(["@/views/student/informationStu/forcedEdit/index"], resolve),
            name: "forcedEdit",
            meta: { title: "强制修改名单设置", icon: "" }
          },
          {
            path: "auditStu",
            component: resolve => require(["@/views/student/informationStu/auditStu/index"], resolve),
            name: "auditStu",
            meta: {
              title: "学生信息修改审核",
              icon: ""
            }
          },
          {
            path: "auditSteps",
            hidden: true,
            component: resolve => require(["@/views/student/informationStu/auditStu/processed/auditSteips/index"], resolve),
            name: "auditSteps",
            meta: {
              title: "审核",
              icon: ""
            }
          },
          {
            path: "parameterStu",
            component: resolve => require(["@/views/student/informationStu/parameterStu/index"], resolve),
            name: "parameterStu",
            meta: {
              title: "学生信息修改参数",
              icon: ""
            }
          },
          {
            path: "fieldSettings",
            component: resolve => require(["@/views/student/informationStu/fieldSettings/index"], resolve),
            name: "fieldSettings",
            meta: {
              title: "信息修改字段设置",
              icon: ""
            }
          },
        ]
      },
      {
        path: "stuChange",
        component: resolve => require(["@/views/student/stuChange/index"], resolve),
        name: "stuChange",
        meta: { title: "学籍异动情况", icon: "" },
      },
      {
        path: "stuChangeDetail",
        hidden: true,
        component: resolve => require(["@/views/student/stuChange/detail/index"], resolve),
        name: "stuChangeDetail",
        meta: { title: "学籍异动情况详情", icon: "" },
      },
      {
        path: "graduate",
        component: resolve => require(["@/views/student/graduate/index"], resolve),
        name: "graduate",
        meta: { title: "毕业学生信息", icon: "" },
      },
      {
        path: "graduateDetail",
        hidden: true,
        component: resolve => require(["@/views/student/graduate/detail/index"], resolve),
        name: "graduateDetail",
        meta: { title: "毕业学生信息详情", icon: "" },
      },
    ]
  },
  {
    path: "/politicalwork",
    meta: { title: "政工队伍管理", icon: "monitor" },
    component: Layout,
    hidden: false,
    children: [
      {
        path: "basicinfo",
        component: resolve => require(["@/views/politicalwork/basicInfo/index"], resolve),
        name: "basicinfo",
        meta: {
          title: "政工干部基本信息",
          icon: ""
        }
      },
      {
        path: "detailinfo",
        hidden: true,
        component: resolve => require(["@/views/politicalwork/basicInfo/detailInfo/index"], resolve),
        name: "detailinfo",
        meta: { title: "详情", icon: "" }
      },
      {
        path: "assistantappoint",
        component: resolve => require(["@/views/politicalwork/assistantappoint/index"], resolve),
        name: "assistantappoint",
        meta: {
          title: "辅导员任命",
          icon: ""
        }
      },
      {
        path: "teacherappoint",
        component: resolve => require(["@/views/politicalwork/teacherappoint/index"], resolve),
        name: "teacherappoint",
        meta: {
          title: "班主任任命",
          icon: ""
        }
      },
      {
        path: "infoEdit",
        component: resolve => require(["@/views/politicalwork/infoEdit/index"], resolve),
        name: "infoEdit",
        meta: {
          title: "信息修改字段设置",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/class",
    meta: { title: "班级管理", icon: "monitor" },
    component: Layout,
    hidden: false,
    children: [
      {
        name: "class_maintenance",
        path: "maintenanceClass",
        component: (resolve) =>
          require(["@/views/class/maintenanceClass/index"], resolve),
        meta: {
          title: "班级维护",
          icon: "",
        },
      },
      {
        name: "record",
        path: "record",
        hidden: true,
        meta: { title: "任职记录", icon: "" },
        component: () => import("@/views/class/headerTeacher/record"),
      },

      {
        path: "divisionclass",
        name: "divisionclass",
        hidden: false,
        meta: { title: "分班管理", icon: "" },
        component: () => import("@/views/class/divisionclass/index"),
      },
      {
        path: "operateClass",
        name: "operateClass",
        hidden: true,
        component: () =>
          import("@/views/class/divisionclass/subComponents/operateClass.vue"),
        meta: { title: "分班管理操作" },
      },
      {
        path: "headerTeacher",
        name: "headerTeacher",
        hidden: false,
        meta: { title: "班主任管理", icon: "" },
        component: () => import("@/views/class/headerTeacher/index"),
      },
      {
        name: "LeadRecord",
        path: "leadRecord",
        hidden: true,
        meta: { title: "任职记录", icon: "" },
        component: () => import("@/views/class/classleader/leadRecord"),
      },
      {
        path: 'classTeacher',
        name: 'classTeacher',
        hidden: true,
        meta: { title: "分配班主任", icon: "" },
        component: () => import('@/views/class/headerTeacher/classTeacher')
      },
      {
        path: "instructor",
        name: "instructor",
        hidden: false,
        meta: { title: "辅导员管理", icon: "" },
        component: () => import("@/views/class/instructor/index"),
      },
      {
        path: "empRecord",
        name: "empRecord",
        hidden: true,
        meta: { title: "任职记录", icon: "" },
        component: () => import("@/views/class/instructor/subComponents/empRecord.vue"),
      },
      {
        path: "assignTea",
        name: "assignTea",
        hidden: true,
        meta: { title: "分配辅导员", icon: "" },
        component: () => import("@/views/class/instructor/subComponents/assignTea.vue"),
      },
      {
        path: "classleader",
        name: "classleaderu",
        hidden: false,
        meta: { title: "班干部管理", icon: "" },
        component: () => import("@/views/class/classleader/index"),
      },
      {
        path: "leaderAssign",
        name: "leaderAssign",
        hidden: true,
        meta: { title: "班干部任命", icon: "" },
        component: () => import("@/views/class/classleader/subComponents/leaderAssign.vue"),
      },
    ],
  },
  {
    path: "/systems",
    meta: { title: "系统管理", icon: "monitor" },
    component: Layout,
    hidden: false,
    children: [
      {
        name: "role",
        path: "role",
        component: (resolve) => require(["@/views/systemMan/role/index"], resolve),
        meta: { title: "角色管理", icon: "", },
      },
      {
        name: "addRole",
        path: "addRole",
        hidden: true,
        component: (resolve) => require(["@/views/systemMan/role/addRole"], resolve),
        meta: { title: "角色信息", icon: "", },
      },
      {
        name: "user",
        path: "user",
        component: (resolve) => require(["@/views/systemMan/user/index"], resolve),
        meta: { title: "用户管理", icon: "", },
      },
      {
        name: "dataPermis",
        path: "dataPermis",
        hidden: true,
        component: (resolve) => require(["@/views/systemMan/user/permissions/index"], resolve),
        meta: { title: "数据权限", icon: "", },
      },
      {
        name: "dictionary",
        path: "dictionary",
        component: (resolve) => require(["@/views/systemMan/dictionary/index"], resolve),
        meta: { title: "字典管理", icon: "", },
      },
      {
        name: "dictionaryDetail",
        path: "dictionaryDetail",
        hidden: true,
        component: (resolve) => require(["@/views/systemMan/dictionary/dictionaryDetail"], resolve),
        meta: { title: "字典列表", icon: "", },
      },
    ]
  }
];

// 班级管理内部路由
export const classRoutes = [];

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
