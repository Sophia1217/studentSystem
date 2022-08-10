
<template>
   <div class="selectRole4">
    <div class="title">用户角色切换</div>
    <div class="roleCard">
      <div class="cardItem">
        <div class="wrap">
          <img src="@/assets/images/role.png" width="60px" alt="" />
          <div class="content">辅导员</div>
        </div>
      </div>
      <div class="cardItem">
        <div class="wrap">
          <img src="@/assets/images/role.png" width="60px" alt="" />
          <div class="content">校级领导</div>
        </div>
      </div>  
      <div class="cardItem">
        <div class="wrap">
          <img src="@/assets/images/role.png" width="60px" alt="" />
          <div class="content">勤工助学负责人</div>
        </div>
      </div>
      <div class="cardItem">
        <div class="wrap">
          <img src="@/assets/images/role.png" width="60px" alt="" />
          <div class="content">院校领导</div>
        </div>
      </div>

    </div>

  </div> 
</template>

<script>
export default {
  name: "selectRole4",

   data() {
    return {};
  },

  mounted() {},

  methods: {}, 
};
</script>

<style lang="scss" scoped>
.selectRole4 {
  width: 100%;
  height: calc(100vh - 124px);
  background: url("~@/assets/images/selectBack.png") no-repeat;
  background-size: 100% 100%;
  .title {
    font-family: DOUYU-Font;
    font-weight: Font;
    font-size: 40px;
    color: #ffffff;
    text-align: center;
    padding-top: 180px;
  }
  .roleCard {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .cardItem {
      flex: 0 0 200px;
      height: 200px;
      margin-right: 25px;
      border-radius: 4px;
      background: #ffffff;
      position: relative;
      margin-bottom: 20px;
      .wrap {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        img {
          margin-bottom: 20px;
        }
        .content {
          font-weight: 500;
          font-size: 24px;
          color: #1f1f1f;
        }
      }
    }
  }

}
</style>