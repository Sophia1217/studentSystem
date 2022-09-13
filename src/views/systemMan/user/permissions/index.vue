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
            @change="hold"
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
          ref="tree"
          show-checkbox
          lazy
          node-key="nodeId"
          @check-change="handleCheckChange"
          :props="props"
          @node-click="nodeClick"
          @node-expand="nodeClick"
        >
          <!-- :id="index" -->
          <!-- :expand-on-click-node="false" -->
          <!-- :data="role.cascaderOptions" -->
          <!-- :id="index" -->
          <!--  -->
          <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
              <span @click="() => append(data, index)">{{ node.label }}</span>
            </span> -->
        </el-tree>
      </div>

      <div class="deleIcon" @click="deleRoles(role, index)"><i></i></div>
      <div class="btn confirm" @click="handleDataAuth(role, index)">
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
</template>

<script>
import {
  queryDataAuth,
  updateDataAuth,
  queryUserPageList,
  deleteRole,
  defaultRoleAuth,
} from "@/api/systemMan/user";
import { queryRoleList } from "@/api/systemMan/role";
export default {
  name: "permissions",
  data() {
    return {
      props: {
        // 树配置
        //   label: 'name',
        //   children: 'rows',
        isLeaf: "leaf",
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
      checksedKeys: [], // 被操作人选中节点
      defaultArr: [],
      newIndex: [],
    };
  },

  created() {
    this.formName = this.$route.query;
  },

  mounted() {
    this.getqueryRoleList();
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
        .catch((err) => {});
      //  获取被操作用户角色
      let user1 = {
        userId: this.$store.getters.userId, // 用户Id
        roleId: this.$store.getters.roleId, //当前人
        gh: this.formName.userId,
        pageNum: 1,
        pageSize: 1,
      };
      queryUserPageList(user1) //查询操作人的所有权限角色
        .then((res) => {
          //如果res.row[0]无数据就请求默认的接口
          var roleIdStr = res.rows[0].roleIds || ""; //roleIds: "06,07,03"
          var a = roleIdStr.split(",") || [];
          var roleIdArr = [];
          for (let x = 0; x < a.length; x++) {
            var item = a[x] || "";
            if (typeof item == "string" && item.length > 0 && item != "01") {
              roleIdArr.push(item);
            }
          }
          const roleData = [];
          for (let index = 0; index < roleIdArr.length; index++) {
            var roleId = roleIdArr[index] || "";
            if (roleId.length == 0) {
              continue;
            }
            const element = {
              roleId: roleId,
            };
            element.oldRoleId = element.roleId;
            element.checksedKeys = [];
            roleData.push(element);
            const data1 = {
              userId: this.formName.userId,
              roleId: element.roleId,
              type: 0,
            };
            queryDataAuth(data1) //查询被操作人的返回权限数据  第一级树展示的数据
              .then((res1) => {
                var resData = res1.data.rows || [];
                for (let x = 0; x < resData.length; x++) {
                  var nodeId = resData[x].orgType || "";
                  element.checksedKeys.push(nodeId); //初始化的不能推入最外层的字段，不然会全选
                }
              })
              .catch((err) => {});

            this.roleData = roleData; //把回显的数组放进去
          }
        })
        .catch((err) => {});
    },
    // 添加角色
    addRoles() {
      this.roleData.push({
        oldRoleId: "",
        roleId: "",
        checksedKeys: [],
        Edit: "1", //区分页面跳转过来的还是新增的默认权限
      });
    },
    // 删除角色
    deleRoles(role, index) {
      var roleName = "";
      for (let index = 0; index < this.checkboxWrap.length; index++) {
        var item = this.checkboxWrap[index];
        if (item.roleId == role.roleId) {
          roleName = item.roleName;
          break;
        }
      }
      this.$modal
        .confirm(
          '确认要删除"' + this.formName.xm + '"的"' + roleName + '"角色吗？'
        )
        .then(() => {
          // this.$modal.msgSuccess(text + "成功");
          if (role.Edit == "1") {
            this.roleData.splice(index, 1);
          } else {
            var param = {
              userId: this.formName.userId,
              roleId: role.roleId,
            };
            deleteRole(param)
              .then(() => {
                this.roleData.splice(index, 1);
                this.getqueryRoleList();

                this.$refs.tree[index].setCheckedKeys(
                  this.roleData[index].checksedKeys
                );
              })
              .catch(() => {});
          }
        })
        .catch(function () {});
    },

    // 获取节点数据
    loadNode(node, resolve) {
      if (node.level == 0) {
        // 查询是什么机构
        // 请求操作人权限列表  全量数据
        let data = {
          userId: this.$store.getters.userId,
          roleId: this.$store.getters.roleId,
          type: node.level,
        };
        // let data = { userId: "2006970417", roleId: "01" };
        queryDataAuth(data)
          .then((res) => {
            var resData = res.data.rows || [];
            for (let x = 0; x < resData.length; x++) {
              resData[x].nodeId = resData[x].orgType;
              resData[x].label = resData[x].orgTypeName;
            }
            setTimeout(() => {
              for (let index = 0; index < this.roleData.length; index++) {
                var role = this.roleData[index];
                var tree = this.$refs.tree[index];
                tree.setCheckedKeys(role.checksedKeys);
              }
            }, 100);
            return resolve(resData);
          })
          .catch((err) => {
            return resolve([]);
          });
      } else if (node.level == 1) {
        var param = {
          userId: this.$store.getters.userId,
          roleId: this.$store.getters.roleId,
          type: node.level,
        };
        param.orgType = node.data.orgType;

        queryDataAuth(param)
          .then((res) => {
            var rowData = res.data.rows || [];
            for (let x = 0; x < rowData.length; x++) {
              rowData[x].label = rowData[x].dwmc;
              rowData[x].nodeId = rowData[x].dwdm;
            }
            setTimeout(() => {
              for (let index = 0; index < this.roleData.length; index++) {
                var role = this.roleData[index];
                var tree = this.$refs.tree[index];
                tree.setCheckedKeys(role.checksedKeys);
              }
            }, 100);
            return resolve(rowData);
          })
          .catch((err) => {
            return resolve([]);
          });
      } else if (node.level == 2) {
        var param = {
          userId: this.$store.getters.userId,
          roleId: this.$store.getters.roleId,
          type: node.level,
        };
        param.dwdm = node.data.dwdm;
        queryDataAuth(param)
          .then((res) => {
            var pyccData = res.data.rows || [];
            for (let x = 0; x < pyccData.length; x++) {
              pyccData[x].label = pyccData[x].pyccName;
              pyccData[x].nodeId = pyccData[x].pycc;
            }
            setTimeout(() => {
              for (let index = 0; index < this.roleData.length; index++) {
                var role = this.roleData[index];
                var tree = this.$refs.tree[index];
                tree.setCheckedKeys(role.checksedKeys);
              }
            }, 100);
            return resolve(pyccData);
          })
          .catch((err) => {
            return resolve([]);
          });
      } else if (node.level == 3) {
        var param = {
          userId: this.$store.getters.userId,
          roleId: this.$store.getters.roleId,
          type: node.level,
        };
        param.pycc = node.data.pycc;
        param.dwdm = node.data.dwdm;
        queryDataAuth(param)
          .then((res) => {
            var rowData = res.data.rows || [];
            for (let x = 0; x < rowData.length; x++) {
              rowData[x].label = rowData[x].bjmc;
              rowData[x].nodeId = rowData[x].bjdm;
            }
            setTimeout(() => {
              for (let index = 0; index < this.roleData.length; index++) {
                var role = this.roleData[index];
                var tree = this.$refs.tree[index];
                tree.setCheckedKeys(role.checksedKeys);
              }
            }, 100);
            return resolve(rowData);
          })
          .catch((err) => {
            return resolve([]);
          });
      } else if (node.level == 4) {
        var param = {
          userId: this.$store.getters.userId,
          roleId: this.$store.getters.roleId,
          type: node.level,
        };
        param.bjdm = node.data.bjdm;
        param.pycc = node.data.pycc;
        param.dwdm = node.data.dwdm;
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
            setTimeout(() => {
              for (let index = 0; index < this.roleData.length; index++) {
                var role = this.roleData[index];
                var tree = this.$refs.tree[index];
                tree.setCheckedKeys(role.checksedKeys);
              }
            }, 100);
            return resolve(stuData);
          })
          .catch((err) => {
            return resolve([]);
          });
      }
    },
    //新增时候角色改变对应的默认权限
    hold() {
      //如果是新增就调用默认的权限接口
      for (let i = 0; i < this.roleData.length; i++) {
        if (this.roleData[i].Edit) {
          let data = {
            userId: this.formName.userId,
            roleId: this.roleData[i].roleId,
          };
          defaultRoleAuth(data).then((res) => {
            this.defaultArr[i] = res.data.rows || []; //对应的新增放入对应的权限
          });
        }
      }
    },
    nodeClick(data, node, nodeVue) {
      var index = -1;
      var param = {
        userId: this.formName.userId,
        type: node.level,
      };
      if (node.level > 5 || node.loaded) {
        return;
      }
      for (let a = 0; a < this.roleData.length; a++) {
        if (this.defaultArr.length == 0 && !this.roleData[a].Edit) {
          //如果是原有数据
          if (node.level == 1) {
            index = this.$refs.tree.indexOf(nodeVue.$parent);
            param.orgType = data.orgType;
          } else if (node.level == 2) {
            index = this.$refs.tree.indexOf(nodeVue.$parent.$parent);
            param.dwdm = data.dwdm;
          } else if (node.level == 3) {
            index = this.$refs.tree.indexOf(nodeVue.$parent.$parent.$parent);
            param.pycc = data.pycc;
            param.dwdm = node.data.dwdm;
          } else if (node.level == 4) {
            index = this.$refs.tree.indexOf(
              nodeVue.$parent.$parent.$parent.$parent
            );
            param.bjdm = node.data.bjdm;
            param.pycc = data.pycc;
            param.dwdm = node.data.dwdm;
          }
          var role = this.roleData[index];
          param.roleId = role.oldRoleId || "";
          if (index < 0 || param.roleId.length == 0) {
            return;
          }
          queryDataAuth(param)
            .then((res) => {
              var resData = res.data.rows || [];
              for (let x = 0; x < resData.length; x++) {
                if (node.level == 0) {
                  // 不同机构
                  var nodeId = resData[x].orgType || "";
                  this.roleData[index].checksedKeys.push(nodeId);
                } else if (node.level == 1) {
                  // 不同学院
                  var nodeId = resData[x].dwdm || "";

                  if (nodeId.length > 0) {
                    var idIndex = this.roleData[index].checksedKeys.indexOf(
                      node.data.nodeId
                    );
                    if (idIndex > -1) {
                      this.roleData[index].checksedKeys.splice(idIndex, 1);
                    }
                    this.roleData[index].checksedKeys.push(nodeId);
                  }
                } else if (node.level == 2) {
                  var nodeId = resData[x].pycc || "";

                  if (nodeId.length > 0) {
                    var idIndex = this.roleData[index].checksedKeys.indexOf(
                      node.data.nodeId
                    );
                    if (idIndex > -1) {
                      this.roleData[index].checksedKeys.splice(idIndex, 1);
                    }
                    this.roleData[index].checksedKeys.push(nodeId);
                  }
                  //   this.roleData[index].checksedKeys.push(nodeId);
                } else if (node.level == 3) {
                  // var three = [];
                  // 不同班级
                  var nodeId = resData[x].bjdm || "";

                  if (nodeId.length > 0) {
                    var idIndex = this.roleData[index].checksedKeys.indexOf(
                      node.data.nodeId
                    );
                    if (idIndex > -1) {
                      this.roleData[index].checksedKeys.splice(idIndex, 1);
                    }
                    this.roleData[index].checksedKeys.push(nodeId);
                  }
                } else if (node.level == 4) {
                  var nodeId = resData[x].xh || "";

                  if (nodeId.length > 0) {
                    var idIndex = this.roleData[index].checksedKeys.indexOf(
                      node.data.nodeId
                    );
                    if (idIndex > -1) {
                      this.roleData[index].checksedKeys.splice(idIndex, 1);
                    }
                    this.roleData[index].checksedKeys.push(nodeId);
                  }
                }
              }

              this.$refs.tree[index].setCheckedKeys(
                this.roleData[index].checksedKeys
              );
            })
            .catch((err) => {});
        } else {
          if (node.level == 1) {
            index = this.$refs.tree.indexOf(nodeVue.$parent);
          } else if (node.level == 2) {
            index = this.$refs.tree.indexOf(nodeVue.$parent.$parent);
          } else if (node.level == 3) {
            index = this.$refs.tree.indexOf(nodeVue.$parent.$parent.$parent);
          } else if (node.level == 4) {
            index = this.$refs.tree.indexOf(
              nodeVue.$parent.$parent.$parent.$parent
            );
          }
          var resData = this.defaultArr[a] || [];
          for (let x = 0; x < resData.length; x++) {
            if (node.level == 0) {
              // 不同机构
              var nodeId = resData[x].orgType || "";

              if (nodeId.length > 0) {
                var idIndex = this.roleData[index].checksedKeys.indexOf(
                  node.data.nodeId
                );
                if (idIndex > -1) {
                  this.roleData[index].checksedKeys.splice(idIndex, 1);
                }
                this.roleData[index].checksedKeys.push(nodeId);
              }
            } else if (node.level == 1) {
              // 不同学院
              var nodeId = resData[x].dwdm || "";

              if (nodeId.length > 0) {
                var idIndex = this.roleData[index].checksedKeys.indexOf(
                  node.data.nodeId
                );
                if (idIndex > -1) {
                  this.roleData[index].checksedKeys.splice(idIndex, 1);
                }
                this.roleData[index].checksedKeys.push(nodeId);
              }
            } else if (node.level == 2) {
              var nodeId = resData[x].pycc || "";

              if (nodeId.length > 0) {
                var idIndex = this.roleData[index].checksedKeys.indexOf(
                  node.data.nodeId
                );
                if (idIndex > -1) {
                  this.roleData[index].checksedKeys.splice(idIndex, 1);
                }
                this.roleData[index].checksedKeys.push(nodeId);
              }
            } else if (node.level == 3) {
              // var three = [];
              // 不同班级
              var nodeId = resData[x].bjdm || "";

              if (nodeId.length > 0) {
                var idIndex = this.roleData[index].checksedKeys.indexOf(
                  node.data.nodeId
                );
                if (idIndex > -1) {
                  this.roleData[index].checksedKeys.splice(idIndex, 1);
                }
                this.roleData[index].checksedKeys.push(nodeId);
              }
            } else if (node.level == 4) {
              var nodeId = resData[x].xh || "";
              //   this.roleData[index].checksedKeys = [];

              if (nodeId.length > 0) {
                var idIndex = this.roleData[index].checksedKeys.indexOf(
                  node.data.nodeId
                );
                if (idIndex > -1) {
                  this.roleData[index].checksedKeys.splice(idIndex, 1);
                }
                this.roleData[index].checksedKeys.push(nodeId);
              }
            }
          }
          this.$refs.tree[index].setCheckedKeys(
            this.roleData[index].checksedKeys
          );
        }
      }
    },

    handleCheckChange(data, checked) {
      // console.log('选中项变动')
      for (let index = 0; index < this.roleData.length; index++) {
        var role = this.roleData[index];
        var tree = this.$refs.tree[index];
        role.checksedKeys = tree.getCheckedKeys();
      }
    },
    // 更新数据权限
    handleDataAuth(role, index) {
      // 参数合法校验
      var roleId = role.roleId || "";
      if (roleId.length == 0) {
        this.$message({
          message: "请选择角色",
          type: "error",
        });
        return;
      }
      var nodes = this.$refs.tree[index].getCheckedNodes() || [];
      if (nodes.length == 0) {
        this.$message({
          message: "请选择数据权限",
          type: "error",
        });
        return;
      }
      // 数据筛选
      var dataArr = [];
      //   console.log("开始筛选权限数据", nodes);
      for (let index = 0; index < nodes.length; index++) {
        var element = nodes[index];
        if (element.visitId == "4") {
          var flag = false;
          for (let x = 0; x < nodes.length; x++) {
            const item = nodes[x];
            if (item.visitId == "3" && item.nodeId == element.bjdm) {
              flag = true;
              break;
            }
          }
          if (flag == false) {
            dataArr.push(element);
          }
        } else if (element.visitId == "3") {
          //班级是否在培养层次
          var hasPy = false;
          for (let i = 0; i < nodes.length; i++) {
            const b = nodes[i];
            if (b.visitId == "2" && b.nodeId == element.pycc) {
              hasPy = true;
              break;
            }
          }
          if (hasPy == false) {
            dataArr.push(element);
          }
        } else if (element.visitId == "2") {
          // 培养层次是否在学院
          var hasxy = false;
          for (let x = 0; x < nodes.length; x++) {
            const item = nodes[x];
            if (item.visitId == "1" && item.nodeId == element.dwdm) {
              hasxy = true;
              break;
            }
          }
          if (hasxy == false) {
            dataArr.push(element);
          }
        } else if (element.visitId == "1") {
          //学院是否在机构
          var hasORG = false;
          for (let i = 0; i < nodes.length; i++) {
            const b = nodes[i];
            if (b.visitId == "0" && b.nodeId == element.orgType) {
              hasORG = true;
              break;
            }
          }
          if (hasORG == false) {
            dataArr.push(element);
          }
        } else {
          dataArr.push(element);
        }
      }
      //   console.log("dataArr", dataArr);
      // 包装数据
      var dataList = [];
      for (let s = 0; s < dataArr.length; s++) {
        var node = dataArr[s];
        var data = {};
        if (node.visitId == "0") {
          //   console.log("node", node);
          data.orgType = node.orgType;
        } else if (node.visitId == "1") {
          //   console.log("node", node);
          //   data.orgType = node.orgType;
          data.orginazationCode = node.dwdm;
        } else if (node.visitId == "2") {
          //   data.orgType = node.orgType;
          data.orginazationCode = node.dwdm;
          data.pycc = node.pycc;
        } else if (node.visitId == "3") {
          //   data.orgType = node.orgType;
          data.orginazationCode = node.dwdm;
          data.pycc = node.pycc;
          data.classNo = node.bjdm;
        } else if (node.visitId == "4") {
          //   data.orgType = node.orgType;
          data.orginazationCode = node.dwdm;
          data.pycc = node.pycc;
          data.classNo = node.bjdm;
          data.stuId = node.xh;
        }
        dataList.push(data);
      }

      // 网络请求
      var param = {
        userId: this.formName.userId,
        newRoleId: role.roleId,
        dataList: dataList,
        operateRoleId: this.$store.getters.roleId,
      };
      if (role.oldRoleId.length > 0 && role.oldRoleId != role.roleId) {
        param.oldRoleId = role.oldRoleId;
      }

      updateDataAuth(param)
        .then((res) => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        })
        .catch((err) => {});
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
