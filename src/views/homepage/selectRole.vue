<template>
  <div class="selectRole">
    <div class="title">用户角色切换</div>
    <div class="roleCard">
      <button class="arrow" @click="navPrev" v-show="user.length > 4">
        <img src="@/assets/images/arrow_left.png" />
      </button>

      <div class="slideArea" ref="slideArea">
        <div
          class="cardItem"
          v-for="(item, index) in user"
          :key="index"
          :style="{ transform: 'translateX(' + move + 'px)' }"
          :class="isActived === index ? 'green-bg' : ''"
          @mouseenter="mouseOver(index)"
          @mouseleave="mouseLeave"
        >
          <div class="wrap">
            <img src="@/assets/images/role.png" width="60px" alt="" />
            <div class="content">{{ item }}</div>
          </div>
        </div>
      </div>
      <button class="arrow" @click="navNext" v-show="user.length > 4">
        <img src="@/assets/images/arrow_right.png" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: [1, 2, 3, 4, 5, 6, 7, 8],
      isActived: "",
      move: 460,
      dataNavListRealWidth: 0,
      dataNavListViewWidth: 0,
    };
  },
  mounted() {},
  methods: {
    mouseOver: function (index) {
      console.log(index);
      this.isActived = index;
    },
    mouseLeave: function () {
      console.log("NULL");
      this.isActived = "";
    },

    navPrev() {
      if (this.move < 460) {
        this.move = this.move + 230;
      } else {
        //this.move = 460;
        this.move = this.move;
      }
    },

    navNext() {
      if (this.move > -460) {
        this.move = this.move - 230;
      } else {
        this.move = 460;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selectRole {
  width: 100%;
  height: 100%;
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
    // flex-wrap: wrap;
    .arrow {
      margin-top: 60px;
      margin-bottom: 60px;
      width: 80px;
      height: 80px;
      background-color: transparent;
      border: none;
    }
    .slideArea {
      display: flex;
      justify-content: center;
      overflow: hidden;
      width: 920px;
      height: 200px;
      .cardItem {
        flex: 0 0 200px;
        height: 200px;
        margin-right: 15px;
        margin-left: 15px;
        border-radius: 4px;
        background: #ffffff;
        position: relative;
        margin-bottom: 20px;
        transition: transform 0.1s;
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
      .green-bg {
        background: #197478;
        .wrap {
          .content {
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
