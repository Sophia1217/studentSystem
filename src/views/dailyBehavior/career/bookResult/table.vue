<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学生涯发展与求职咨询登记表</p>
      </div>
      <!-- 学生本人基本情况 -->
      <div class="headline">学生本人基本情况</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ basicInfo.xh }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ basicInfo.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ basicInfo.xb }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学院</div>
                <div class="content">
                  {{ basicInfo.dwmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ basicInfo.zymc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">年级</div>
                <div class="content">
                  {{ basicInfo.nj }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">是否毕业生</div>
                <div class="content">
                  <el-radio-group v-model="detailInfoData.sfbys" disabled>
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">手机</div>
                <div class="content">
                  {{ basicInfo.yddh }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">QQ</div>
                <div class="content">
                  {{ basicInfo.qqhm }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 来访者教育信息 -->
      <div class="headline">来访者教育信息</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">高中就读学校</div>
                <div class="content">
                  {{ basicInfo.gzjdxx }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">高中毕业年份</div>
                <div class="content">
                  {{ basicInfo.gzbynf }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">本（专）科就读学校及专业</div>
                <div class="content">
                  {{ basicInfo.bzkjdxxjzy }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">本（专科）毕业年份</div>
                <div class="content">
                  {{ basicInfo.bzkbynf }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">硕士就读学校及专业</div>
                <div class="content">
                  {{ basicInfo.ssjdxxjzy }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">硕士毕业年份</div>
                <div class="content">
                  {{ basicInfo.ssbynf }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">接受职业资格证书培训情况</div>
                <div class="content">
                  <el-input v-model="detailInfoData.zyzgzs" readonly />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">在教育方面的抱负是怎样的</div>
                <div class="content">
                  <el-input v-model="detailInfoData.jyfmbf" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 来访者实习实践信息 -->
      <div class="headline">来访者实习实践信息</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">实习实践经历1</div>
                <div class="content">
                  <el-input v-model="detailInfoData.sxsjjl1" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">实习实践经历2</div>
                <div class="content">
                  <el-input v-model="detailInfoData.sxsjjl2" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">实习实践经历3</div>
                <div class="content">
                  <el-input v-model="detailInfoData.sxsjjl3" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">特殊爱好</div>
                <div class="content">
                  <el-input v-model="detailInfoData.tsah" readonly />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">休闲兴趣</div>
                <div class="content">
                  <el-input v-model="detailInfoData.xxxq" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">志愿者工作</div>
                <div class="content">
                  <el-input v-model="detailInfoData.zyzgz" readonly />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">其他公益活动</div>
                <div class="content">
                  <el-input v-model="detailInfoData.qtgyhd" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">任学生干部经历</div>
                <div class="content">
                  <el-input v-model="detailInfoData.xsgbjl" readonly />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">其他实践经历</div>
                <div class="content">
                  <el-input v-model="detailInfoData.qtsjjl" readonly />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 来访者生涯发展信息 -->
      <div class="headline">来访者生涯发展信息</div>
      <div class="tableStyle">
        <!-- <div class="pieceName">学生本学年已获资助情况</div> -->
        <div class="inputArea">
          <div class="title">当前生涯抱负</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.dqsybf"
              readonly
            />
          </div>
          <div class="title">
            什么人或事对来访者的生涯（或职业）产生了重大影响？
          </div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.rssyyx"
              readonly
            />
          </div>

          <div class="title">来访者童年时对职业的兴趣或幻想是什么？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.tnzyxq"
              readonly
            />
          </div>
          <div class="title">来访者现在喜欢什么样的休闲活动或爱好？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.xzxxah"
              readonly
            />
          </div>
          <div class="title">来访者过去喜欢什么样的休闲活动或爱好？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.gqxxah"
              readonly
            />
          </div>
          <div class="title">
            来访者是否有任何一种身体缺陷及其对生涯发展产生了什么样的影响？
          </div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.sfstqxyx"
              readonly
            />
          </div>
          <div class="title">对于当前的处境，来访者最满意的是什么？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.dqzmy"
              readonly
            />
          </div>
          <div class="title">对于当前的处境，来访者最不满意的是什么？</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.dqzbmy"
              readonly
            />
          </div>
        </div>
      </div>
      <!-- 来访者关注的问题 -->
      <div class="headline">来访者关注的问题</div>
      <div class="tableStyle">
        <div class="checkbox">
          <el-checkbox-group v-model="detailInfoData.gzwtList">
            <el-checkbox
              v-for="item in gzwtOps"
              :label="item.dm"
              :key="item.dm"
              disabled
            >
              <div>{{ item.mc }}</div>
            </el-checkbox>
          </el-checkbox-group>
          <!-- <checkboxCom
            :objProp="dmxbmOPs"
            @checkedTraining="dmxbmCheck"
            disabled
          ></checkboxCom> -->
        </div>
      </div>
      <!-- </div>采访者心理状态信息 -->
      <div style="flex-direction: column">
        <div class="headline">采访者心理状态信息</div>

        <div class="more" @click="handleMore">
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">外貌</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">整体印象</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.wmZtyx }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.wmZtyx" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">清爽干净</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.wmQsgj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.wmQsgj" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">打扮合适</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.wmDbhs }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.wmDbhs" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">特殊的身体特征</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.wmTssttz }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.wmTssttz" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">行为</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">
                  对咨询师的态度（眼神交流、是否愿意回答问题）
                </div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.xwTd }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.xwTd" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">习惯（抽烟、身体左右摇摆等）</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.xwXg }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.xwXg" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">动作迟缓或坐立不安</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.xwDz }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.xwDz" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">颤栗或痉挛</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.xwZlhjr }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.xwZlhjr" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">明显的残疾（视觉、听觉、运动）</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.xwCj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.xwCj" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">其它不寻常怪癖</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.xwGp }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.xwGp" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">言语</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">发音或沟通有困难</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.yyFykn }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.yyFykn" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">言语有压力或缓慢</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.yyYyhm }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.yyYyhm" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">奇特的言语或用词</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.yyQtyy }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.yyQtyy" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">情绪</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">可观察到的情绪</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.qxKgcqx }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.qxKgcqx" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">情绪是否恰当</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.qxQxsfqd }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.qxQxsfqd" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">心境是否稳定</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.qxXjsfwd }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.qxXjsfwd" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">情感平淡或迟钝</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.qxQgpdhch }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.qxQgpdhch" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">对现实的定位</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">对时间的觉察（年、月、日、时）</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.dwDsjcj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.dwDsjcj" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">对地点的觉察（面谈在哪里进行）</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.dwDddcj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.dwDddcj" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">对人的觉察（咨询师是谁、来访者是谁）</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.dwDrcj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.dwDrcj" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">对情境的觉察（现在正在进行什么）</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.dwDqjcj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.dwDqjcj" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">专心与贯注</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">
                  能够聚焦于刺激（如让来访者颠倒重复3个词语，或重复至少五个不连续的阿拉伯数字）
                </div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.gzCj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.gzCj" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">
                  能够保持注意力（如让来访者从100中减去17）
                </div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.gzZyl }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.gzZyl" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">
                  能够保持警觉并做出反应（或者打瞌睡和/或分神）
                </div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.gzJj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.gzJj" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">思维过程</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">能够进行抽象思维</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swgcCx }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swgcCx" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">想入非非</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swgcXrff }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swgcXrff" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">松散的联想</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swgcSslx }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swgcSslx" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">重复或反复言语</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swgcFfyy }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swgcFfyy" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">思维的连贯或持续性</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swgcLgx }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swgcLgx" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">反应迟钝或混乱</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swgcCd }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swgcCd" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">思维内容</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">自杀观念</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swnrZsgn }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swnrZsgn" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">暴力或攻击性</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swnrBlhgj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swnrBlhgj" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">妄想症</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swnrWxz }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swnrWxz" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">强迫观念或强迫性冲动</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swnrQpgn }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swnrQpgn" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">受迫害的观念</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swnrSph }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swnrSph" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">恐惧或恐怖症</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swnrKj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swnrKj" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">其它显著的思维</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.swnrQtsw }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.swnrQtsw" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">知觉</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">幻觉（列举类型）</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.zjHj }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.zjHj" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">其它异常的感觉经验</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.zjGjjy }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.zjGjjy" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">记忆</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">即时记忆的准确性</div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.jyJszqx }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.jyJszqx" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">
                  短时记忆的准确性（面谈中途对最初面谈时所提供信息的记忆）
                </div>
                <div class="content" v-if="isEdit == 1">
                  {{ tableData.jyDszqx }}
                </div>
                <div class="content" v-else>
                  <el-input v-model="tableData.jyDszqx" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">
                  长时记忆的准确性（对过去几天、几周或几个月之内的信息的记忆）
                </div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.jyCszqx }}</div>
                  <el-input
                    v-else
                    v-model="tableData.jyCszqx"
                    maxlength="100"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">智力</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">教育水平</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.zlJysp }}</div>
                  <el-input v-else v-model="tableData.zlJysp" maxlength="100" />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">词汇量水平</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.zlChl }}</div>
                  <el-input v-else v-model="tableData.zlChl" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">整体智力情况</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.zlZtzl }}</div>
                  <el-input v-else v-model="tableData.zlZtzl" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="backDetail" v-if="isMore">
        <div class="formLeft">
          <div class="title">判断与洞察</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">做决策的能力</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.pdydcJc }}</div>
                  <el-input
                    v-else
                    v-model="tableData.pdydcJc"
                    maxlength="100"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">解决问题的能力</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.pdydcJjwt }}</div>
                  <el-input
                    v-else
                    v-model="tableData.pdydcJjwt"
                    maxlength="100"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">对自身问题的性质的觉察</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.pdydcXzjc }}</div>
                  <el-input
                    v-else
                    v-model="tableData.pdydcXzjc"
                    maxlength="100"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">易冲动性</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.pyddcYcdx }}</div>
                  <el-input
                    v-else
                    v-model="tableData.pyddcYcdx"
                    maxlength="100"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">自我意象的特征（特别是优点和缺点）</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.pdydcZwyx }}</div>
                  <el-input
                    v-else
                    v-model="tableData.pdydcZwyx"
                    maxlength="100"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="headline">采访者的疾病史</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">过去有何种疾病</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.cfzjbsYhzjb }}</div>
                  <el-input v-else v-model="tableData.cfzjbsYhzjb" />
                </div>
              </div>
            </el-col>

            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlelow">
                  疾病和重大事故对来访者的生涯发展产生了怎样的影响？
                </div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.cfzjbsSyfz }}</div>
                  <el-input v-else v-model="tableData.cfzjbsSyfz" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">发生过哪些重大事故</div>
                <div class="content">
                  <div v-if="isEdit == 1">{{ tableData.cfzjbsFsnxzdsg }}</div>
                  <el-input v-else v-model="tableData.cfzjbsFsnxzdsg" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="headline">咨询规划</div>
      <el-form ref="form" :model="tableData" :rules="rules">
        <div class="tableStyle">
          <el-table :data="tableData.zxghList" style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="ghrq" label="规划日期" width="100">
            </el-table-column>
            <el-table-column prop="ghsj" label="规划时间" width="120">
            </el-table-column>

            <el-table-column prop="sjzxrq" label="实际咨询日期">
              <template slot-scope="scope">
                <el-form-item
                  :rules="rules.common"
                  :prop="'zxghList.' + scope.$index + '.sjzxrq'"
                >
                  <div v-if="!scope.row.change || isEdit == 1">
                    {{ scope.row.sjzxrq }}
                  </div>
                  <el-date-picker
                    v-else
                    type="date"
                    placeholder="请选择日期"
                    v-model="scope.row.sjzxrq"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    style="width= 60px;"
                  ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column prop="sjzxsjArr" label="实际咨询时间">
              <template slot-scope="scope">
                <el-form-item
                  :rules="rules.common"
                  :prop="'zxghList.' + scope.$index + '.sjzxsjArr'"
                >
                  <div v-if="!scope.row.change || isEdit == 1">
                    {{ scope.row.sjzxsjArr[0] }}至{{ scope.row.sjzxsjArr[1] }}
                  </div>
                  <el-time-picker
                    v-else
                    is-range
                    v-model="scope.row.sjzxsjArr"
                    format="HH:mm"
                    value-format="HH:mm"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                  >
                  </el-time-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="mtfs" label="面谈方式">
              <template slot-scope="scope">
                <el-form-item
                  :rules="rules.common"
                  :prop="'zxghList.' + scope.$index + '.mtfs'"
                >
                  <div v-if="!scope.row.change || isEdit == 1">
                    {{ scope.row.mtfs }}
                  </div>
                  <el-select
                    v-else
                    v-model="scope.row.mtfs"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="item in mtfsOps"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="过程简述及建议" width="140">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="hadleDetail(scope.row)"
                >
                  <span class="handleName">简述及建议</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <div style="padding: 30px">
        <span> 咨询过程中是否帮来访者修改了简历: </span>
        <el-radio-group v-model="tableData.sfxgjl" :disabled="isEdit == 1">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="editBottom">
      <div class="btn cancel" @click="handleCancle">返回</div>
      <div class="btn confirm" v-if="isEdit == 2" @click="handlUpdata">
        保存
      </div>
    </div>
    <el-dialog
      title="简述及建议"
      :visible.sync="showAdvice"
      width="50%"
      @close="closejy"
    >
      <el-form :model="advice">
        <el-form-item label="过程简述">
          <el-input
            type="textarea"
            :rows="5"
            maxlength="500"
            v-model="advice.js"
            :readonly="!confirmshow || isEdit == 1"
        /></el-form-item>
        <el-form-item label="咨询师建议">
          <el-input
            type="textarea"
            :rows="5"
            maxlength="500"
            v-model="advice.jy"
            :readonly="!confirmshow || isEdit == 1"
        /></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdvice">取 消</el-button>
        <el-button
          type="primary"
          class="confirm"
          @click="confirmAdvice"
          v-show="confirmshow"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CheckboxCom from "../../../components/checkboxCom";
import { InsertJtList, GetDetail } from "@/api/familyDifficulties/table";
import { personalRegis, alterRegis, alterIntro } from "@/api/career/result";
import { getXsJbxx } from "@/api/career/bookStu";
import { getSyfzXsyyDetail } from "@/api/career/bookTea";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  components: { CheckboxCom },
  data() {
    return {
      tableData: {
        zxghList: [
          {
            ghrq: this.$route.query.yyrq,
            ghsj: this.$route.query.yysj,
            sjzxsjArr: [],
            sjzxrq: "",
            sjzxsj: null,
            mtfs: "",
            js: "",
            jy: "",
            change: true,
          },
        ],
      },
      isEdit: this.$route.query.isEdit,
      mtfsOps: ["线上", "线下"],
      nd: "",
      xh: "",
      activeName: "0",
      detailInfoData: {},
      basicInfo: {},
      jtList: [],
      njOptions: [],
      lwjbmOps: [],
      pxjbmOps: [], //培训级别码
      rules: {
        common: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
      },
      confirmshow: true,
      isMore: false,
      dmxbmOPs: {
        // 性别：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      mtfs: "", //1线上，2线下
      yyid: "", //预约排班表id
      gzwtOps: [
        { dm: "1", mc: "1. 渴望提升自己" },
        { dm: "2", mc: "2. 需要生涯决策方面的帮助" },
        { dm: "3", mc: "3. 对于职业选择不确定" },
        { dm: "4", mc: "4. 渴望探索重新定位以及找工作策略" },
        { dm: "5", mc: "5. 需要规划未来" },
        { dm: "6", mc: "6. 需要改变生涯目标" },
        { dm: "7", mc: "7. 需要选择主修专业方面的帮助" },
        { dm: "8", mc: "8. 需要设立长期的生涯目标" },
        { dm: "9", mc: "9. 需要职业方面的信息" },
        { dm: "10", mc: "10. 需要劳动力市场方面的信息" },
        { dm: "11", mc: "11. 需要为毕业求职做好准备" },
        { dm: "12", mc: "12. 需要求职方面的帮助" },
        { dm: "13", mc: "13. 学业或工作压力" },
        {
          dm: "14",
          mc: "14. 已签约毕业生由于工作条件（如工作时间、工作地点等）的原因导致的工作不满意",
        },
        {
          dm: "15",
          mc: "15. 已签约毕业生由于工作职责要求的原因导致的工作不满意",
        },
        {
          dm: "16",
          mc: "16. 由于与朋辈、师长或上司等之间的人际关系导致的工作不满意",
        },
        { dm: "17", mc: "17. 一般的生活不满意" },
        {
          dm: "18",
          mc: "18. 关系方面的压力（如父母、师长、同辈、重要他人，等等）",
        },
      ],
      showAdvice: false,
      advice: {},
    };
  },
  created() {},
  mounted() {
    this.getDetail();
  },
  methods: {
    handleMore() {
      this.isMore = !this.isMore;
    },
    getDetail() {
      getXsJbxx({ xh: this.$route.query.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      getSyfzXsyyDetail({ id: this.$route.query.xxyyId }).then((res) => {
        this.detailInfoData = res.data;
      });
      if (this.$route.query.id) {
        personalRegis(this.$route.query.id).then((res) => {
          this.tableData = res.data.syfzXsjgbReq;
          this.tableData.zxghList = res.data.planRes;
        });
      }
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmlwkwjbm":
            this.lwjbmOps = res.data;
            break;
          case "dmpxjbm":
            this.pxjbmOps = res.data;
            break;
        }
      });
    },
    editButtonClick() {
      this.isEdit = 1;
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.isEdit = 2;
      this.$router.go(-1);
    },
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.form.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    handlUpdata() {
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        if (this.$route.query.id) {
          this.$set(this.tableData, "id", this.$route.query.id);
        }

        this.$set(this.tableData, "xh", this.$route.query.xh);
        this.$set(this.tableData, "xxyyId", this.$route.query.xxyyId);
        this.$set(this.tableData, "xn", this.$route.query.xn);
        this.$set(this.tableData, "xq", this.$route.query.xq);
        let zxghList = this.tableData.zxghList.slice(-1)[0];
        this.$set(this.tableData, "ghrq", zxghList.ghrq);
        this.$set(this.tableData, "ghsj", zxghList.ghsj);
        this.$set(this.tableData, "sjzxrq", zxghList.sjzxrq);

        // this.$set(
        //   this.tableData,
        //   "sjzxsj",
        //   zxghList.sjzxsj[0] + "-" + zxghList.sjzxsj[1]
        // );
        this.$set(this.tableData, "sjzxsjArr", zxghList.sjzxsjArr);
        this.$set(this.tableData, "mtfs", zxghList.mtfs); //1线上，2线下
        let data = this.tableData;

        alterRegis(data)
          .then((res) => {
            this.$message.success("保存成功");
            // this.getDetail();
            this.$router.go(-1);
          })
          .catch((err) => {});
      }
    },
    dmxbmCheck(value) {
      let checkedCount = value.length;
      this.dmxbmOPs.checkAll = checkedCount === this.dmxbmOPs.checkBox.length;
      this.dmxbmOPs.isIndeterminate =
        checkedCount > 0 && checkedCount < this.dmxbmOPs.checkBox.length;
      // console.log(this.dmxbmOPs.choose, "单选");
    },
    cancelAdvice() {
      this.showAdvice = false;
    },
    confirmAdvice() {
      this.$set(this.tableData, "js", this.advice.js);
      this.$set(this.tableData, "jy", this.advice.jy);
      this.showAdvice = false;
      // alterIntro().then((res)=>{
      //   this.$message.success("填写成功！")
      // })
    },
    hadleDetail(row) {
      this.showAdvice = true;
      this.$set(this.advice, "js", row.js);
      this.$set(this.advice, "jy", row.jy);
      if (this.isEdit == 1 || (row.id && !row.change)) {
        this.confirmshow = false;
      } else {
        this.confirmshow = true;
      }
    },
    closejy() {
      this.$set(this.advice, "js", "");
      this.$set(this.advice, "jy", "");
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: row;
  .detail_right {
    flex: 1;
    background: #fff;
    padding: 30px;
    .right_top {
      .toptitle {
        text-align: center;
        font-weight: 500;
        font-size: 24px;
        color: #005657;
        line-height: 24px;
      }
      .timeWrap {
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        color: #383838;
        line-height: 28px;
        .updataTime {
          margin-left: 20px;
        }
      }
    }
    .headline {
      padding-left: 20px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 20px;
      color: #000;
      line-height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .editBtn {
        padding: 4px 5px;
        margin-right: 20px;
        // border: 1px solid #005657;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        color: #005657;
        cursor: pointer;
        .addIcon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/arrowDown.png") no-repeat;
          vertical-align: middle;
          margin-bottom: 4px;
        }
      }
    }
    .more {
      flex: 0 0 100px;
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #000;
      cursor: pointer;
      .moreIcon {
        display: block;
        width: 20px;
        height: 20px;
      }
      .chevronDown {
        background: url("~@/assets/images/chevronDown.png") no-repeat;
      }
      .chevronUp {
        background: url("~@/assets/images/chevronUp.png") no-repeat;
      }
    }
    .tableStyle {
      position: relative;
      padding: 20px;
      .information {
        padding: 0 20px;
        .rowStyle {
          padding: 0 !important;
          margin: 0;
          border-bottom: 1px solid #cccccc;
        }
        .wrap {
          display: flex;
          align-items: center;
          .title {
            flex: 0 0 200px;
            line-height: 48px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            margin: 0 !important;
          }
          .titlelow {
            flex: 0 0 220px;
            line-height: 24px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            color: #707070;
            margin: 0 !important;
          }
          .content {
            font-weight: 400;
            font-size: 14px;
            color: #1f1f1f;
            line-height: 22px;
            margin-left: 16px;
          }
        }
      }
      .pieceName {
        box-sizing: border-box;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        font-size: 18px;
        color: #1f1f1f;
        line-height: 28px;
      }
      .inputArea {
        display: flex;
        flex-direction: column;
        //align-items: center;
        .title {
          //   flex: 0 0 160px;
          //   line-height: 48px;
          //   background: #e0e0e0;
          //   text-align: right;
          //   padding-right: 5px;
          //   margin: 0 !important;
          font-weight: 400;
          font-size: 16px;
          color: #1f1f1f;
          line-height: 22px;
          margin: 16px;
          text-align: left;
        }

        .content {
          .cishu {
            margin-bottom: 10px;
          }
        }
      }
      .tableArea {
        padding-right: 20px;
        padding-left: 20px;
      }
    }
    .backDetail {
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      border-style: solid;
      border-width: 1px;
      border-color: #cccccc;
      .formLeft {
        width: 15%;
        background: #fff;
        display: flex;
        align-items: center;
        .title {
          width: 100%;
          text-align: center;
        }
      }
      .formRight {
        width: 85%;
        .rowStyle {
          padding: 0 !important;
          margin: 0;
          border-bottom: 1px solid #cccccc;
        }
        .wrap {
          display: flex;
          align-items: center;
          .title {
            flex: 0 0 200px;
            line-height: 48px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            margin: 0 !important;
          }
          .titlelow {
            flex: 0 0 200px;
            line-height: 24px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            color: #707070;
            margin: 0 !important;
          }
          .content {
            display: flex;
            font-weight: 400;
            font-size: 14px;
            color: #1f1f1f;
            line-height: 22px;
            margin-left: 16px;
          }
        }
      }
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
    .btn {
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-right: 20px;
    }
    .cancel {
      color: #005657;
    }
    .confirm {
      background: #005657;
      color: #fff;
    }
    .editIcon {
      background: #005657;
      color: #fff;
      // background: url('~@/assets/images/icon_edit_white.png');
    }
  }
  ::v-deep .el-form .el-form-item__error {
    top: 21%;
    right: unset;
    left: 68% !important;
  }
  ::v-deep .el-form .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
