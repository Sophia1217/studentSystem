<template>
    <div class="rowTop">
        <div class="itemTop1">
            <div class="logoImage">
                <img  src="~@/assets/images/logo.png" alt="">
            </div>
            <div class="tt-content">
                <div class="titleTop1"><span class="nameTitle" >华中师范大学学工管理系统</span></div>
            <div class="titleTop2">
                <span class="inglishTitle" >CCNU Student Management System</span>
            </div>
            </div>
        </div>
        <div class="itemTop2">
            <!-- <div class="iconCenter">
                <div class="avatarImage">
                <img  src="~@/assets/images/avatarRight.png" alt="">
                </div>
                <div class="exportImage">
                    <img  src="~@/assets/images/export2.png" alt="">
                </div>
                <div class="newsImage">
                <img  src="~@/assets/images/icon_news.png" alt="">
                </div>
            </div> -->
            
            
            <div class="titleTop3"><span class="welcomeTitle" >{{userName}}，欢迎使用华中师范大学学工系统！</span></div>
        </div>
        <div class="right-menu">
        

            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img src="@/assets/images/avatarRight.png" class="user-avatar">
                <!-- <i class="el-icon-caret-bottom" /> -->
                </div>
                <el-dropdown-menu slot="dropdown">
                <!-- <router-link to="/selectRole"> -->
                    <el-dropdown-item @click.native="change" v-if="canChange">切换角色</el-dropdown-item>
                <!-- </router-link> -->
                <el-dropdown-item  @click.native="logout">
                    <span>退出登录</span>
                </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopTitle',
    data() {
        return {
        // 顶部栏初始数
        visibleNumber: 5,
        // 当前激活菜单的 index
        currentIndex: undefined
        };
    },
    computed: {
        theme() {
            return this.$store.state.settings.theme;
        },
        
        // 所有的路由信息
        routers() {
            return this.$store.state.permission.topbarRouters;
        },
        
        canChange: {
            get() {
                return this.$store.getters.roles.length > 0
            }
        },
        userName : {
            get() {
                return this.$store.getters.name
            }
        },
        
    },
    beforeMount() {
        window.addEventListener('resize', this.setVisibleNumber)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setVisibleNumber)
    },
    mounted() {

    },
    methods: {
        async logout() {
            this.$confirm('确定注销并退出系统吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('LogOut').then(() => {
                    location.href = 'https://account.ccnu.edu.cn/cas/login?service=http://10.222.7.139:8081/sws/checkLogin';
                })
            }).catch(() => {});
        },

        change () {
            location.reload()
        },
    },
}
</script>

<style lang="scss" scoped>
.rowTop{
        position: fixed;
        display: flex;
        background-color: #005657;
        height: 64px;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1001;
    }
    .bg{
        width: 100%;
        height: 277px;
        background: url("~@/assets/images/WechatIMG85.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 30px;
    }
    .row{
        display: flex;
    }
    .headline{

        flex: 1;
        width: 132px;
        height: 22px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .tohead{
        font-weight: 500;
        font-size: 22px;
        color: #005657;
    }
    .itemTop1{
        flex: 0;
        width: 300px;
        height: 64px;
        margin-left: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

    }
    .itemTop2{
        flex: 0;
        width:520px;
        height: 64px;
        margin-left: auto;
        margin-right: 24px;
                
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: center;

    }
    .item{
        flex: 1;
        width: 348px;
        height: 152px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 8px;
    }
    .item2{
        flex: 1;
        width: 348px;
        height: 152px;

        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 15px;

        // align-self: flex-start;

        border-radius: 8px;
    }
    .logoImage{
        width:48px;
        height: 48px;
        vertical-align: middle;
        margin-right: 12px;
        
    }

    .medalImage{
        width: 60px;
        height: 60px;

        vertical-align: middle;
        margin-right: 12px;
    }

    .tt-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        // background-color: #005657;
    }
    .titleTop1{
        width: 212px;
        height: 26px;
    }
    .titleTop2{
        width: 210px;
        height: 20px;
    }
    .titleTop3{
        width: 320px;
        height: 24px;
        
    }
    .nameTitle{
        font-weight: 600;
        font-size: 17.6px;
        color: #FFFFFF;
        font-family: PingFangSC-S0pxibold;
    }
    .inglishTitle{
        font-weight: 400; 
        font-size: 12px; 
        color: #FFFFFF;
        font-family: PingFangSC-Regular;
    }
    .welcomeTitle{
        font-weight: 600; 
        font-size: 16px; 
        font-family: PingFangSC-S0pxibold;
        text-align: right;
        color: #FFFFFF;
    }

    .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 12px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>