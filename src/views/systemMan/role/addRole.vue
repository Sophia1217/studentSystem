<template>
  <div class="addRole">
    <div>
      <el-form :model="queryParams" ref="queryParams" class="queryForm" size="small" :inline="true"
        label-width="68px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryParams.roleName" size="small" :disabled="isEdit==2" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="roleDic">
          <el-input v-model="queryParams.roleDic" size="small" :disabled="isEdit==2" placeholder="请输入权限描述"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="roleState">
          <el-switch v-model="queryParams.roleState" active-color="#23AD6F" inactive-color="#E0E0E0" :disabled="isEdit==2"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="permissions">
      <div class="perName">功能权限</div>
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
    </div>

    <div class="editBottom">
      <div class="btn cancel"> <i class="icon noIcon"></i> 取消</div>
      <div class="btn confirm"> <i class="icon yesIcon"></i> 提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询参数
      queryParams: {
        roleName: '',
        roleState:'',
        roleDic:'',
      },
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
        }],
      defaultProps:[],
      isEdit: ''
    };
  },

  mounted() {
    this.isEdit = this.$route.query.isEdit
    console.log(this.isEdit)
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.addRole{
  .permissions{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    background: #fff;
    padding:20px;
    height: calc(100vh - 250px);
    .perName{
      font-weight: 600;
      font-size: 14px;
      color: #1F1F1F;
      line-height: 28px;
      margin-right: 20px;
    }
  }
  .editBottom{
    width:100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.10), 0 -2px 6px -1px rgba(0,0,0,0.20);
    position: fixed;
    bottom:0;
    left:0;
    z-index:100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn{
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-right: 20px;
      .icon{
        display: inline-block;
        width:20px;
        height:20px;
        vertical-align: middle;
        margin-right: 5px;
      }
      .noIcon{
        background: url('~@/assets/images/no.png');
      }
      .yesIcon{
        background: url('~@/assets/images/yesW.png');
      }
    }
    .cancel{
      color: #005657;
    }
    .confirm{
      background: #005657;
      color:#fff;
    }
  }
}
</style>