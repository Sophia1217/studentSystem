<template>
  <div class="permissions">
    <el-form class="elForm" :inline="true" :model="formName">
      <el-form-item label="用 户 名">
        <el-input
          size="small"
          :disabled="true"
          v-model="formName.xm"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="学 工 号">
        <el-input
          size="small"
          :disabled="true"
          v-model="formName.userId"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="editBtn" @click="addRoles">
          <i class="addIcon"></i> 新增用户角色
        </div>
      </el-form-item>
    </el-form>

    <div class="roleWrap" v-for="(role, index) in roleData" :key="index">
      <div class="roleStyle">
        <div class="name">用户角色</div>
        <div>
          <el-select
            v-model="role.roleId"
            class="elFormSelect"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in checkboxWrap"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="roleStyle">
        <el-tree
          style="min-width: 200px"
          class="treeStyle"
          :load="loadNode"
          :id='index'
          ref="tree"
          show-checkbox
          lazy
          node-key="nodeId"
          @check-change="handleCheckChange"
          :props="props"
        >
        <!-- :expand-on-click-node="false" -->
        <!-- :data="role.cascaderOptions" -->
        <!-- :id="index" -->
        <!--  -->
          <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
            <span @click="() => append(data, index)">{{ node.label }}</span>
          </span> -->
        </el-tree>
      </div>

      <div class="deleIcon" @click="deleRoles(index)"><i></i></div>
      <div class="btn confirm" @click="handleDataAuth(role,index)">
        <i class="icon yesIcon"></i> 提交
      </div>
    </div>

    <!-- <div class="editBottom">
      <div class="btn cancel" @click="handleCencal">
        <i class="icon noIcon"></i> 取消
      </div>
      <div class="btn confirm" @click="handleDataAuth">
        <i class="icon yesIcon"></i> 提交
      </div> -->
    </div>
  </div>
</template>

<script>
import {
  queryDataAuth,
  queryClassList,
  queryStuList,
  updateDataAuth,
} from "@/api/systemMan/user";
import { queryRoleList } from "@/api/systemMan/role";
export default {
  name: "permissions",
  data() {
    return {
        props: {    // 数配置
        //   label: 'name',
        //   children: 'rows',
          isLeaf: 'leaf'
        },
      formName: {
        xm: "",
        userId: "",
        roleId: "",
      },
      checkboxWrap: [], //用户角色下拉

      cascaderOptions: [], // 学院数据
      classListOps: [], // 班级数据
      stuListOps: [], // 学生数据
      roleData: [], // 用户分组
      checksedKeys : [], // 被操作人选中节点
    };
  },

  created() {
    this.formName = this.$route.query;
    this.formName.userId = '2006970417'
  },

  mounted() {
    this.getqueryRoleList();
    // this.getQueryDataAuth();
  },

  methods: {
    // 获取用户角色
    getqueryRoleList() {
        // 获取管理员角色列表
        let data = { roleId: this.$store.getters.roleId };
        queryRoleList(data)
            .then((res) => {
                this.checkboxWrap = res.data.rows || [];
            })
            .catch((err) => {
                console.log('获取用户出错',err);
            });
        //  获取被操作用户角色
        let user = { roleId: this.formName.userId };
        queryRoleList(user)
            .then((res) => {
                this.roleData = res.data.rows || [];
                for (let index = 0; index < this.roleData.length; index++) {
                    var element = this.roleData[index];
                    element.checksedKeys = []
                }
            //   this.initData()
            })
            .catch((err) => {
                console.log('获取用户出错',err);
            });


    },
    // 添加角色
    addRoles() {
      this.roleData.push({
        roleId: "",
        checksedKeys: [],
      });
    },
    // 删除角色
    deleRoles(index) {
      this.roleData.splice(index, 1);
    },
    // 初始化进入
    // initData() {
    //   if (this.formName.roleId && this.formName.roleId.length > 0) {
    //     this.formName.roleId = this.formName.roleId.split(",");
    //     for (let x = 0; x < this.formName.roleId.length; x++) {
    //       this.roleData.push({
    //         roleId: this.formName.roleId[x],
    //         // cascaderOptions: data,
    //       });
    //     }
    //   } else {
    //     this.roleData.push({
    //       roleId: "",
    //     //   cascaderOptions: data,
    //     });
    //   }
    // },

    // 获取节点数据
    loadNode (node, resolve){
        console.log('请求节点数据',node.level,node);
        if (node.level == 0) { // 学院
            // 请求操作人权限列表
            let data = { userId: this.$store.getters.userId, roleId: this.$store.getters.roleId };
            // let data = { userId: "2006970417", roleId: "01" };
            queryDataAuth(data) 
                .then((res) => {
                    console.log('操作人返回学院列表',res);
                    var  resData = res.data.rows || [];
                    for (let x = 0; x < resData.length; x++) {
                        resData[x].nodeId = resData[x].dwdm;
                        resData[x].label = resData[x].dwmc;
                    }

                    setTimeout(()=> {
                        // 请求被操作人权限列表
                        var roleId = ''
                        var nodeIndex = -1
                        for (let index = 0; index < this.roleData.length; index++) {
                            console.log('1111000',node,node.id);
                            // var tree = this.$refs.tree[index];
                            
                            var indexNode = this.$refs.tree[this.roleData.length - index - 1].getNode(node)
                            console.log('1111',indexNode,indexNode.id);
                            if (indexNode == node) {
                                // nodeIndex = this.$refs.tree[index].id
                                nodeIndex = index
                                console.log('找到相同节点',roleId,'节点序号',nodeIndex);
                                roleId = this.roleData[nodeIndex].roleId || ''
                                console.log('找到相同节点',roleId,'节点序号',nodeIndex);
                                break
                            }
                        }
                        console.log('11111222',roleId);
                        
                        roleId = '01'
                        if (roleId.length > 0) {
                            let dataParam = { userId: this.formName.userId, roleId: roleId };
                            queryDataAuth(dataParam) 
                            .then((res1) => {
                                console.log('被操作人返回学院列表',res1);
                                var  resData1 = res1.data.rows || [];
                                for (let y = 0; y < resData1.length; y++) {
                                    this.roleData[nodeIndex].checksedKeys.push(resData1[y].dwdm)
                                }
                                // console.log('返回学院列表',resData);
                                this.$refs.tree[nodeIndex].setCheckedKeys(this.roleData[nodeIndex].checksedKeys)
                                // this.initData(this.cascaderOptions);
                            })
                            .catch((err) => {
                                // console.log('被操作人返回学院列表失败',err,data);
                            });
                        }
                    },100)
                    return resolve(resData);
                })
                .catch((err) => {
                    console.log('操作人返回学院列表失败',err,data);
                    return resolve([]);
                });

                
                
                
                
        }else if (node.level == 1) { // 班级
            let data = { ssdwdm: node.data.dwdm };
            console.log('班级节点',node)
            queryClassList(data)
                .then((res) => {
                    console.log('返回班级列表全量数据',res);
                    var  rowData = res.data.rows || [];
                    console.log('返回班级列表全量数据',res,rowData);
                    for (let x = 0; x < rowData.length; x++) {
                        rowData[x].label = rowData[x].bjmc;
                        rowData[x].nodeId = rowData[x].bjdm;
                        rowData[x].dwdm = node.data.dwdm;
                    }
                    this.classListOps = rowData;
                    console.log('返回班级列表',rowData);
                    this.$refs.tree[0].setCheckedKeys(["6860320002","6860"])
                    return resolve(rowData);                
                })
                .catch((err) => {
                    console.log('返回班级列表失败',err,data);
                    return resolve([]);
                });
        }else if (node.level == 2) { // 学生
            let data = { bjdm: node.data.bjdm };
            console.log('学生节点',node)
            queryStuList(data)
                .then((res) => {
                    var stuData = res.data.rows || [];
                    for (let x = 0; x < stuData.length; x++) {
                        stuData[x].label = stuData[x].xm;
                        stuData[x].nodeId = stuData[x].xh;
                        stuData[x].leaf = true;
                        stuData[x].bjdm = node.data.bjdm;
                        stuData[x].dwdm = node.data.dwdm;
                    }
                    // this.stuListOps = stuData;
                    this.$refs.tree[0].setCheckedKeys(["20032380"])
                    return resolve(stuData);
                
                })
                .catch((err) => {
                    return resolve([]);
                });
        }
        // if (node.level > 1) return resolve([]);

    },

    // 取消
    // handleCencal() {
    //   let arr = ["20041520"]
    //       console.log('树控件',this.$refs.tree);
    //       this.$refs.tree[0].setCheckedKeys(arr)
    //   // "6860320002", "6860320003"
    //   // this.$router.push({
    //   //   path: "/systems/user",
    //   // });
    // },
    handleCheckChange(data, checked) {
        var roleId = ''
        var nodeIndex = -1
        for (let index = 0; index < this.roleData.length; index++) {
            console.log('1111000',node);
            // var tree = this.$refs.tree[index];
            
            var indexNode = this.$refs.tree[index].getNode(node)
            console.log('1111',indexNode);
            if (indexNode == node) {
                nodeIndex = this.$refs.tree[index].id
                roleId = this.roleData[nodeIndex].roleId || ''
                console.log('找到相同节点',roleId,nodeIndex);
                break
            }
        }
      console.log(data, checked);
      checked ? this.checksedKeys.push(data.nodeId) : this.checksedKeys.splice(this.checksedKeys.indexOf(data.nodeId), 1)
    },

    // 更新数据权限
    handleDataAuth(role,index) {
        // 参数合法校验
        var roleId = role.roleId || ''
        if (roleId.length == 0) {
            this.$message({
                message : '请选择角色',
                type : 'error'
            })
            return
        }
        var nodes = this.$refs.tree[index].getCheckedNodes() || [];
        if ( nodes.length == 0) {
            this.$message({
                message : '请选择数据权限',
                type : 'error'
            })
            return
        }

        // 数据筛选
        var dataArr = [];
        // console.log('开始筛选权限数据',nodes);
        for (let index = 0; index < nodes.length; index++) {
            const element = nodes[index];
            if (element.visitId == '2') { // 学生，查询是否已经被包含在班级
                var flag = false
                for (let x = 0; x < nodes.length; x++) {
                    const item = nodes[x];
                    if (item.visitId == '1' && item.nodeId == element.bjdm) {
                        flag = true
                        // console.log('当前节点是学生，有班级',element);
                        break
                    }
                }
                if (flag == false) {
                    dataArr.push(element)
                    // console.log('当前节点是学生，没有班级',element);
                }
            }else if (element.visitId == '1') { // 班级，查询是否已经被包含在学院里
                var hasXY = false
                for (let i = 0; i < nodes.length; i++) {
                    const b = nodes[i];
                    if (b.visitId == '0' && b.nodeId == element.dwdm) {
                        hasXY = true
                        // console.log('当前节点是班级，有学院',element);
                        break
                    }
                }
                if (hasXY == false) {
                    dataArr.push(element)
                    // console.log('当前节点是班级，没有学院',element);
                }
            }else {
                // console.log('当前节点是学院');
                dataArr.push(element)
            }
        }
        // 包装数据
        var dataList = [];
        for (let s = 0; s < dataArr.length; s++) {
            const node = dataArr[s];
            var data = {};
            if (node.visitId == '0') {
                data.orginazationCode = node.dwdm
            }else if (node.visitId == '1') {
                data.orginazationCode = node.dwdm
                data.classNo = node.bjdm
            }else if (node.visitId == '2') {
                data.orginazationCode = node.dwdm
                data.classNo = node.bjdm
                data.stuId = node.xh
            } 
            dataList.push(data)
        }

        // 网络请求
        let param = {
            userId: this.formName.userId,
            roleId: role.roleId,
            dataList: dataList
        };
        updateDataAuth(param)
            .then((res) => {
            this.$message({
                message:'保存成功',
                type : 'success'
            })
            })
            .catch((err) => {

            });
    },
  },
};
</script>

<style lang="scss" scoped>
.permissions {
  .elForm {
    background: #fff;
    padding: 20px;
  }

  .roleWrap {
    background: #fff;
    margin-top: 20px;
    
    padding: 20px;
    padding-bottom: 80px;
    display: flex;
    align-items: center;
    .roleStyle {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      color: #1f1f1f;
      .name {
        margin-right: 20px;
        font-weight: 600;
      }
      .treeStyle {
        font-weight: 400;
        margin-left: 30px;
      }
    }
    .deleIcon {
      margin-left: 30px;
      cursor: pointer;
      i {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: url("~@/assets/images/detelIcon.png");
      }
    }
  }

  .elFormSelect {
    ::v-deep .el-tag {
      &:nth-child(1) {
        width: 120px;
      }
    }
  }
  .editBtn {
    padding: 0 10px;
    margin-left: 20px;
    border: 1px solid #005657;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    cursor: pointer;
    line-height: 32px;
    .addIcon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("~@/assets/images/addicon.png") no-repeat center;
      vertical-align: middle;
    }
  }
  .editBottom {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 -2px 6px -1px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
    // .btn {
    //   width: 84px;
    //   height: 36px;
    //   line-height: 36px;
    //   text-align: center;
    //   cursor: pointer;
    //   border: 1px solid #005657;
    //   border-radius: 2px;
    //   margin-right: 20px;

    //   .icon {
    //     display: inline-block;
    //     width: 20px;
    //     height: 20px;
    //     vertical-align: middle;
    //     margin-right: 5px;
    //   }

    //   .noIcon {
    //     background: url("~@/assets/images/no.png");
    //   }

      
    // }

    .btn {
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-left: 20px;
    }
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 5px;
      }

    .yesIcon {
        background: url("~@/assets/images/yesW.png");
      }

    .cancel {
      color: #005657;
    }

    .confirm {
      background: #005657;
      color: #fff;
    }
  
}
</style>
