<template>
  <div class="selectRole">
    <div class="roleMajor">
      <div class="title">用户角色切换</div>
      <div class="roleCard">
        <button class="arrow" @click="navPrev" v-show="user.length > 4">
          <img src="@/assets/images/arrow_left.png" />
        </button>

        <div
          class="slideArea"
          ref="slideArea"
          v-show="user.length <= 4 && user.length > 0"
        >
          <div
            class="cardItem"
            v-for="(item, index) in user"
            :key="index"
            :style="{ transform: 'translateX(' + move + 'px)' }"
            :class="isActived === index ? 'green-bg' : ''"
            @mouseenter="mouseOver(index)"
            @mouseleave="mouseLeave"
            @click="handleClick(item)"
          >
            <div class="wrap">
              <img src="@/assets/images/role.png" width="60px" alt="" />
            </div>
            <div class="content">{{ item.roleName }}</div>
          </div>
        </div>
        <div class="slideArea2" ref="slideArea2" v-show="user.length > 4">
          <div
            class="cardItem"
            v-for="(item, index) in user"
            :key="index"
            :style="{ transform: 'translateX(' + move + 'px)' }"
            :class="isActived === index ? 'green-bg' : ''"
            @mouseenter="mouseOver(index)"
            @mouseleave="mouseLeave"
            @click="handleClick(item)"
          >
            <div class="wrap">
              <img src="@/assets/images/role.png" width="60px" alt="" />
              <div class="content">{{ item.roleName }}</div>
            </div>
          </div>
        </div>
        <button class="arrow" @click="navNext" v-show="user.length > 4">
          <img src="@/assets/images/arrow_right.png" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      user: [],
      //user: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      isActived: "",
      move: 0,
      //dataNavListRealWidth: 0,
      //dataNavListViewWidth: 0,
    };
  },
  mounted() {
    store
      .dispatch("GetInfo")
      .then((res) => {
        var roles = res.row || [];
        if (roles.length > 1) {
          // 多个角色
          this.user = roles;
          if (roles.length > 4) {
            this.move = 0;
          }
        } else {
          this.$router.push("/");
        }
      })
      .catch((err) => {
        store.dispatch("LogOut").then(() => {
          Message.error(err);
          this.$router.push("/");
        });
      });
  },
  methods: {
    handleClick(item) {
      store.dispatch("SaveRole", item);
      if (item.roleType == 2) {
        // 管理员
        store.dispatch("GenerateRoutes", item.roleId).then(() => {
          this.$router.push({ path: "/", replace: true });
        });
      } else if (item.roleType == 1) {
        // 学生
        store.dispatch("GenerateRoutes", item.roleId).then(() => {
          this.$router.push({ path: "/studentHomePage", replace: true });
        });
      } else {
        // 普通老师 item.roleType == 0
        store.dispatch("GenerateRoutes", item.roleId).then(() => {
          this.$router.push({ path: "/", replace: true });
        });
      }
    },
    mouseOver: function (index) {
      //   console.log(index);
      this.isActived = index;
    },
    mouseLeave: function () {
      //   console.log("NULL");
      this.isActived = "";
    },

    navPrev() {
      if (this.move < 0) {
        this.move = this.move + 230;
      } else {
        //this.move = 460;
        this.move = this.move;
      }
    },

    navNext() {
      if (this.move > -(this.user.length - 4) * 230) {
        this.move = this.move - 230;
      } else {
        this.move = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selectRole {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url("~@/assets/images/selectBack.png") no-repeat;
  background-size: cover;

  .roleMajor {
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
          }
          .content {
            position: absolute;
            left: 50%;
            top: 75%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 24px;
            width: 200px;
            color: #1f1f1f;
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
      .slideArea2 {
        display: flex;
        justify-content: left;
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
          }
          .content {
            position: absolute;
            left: 50%;
            top: 80%;
            transform: translate(-50%, 0);
            text-align: center;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 24px;
            width: 200px;
            color: #1f1f1f;
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
}
</style>
