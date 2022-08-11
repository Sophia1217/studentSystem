<template>
  <div class="selectRole">
    <div class="title">用户角色切换</div>
    <div class="roleCard">
      <div class="cardItem" v-for="(item, index) in user" :key="index">
        <div class="wrap">
          <img src="@/assets/images/role.png" width="60px" alt="" />
          <div class="content">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectRole2",

  data() {
    return {
      user: ["辅导员", "班主任"],
    };
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
    .cardItem {
      flex: 0 0 200px;
      height: 200px;
      margin-right: 30px;
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
          color: #1f1f1f;
        }
      }
    }
  }
}
</style>
