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
          @node-click='nodeClick'
          @node-expand='nodeClick'
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

      <div class="deleIcon" @click="deleRoles(role,index)"><i></i></div>
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
  updateDataAuth,
  queryUserPageList,
  deleteRole,
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
    // this.formName.userId = '2021980054'
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
                // console.log('获取用户出错',err);
            });
        //  获取被操作用户角色
        let user = { roleId: this.formName.roleId };
        let user1 = {
            userId: this.$store.getters.userId, // 用户Id
            // userId:'2005690002',
            roleId: this.$store.getters.roleId, //当前人
            gh:this.formName.userId,
            pageNum: 1,
            pageSize: 1,
        };
        queryUserPageList(user1)
            .then((res) => {
                // console.log('被操作人返回用户角色',res);
                var roleIdStr = res.rows[0].roleIds || '';
                // console.log(roleIdStr,'1111')
                var roleIdArr = roleIdStr.split(',') || []
                const roleData = []
                //  console.log(roleIdStr,'1111',roleIdArr)
                for (let index = 0; index < roleIdArr.length; index++) {
                    var roleId = roleIdArr[index] || ''
                    if (roleId.length == 0) {
                        continue
                    }
                    const element = {
                        roleId : roleId,
                    };
                    
                    element.oldRoleId = element.roleId
                    element.checksedKeys = []
                    roleData.push(element)
                    const data1 = { 
                        userId: this.formName.userId, 
                        roleId: element.roleId ,
                        type : 0,
                    };
                    // console.log("开始请求次数",index)
                    queryDataAuth(data1) 
                        .then((res1) => {
                            
                            // console.log('被操作人返回学院列表',res1,data1,index);
                            var  resData = res1.data.rows || [];
                            for (let x = 0; x < resData.length; x++) {
                                var nodeId = resData[x].dwdm || '';
                                element.checksedKeys.push(nodeId)
                                // console.log('数据',data1,element,nodeId,res1,this.index++)
                            }
                            // console.log("返回次数",index,roleData)
                        })
                        .catch((err) => {
                            // console.log('被操作人返回学院列表失败',err,data);
                        });
                    this.roleData = roleData
                }
            })
            .catch((err) => {
                // console.log('获取用户出错',err);
            });


    },
    // 添加角色
    addRoles() {
      this.roleData.push({
        oldRoleId: '',
        roleId: "",
        checksedKeys: [],
      });
    },
    // 删除角色
    deleRoles(role,index) {
        var roleName = ''
        for (let index = 0; index < this.checkboxWrap.length; index++) {
            var item = this.checkboxWrap[index];
            if (item.roleId == role.roleId) {
                roleName = item.roleName
                break
            }
            
        }
        this.$modal.confirm('确认要删除"' + this.formName.xm  + '"的"' + roleName + '"角色吗？').then(() => {
            // this.$modal.msgSuccess(text + "成功");
            var param = { 
                userId: this.formName.userId, 
                roleId : role.roleId,
            };
            deleteRole(param).then(()=> {
                this.roleData.splice(index, 1);
            }).catch(()=>{

            })
        }).catch(function() {});
        

      
    },

    // 获取节点数据
    loadNode (node, resolve){
        // console.log('请求节点数据',node.level,node);
        if (node.level == 0) { // 学院
            // 请求操作人权限列表
            let data = { 
                    userId: this.$store.getters.userId, 
                    roleId: this.$store.getters.roleId ,
                    type : node.level,
                };
            // let data = { userId: "2006970417", roleId: "01" };
            queryDataAuth(data) 
                .then((res) => {
                    // console.log('操作人返回学院列表',res);
                    var  resData = res.data.rows || [];
                    for (let x = 0; x < resData.length; x++) {
                        resData[x].nodeId = resData[x].dwdm;
                        resData[x].label = resData[x].dwmc;
                    }    
                    setTimeout(() => {
                        // console.log('树',this.$refs.tree,'角色',this.roleData)
                        for (let index = 0; index < this.roleData.length; index++) {
                            var role = this.roleData[index];
                            var tree = this.$refs.tree[index]
                            // console.log('树',tree,'角色',role,index)
                            tree.setCheckedKeys(role.checksedKeys)
                            
                        }
                    }, 100); 
                    return resolve(resData);
                })
                .catch((err) => {
                    // console.log('操作人返回学院列表失败',err,data);
                    return resolve([]);
                });
                
        }else if (node.level == 1) { // 班级
            // let data = { ssdwdm: node.data.dwdm };
            var param = { 
                userId: this.$store.getters.userId, 
                roleId: this.$store.getters.roleId ,
                type : node.level,
            };
            param.dwdm = node.data.dwdm

            // console.log('班级节点',node)
            queryDataAuth(param) 
                .then((res) => {
                    // console.log('返回班级列表全量数据',res);
                    var  rowData = res.data.rows || [];
                    // console.log('返回班级列表全量数据',res,rowData);
                    for (let x = 0; x < rowData.length; x++) {
                        rowData[x].label = rowData[x].bjmc;
                        rowData[x].nodeId = rowData[x].bjdm;
                        rowData[x].dwdm = node.data.dwdm;
                    }
                    // console.log('返回班级列表',rowData);
                    return resolve(rowData);                
                })
                .catch((err) => {
                    // console.log('返回班级列表失败',err);
                    return resolve([]);
                });
        }else if (node.level == 2) { // 学生
            // let data = { bjdm: node.data.bjdm };
            var param = { 
                userId: this.$store.getters.userId, 
                roleId: this.$store.getters.roleId ,
                type : node.level,
            };
            param.bjdm = node.data.bjdm
            param.dwdm = node.data.dwdm
            // console.log('学生节点',node)
            queryDataAuth(param)
                .then((res) => {
                    var stuData = res.data.rows || [];
                    for (let x = 0; x < stuData.length; x++) {
                        stuData[x].label = stuData[x].xm;
                        stuData[x].nodeId = stuData[x].xh;
                        stuData[x].leaf = true;
                        stuData[x].bjdm = node.data.bjdm;
                        stuData[x].dwdm = node.data.dwdm;
                    }
                    return resolve(stuData);
                
                })
                .catch((err) => {
                    return resolve([]);
                });
        }
        // if (node.level > 1) return resolve([]);

    },

    nodeClick(data, node, nodeVue) {
       // console.log('节点被点击',data,node,nodeVue,nodeVue.$parent)
        if (node.level > 2 || node.loaded) {
            // console.log('节点被点击不处理')
            return
        }
        var index = -1
        var param = { 
            userId: this.formName.userId, 
            type : node.level,
        };
        if (node.level == 1) {
           index = this.$refs.tree.indexOf(nodeVue.$parent) 
            param.dwdm = data.dwdm
        }else if (node.level == 2) {
            index = this.$refs.tree.indexOf(nodeVue.$parent.$parent)
            param.bjdm = data.bjdm
        }
        var role = this.roleData[index]
        
        param.roleId = role.oldRoleId || ''
        
         
        // console.log('当前节点所在树的索引',index,role);
        if (index < 0 || param.roleId.length == 0) {
            return
        }
        
            // let data = { userId: "2006970417", roleId: "01" };
        queryDataAuth(param) 
            .then((res) => {
                // console.log('操作人返回学院列表',res);
                var  resData = res.data.rows || [];
                for (let x = 0; x < resData.length; x++) {
                    if (node.level == 1) { // 班级
                        var nodeId = resData[x].bjdm || '';
                        this.roleData[index].checksedKeys.push(nodeId)
                    }else if (node.level == 2) { // 学生
                        var nodeId = resData[x].xh || '';
                        this.roleData[index].checksedKeys.push(nodeId)
                    } 
                }
                this.$refs.tree[index].setCheckedKeys(this.roleData[index].checksedKeys)
            })
            .catch((err) => {
                console.log('操作人返回学院列表失败',err,data);
            });

    },

    handleCheckChange(data, checked) {
      // console.log(data, checked);
      for (let index = 0; index < this.roleData.length; index++) {
            var role = this.roleData[index];
            var tree = this.$refs.tree[index]
            role.checksedKeys = tree.getCheckedKeys()
        }
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
            var  element = nodes[index];
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
            var node = dataArr[s];
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
        var param = {
            userId: this.formName.userId,
            newRoleId: role.roleId,
            dataList: dataList,
            operateRoleId: this.$store.getters.roleId
        };
        if (role.oldRoleId.length > 0  && role.oldRoleId != role.roleId) {
            param.oldRoleId = role.oldRoleId
        }


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
