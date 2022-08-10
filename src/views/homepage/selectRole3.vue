<template>
  <div class="selectRole">
    <div class="title">用户角色切换</div>
    <div class="roleCard">
      <div class="arrow">
        <div class="leftarrow">
          <img src="@/assets/images/arrow_left.png" />
        </div>
      </div>
      <div class="cardItem" v-for="(item, index) in user" :key="index">
        <div class="wrap">
          <img src="@/assets/images/role.png" width="60px" alt="" />
          <div class="content">{{ item }}</div>
        </div>
      </div>
      <div class="arrow">
        <div class="rightarrow">
          <img src="@/assets/images/arrow_right.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectRole2",

  data() {
    return { user: ["辅导员", "校级领导", "院级领导", "勤工助学负责人"] };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.selectRole {
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
    justify-content: center;
    flex-wrap: wrap;
    .arrow {
      flex: 0 0 200px;
      height: 200px;
      position: relative;
      display: none;
      .leftarrow {
        width: 80px;
        height: 80px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .rightarrow {
        width: 80px;
        height: 80px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .cardItem {
      flex: 0 0 200px;
      height: 200px;
      margin-right: 20px;
      margin-left: 20px;
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
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 24px;
          width: 200px;
          color: #1f1f1f;
        }
      }
    }
    .cardItem2 {
      flex: 0 0 200px;
      height: 200px;
      margin-right: 30px;
      border-radius: 4px;
      background: #197478;
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
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 24px;
          width: 200px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
