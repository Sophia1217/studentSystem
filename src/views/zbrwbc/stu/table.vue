<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle" v-if="sqlxm == 2">应征入伍学费补偿申请表</p>
        <p class="toptitle" v-if="sqlxm == 1">退役士兵学费补偿申请表</p>
      </div>

      <!-- 学生本人基本情况 -->
      <div class="headline">学生本人基本情况</div>
      <div class="tableStyle">
        <div class="imgWrap">
          <div class="photo">
            <img
              :src="
                detailInfoData
                  ? 'data:image/png;base64,' + detailInfoData.byzp
                  : ''
              "
              alt="照片"
            />
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ xsjbxx.xh }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ xsjbxx.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ xsjbxx.xbmc }}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ xsjbxx.zzmmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">出生年月</div>
                <div class="content">
                  {{ xsjbxx.csrq }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">身份证号</div>
                <div class="content">
                  {{ xsjbxx.sfzh }}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">院系</div>
                <div class="content">
                  {{ xsjbxx.pydwmc }}
                </div>
              </div>
            </el-col>

            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ xsjbxx.zydmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">班级</div>
                <div class="content">
                  {{ xsjbxx.bjdmmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16" class="rowStyle">
              <div class="wrap">
                <div class="title">现住址</div>
                <div class="content">
                  {{ xsjbxx.xzz }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">联系电话</div>
                <div class="content">
                  {{ xsjbxx.lxdh }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16" class="rowStyle">
              <div class="wrap">
                <div class="title">就读高校</div>
                <div class="content">
                  {{ xsjbxx.jdgx }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">高校隶属关系</div>
                <div class="content">
                  <el-radio-group v-model="xsjbxx.gxlsgx" disabled>
                    <el-radio label="1" size="large">中央</el-radio>
                    <el-radio label="2" size="large">地方</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-form ref="formAdd" :model="detailInfoData">
        <!-- 申请类型 -->
        <div class="headline" v-if="sqlxm == 1">
          <div>申请类型</div>
        </div>

        <div class="tableStyle" v-if="sqlxm == 1">
          <div class="inputArea" style="margin-bottom: 20px">
            <el-form-item
              prop="sfdq"
              :rules="rules.wenzi"
              style="width: 300px"
              :disabled="flag != 1"
            >
              <el-radio-group v-model="detailInfoData.jtsqlxm">
                <el-radio label="1" size="large">退役复学</el-radio>
                <el-radio label="2" size="large">退役入学</el-radio>
              </el-radio-group></el-form-item
            >
          </div>
        </div>
        <!-- 申请补偿或代偿 -->
        <div class="headline" v-if="sqlxm == 2">
          <div>申请补偿或代偿</div>
        </div>

        <div class="tableStyle" v-if="sqlxm == 2">
          <div class="inputArea" style="margin-bottom: 20px">
            <el-form-item prop="jtsqlxm" :rules="rules.wenzi">
              <el-radio-group
                v-model="detailInfoData.jtsqlxm"
                @change="changeSQLX"
                :disabled="flag != 1"
              >
                <el-radio label="1" size="large">学费补偿</el-radio>
                <el-radio label="2" size="large">国家助学贷款代偿</el-radio>
              </el-radio-group></el-form-item
            >
          </div>
          <div class="information" v-show="detailInfoData.jtsqlxm == 1">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">应缴纳学费金额总计（元）</div>
                  <div class="content" v-if="flag == 1">
                    <el-input-number
                      v-model="detailInfoData.yjnxfjezj"
                      :min="0"
                      :max="99999999"
                      controls-position="right"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.gxgjzxdkbj }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="information" v-show="detailInfoData.jtsqlxm == 2">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="titlesmall">高校国家助学贷款本金（元）</div>
                  <div class="content" v-if="flag == 1">
                    <el-input-number
                      v-model="detailInfoData.gxgjzxdkbj"
                      :min="0"
                      :max="99999999"
                      controls-position="right"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.gxgjzxdkbj }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="titlesmall">生源地信用助学贷款本金（元）</div>
                  <div class="content" v-if="flag == 1">
                    <el-input-number
                      v-model="detailInfoData.sydxyzxdkbj"
                      :min="0"
                      :max="99999999"
                      controls-position="right"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.sydxyzxdkbj }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 就学和服役情况 -->
        <div class="headline" v-if="sqlxm == 1">就学和服役情况</div>
        <div class="tableStyle" v-if="sqlxm == 1">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">考入本校年月</div>
                  <div class="content" v-if="flag == 1">
                    <el-form-item prop="krbxny" :rules="rules.common">
                      <el-date-picker
                        type="date"
                        v-model="detailInfoData.krbxny"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.krbxny }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">参加何种考试考入</div>
                  <div class="content" v-if="flag == 1">
                    <el-form-item prop="cjhzkskrm" :rules="rules.common">
                      <el-select v-model="detailInfoData.cjhzkskrm">
                        <el-option
                          v-for="(item, index) in kslxOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.cjhzkskr }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">服役前最高学历</div>
                  <div class="content" v-if="flag == 1">
                    <el-form-item prop="fyqzgxlm" :rules="rules.common">
                      <el-select v-model="detailInfoData.fyqzgxlm">
                        <el-option
                          v-for="(item, index) in zgxlOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.fyqzgxl }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">入伍时间</div>
                  <el-form-item prop="rwsj" :rules="rules.common">
                    <div class="content" v-if="flag == 1">
                      <el-date-picker
                        type="date"
                        v-model="detailInfoData.rwsj"
                        value-format="yyyy-MM-dd"
                      />
                    </div>
                    <div class="content" v-else>
                      {{ detailInfoData.rwsj }}
                    </div>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">退役时间</div>
                  <div class="content" v-if="flag == 1">
                    <el-form-item prop="twsj" :rules="rules.common">
                      <el-date-picker
                        type="date"
                        v-model="detailInfoData.twsj"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.twsj }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">复学时间</div>
                  <div class="content" v-if="flag == 1">
                    <el-form-item prop="fxsj" :rules="rules.common">
                      <el-date-picker
                        type="date"
                        v-model="detailInfoData.fxsj"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.fxsj }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">退役身份</div>
                  <div class="content" v-if="flag == 1">
                    <el-form-item prop="tysf" :rules="rules.common">
                      <el-select v-model="detailInfoData.tysf">
                        <el-option
                          v-for="(item, index) in tysfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.tysf }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">现阶段就读学历层次</div>
                  <div class="content" v-if="flag == 1">
                    <el-form-item prop="xjdjdxlccm" :rules="rules.common">
                      <el-select v-model="detailInfoData.xjdjdxlccm">
                        <el-option
                          v-for="(item, index) in jdxlOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xjdjdxlcc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否自主就业</div>
                  <div class="content">
                    <el-form-item
                      prop="sfzzjym"
                      :rules="rules.wenzi"
                      style="width: 300px"
                    >
                      <el-radio-group
                        v-model="detailInfoData.sfzzjym"
                        :disable="flag != 1"
                      >
                        <el-radio label="1" size="large">是</el-radio>
                        <el-radio label="2" size="large">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="titlesmall">考入本校前是否享受过本政策资助</div>
                  <div class="content">
                    <el-form-item
                      prop="sfxszzm"
                      :rules="rules.wenzi"
                      style="width: 300px"
                    >
                      <el-radio-group
                        v-model="detailInfoData.sfxszzm"
                        :disable="flag != 1"
                      >
                        <el-radio label="1" size="large">是</el-radio>
                        <el-radio label="2" size="large">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 申请学费减免情况 -->
        <div class="headline" v-if="sqlxm == 1">申请学费减免情况</div>
        <div class="tableStyle" v-if="sqlxm == 1">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学制年限</div>
                  <div class="content">{{ xsjbxx.xz }}年</div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">剩余就读年限</div>
                  <div class="content" v-if="flag == 1">
                    <el-form-item prop="syjdnx" :rules="rules.common">
                      <el-input-number
                        v-model="detailInfoData.syjdnx"
                        :min="0"
                        :max="Number(xsjbxx.xz)"
                        controls-position="right"
                      />
                    </el-form-item>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.syjdnx }}年
                  </div>
                </div>
              </el-col>

              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">申请减免总计（元）</div>
                  <div class="content">{{ detailInfoData.sqjezj }}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">第一学年</div>
                  <div class="content" v-if="flag == 1">
                    <!-- <el-form-item prop="xnxfbzList[0].xn" :rules="rules.common"> -->
                    <el-select v-model="detailInfoData.xnxfbzList[0].xn">
                      <el-option
                        v-for="(item, index) in xnOptions"
                        :key="index"
                        :label="item.mc"
                        :value="item.mc"
                      ></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[0].xn }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学费（元）</div>
                  <div class="content" v-if="flag == 1">
                    <el-input-number
                      v-model="detailInfoData.xnxfbzList[0].xf"
                      :min="0"
                      :max="99999999"
                      controls-position="right"
                      @change="countXF"
                      :disabled="!detailInfoData.xnxfbzList[0].xn"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[0].xf }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div class="content" v-if="flag == 1">
                    <el-input
                      v-model="detailInfoData.xnxfbzList[0].bz"
                      maxlength="100"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[0].bz }}
                  </div>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">第二学年</div>
                  <div class="content" v-if="flag == 1">
                    <el-select v-model="detailInfoData.xnxfbzList[1].xn">
                      <el-option
                        v-for="(item, index) in xnOptions"
                        :key="index"
                        :label="item.mc"
                        :value="item.mc"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[1].xn }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学费（元）</div>
                  <div class="content" v-if="flag == 1">
                    <el-input-number
                      v-model="detailInfoData.xnxfbzList[1].xf"
                      :min="0"
                      :max="99999999"
                      controls-position="right"
                      @change="countXF"
                      :disabled="!detailInfoData.xnxfbzList[1].xn"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[1].xf }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div class="content" v-if="flag == 1">
                    <el-input
                      v-model="detailInfoData.xnxfbzList[1].bz"
                      maxlength="100"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[1].bz }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">第三学年</div>
                  <div class="content" v-if="flag == 1">
                    <el-select v-model="detailInfoData.xnxfbzList[2].xn">
                      <el-option
                        v-for="(item, index) in xnOptions"
                        :key="index"
                        :label="item.mc"
                        :value="item.mc"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[2].xn }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学费（元）</div>
                  <div class="content" v-if="flag == 1">
                    <el-input-number
                      v-model="detailInfoData.xnxfbzList[2].xf"
                      :min="0"
                      :max="99999999"
                      controls-position="right"
                      @change="countXF"
                      :disabled="!detailInfoData.xnxfbzList[2].xn"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[2].xf }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div class="content" v-if="flag == 1">
                    <el-input
                      v-model="detailInfoData.xnxfbzList[2].bz"
                      maxlength="100"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[2].bz }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">第四学年</div>
                  <div class="content" v-if="flag == 1">
                    <el-select v-model="detailInfoData.xnxfbzList[3].xn">
                      <el-option
                        v-for="(item, index) in xnOptions"
                        :key="index"
                        :label="item.mc"
                        :value="item.mc"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[3].xn }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学费（元）</div>
                  <div class="content" v-if="flag == 1">
                    <el-input-number
                      v-model="detailInfoData.xnxfbzList[3].xf"
                      :min="0"
                      :max="99999999"
                      controls-position="right"
                      @change="countXF"
                      :disabled="!detailInfoData.xnxfbzList[3].xn"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[3].xf }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div class="content" v-if="flag == 1">
                    <el-input
                      v-model="detailInfoData.xnxfbzList[3].bz"
                      maxlength="100"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[3].bz }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">第五学年</div>
                  <div class="content" v-if="flag == 1">
                    <el-select v-model="detailInfoData.xnxfbzList[4].xn">
                      <el-option
                        v-for="(item, index) in xnOptions"
                        :key="index"
                        :label="item.mc"
                        :value="item.mc"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[4].xn }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学费（元）</div>
                  <div class="content" v-if="flag == 1">
                    <el-input-number
                      v-model="detailInfoData.xnxfbzList[4].xf"
                      :min="0"
                      :max="99999999"
                      controls-position="right"
                      @change="countXF"
                      :disabled="!detailInfoData.xnxfbzList[4].xn"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[4].zf }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div class="content" v-if="flag == 1">
                    <el-input
                      v-model="detailInfoData.xnxfbzList[4].bz"
                      maxlength="100"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.xnxfbzList[4].bz }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div></el-form
      >
      <!-- 历史缴纳学费信息 -->
      <div class="headline" v-if="sqlxm == 2">历史缴纳学费信息</div>
      <div class="tableStyle" v-if="sqlxm == 2">
        <div class="information" v-for="(item, index) in xfxxList" :key="index">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">{{ item.xn }}</div>
                <div class="content">{{ item.je }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 历史贷款信息 -->
      <div class="headline" v-if="sqlxm == 2">历史贷款信息</div>
      <div class="tableStyle" style="margin-bottom: 20px" v-if="sqlxm == 2">
        <div class="information" v-for="(item, index) in dkxxList" :key="index">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款学年</div>
                <div class="content">{{ item.xn }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款总金额（元）</div>
                <div class="content">{{ item.dkzje }}</div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款类型</div>
                <div class="content">{{ item.dklxmc }}</div>
              </div>
            </el-col>

            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款银行</div>
                <div class="content">{{ item.dkyh }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">合同编号</div>
                <div class="content">{{ item.htbh }}</div>
              </div>
            </el-col>

            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款开始时间</div>
                <div class="content">{{ item.dkkssj }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="information" v-show="dkxxList.length == 0">暂无</div>
      </div>
    </div>

    <div class="editBottom">
      <div class="btn cancel" v-if="isEdit == 1" @click="lctClick">
        审核记录
      </div>
      <div class="btn cancel" @click="handleCancle">返回</div>
      <div class="btn confirm" v-if="flag == 1" @click="handlUpdata">保存</div>
    </div>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
import {
  getZbrwXsjbxx,
  getZbrwDteail,
  insert,
  queryZbrwXn,
  getXsXfDkxx,
} from "@/api/zbrw/zbrw";

import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import lctCom from "../../../components/lct";
export default {
  components: { lctCom },
  data() {
    return {
      isEdit: this.$route.query.isEdit,

      xh: this.$store.getters.userId,
      lctModal: false,
      flag:
        this.$route.query.status == "01" ||
        this.$route.query.status == "08" ||
        !this.$route.query.status
          ? 1
          : 2,
      xsjbxx: {},
      detailInfoData: {
        xnxfbzList: [
          { xn: "", xf: "", bz: "" },
          { xn: "", xf: "", bz: "" },
          { xn: "", xf: "", bz: "" },
          { xn: "", xf: "", bz: "" },
          { xn: "", xf: "", bz: "" },
        ],
      },
      kslxOps: [],
      zgxlOps: [],
      jdxlOps: [],
      tysfOps: [],
      sqlbOps: [],
      xnOptions: [],
      dkxxList: [],
      xfxxList: [],
      rules: {
        common: [
          {
            required: true,
            message: " ",
            trigger: "change",
          },
        ],
        wenzi: [
          {
            required: true,
            message: "不能为空 ",
            trigger: "change",
          },
        ],
      },
      sqlxm: this.$route.query.sqlxm,
    };
  },
  created() {},
  mounted() {
    this.getCode("dmzbrwkslxm");
    this.getCode("dmzbrwzgxlm");
    this.getCode("dmzbrwxlccm");
    this.getCode("dmzbrwtysfm");
    this.getDetail();
  },
  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmzbrwkslxm":
            this.kslxOps = res.data;
            break;
          case "dmzbrwzgxlm":
            this.zgxlOps = res.data;
            break;
          case "dmzbrwxlccm":
            this.jdxlOps = res.data;
            break;
          case "dmzbrwtysfm":
            this.tysfOps = res.data;
            break;
        }
      });
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick() {
      if (!!this.$route.query.processid) {
        this.$refs.child.inner(this.$route.query.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    editButtonClick() {
      this.isEdit = 1;
    },
    getDetail() {
      queryZbrwXn().then((res) => {
        this.xnOptions = res.data;
      });
      getZbrwXsjbxx({ xh: this.xh }).then((res) => {
        this.xsjbxx = res.data;
      });
      if (this.$route.query.id) {
        getZbrwDteail({ id: this.$route.query.id, sqlxm: this.sqlxm }).then(
          (res) => {
            this.detailInfoData = res.data;
          }
        );
      }
      if (this.sqlxm == 2) {
        getXsXfDkxx({ xh: this.xh }).then((res) => {
          this.dkxxList = res.data.dkxx;
          this.xfxxList = res.data.xfxx;
        });
      }
    },

    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.$router.go(-1);
    },
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    handlUpdata() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
      } else if (!this.detailInfoData.xnxfbzList[0].xn && this.sqlxm == 1) {
        this.$message.error("请至少填写一学年的学费申请！");
      } else {
        // for (let i = 0; i < this.detailInfoData.xnxfbzList.length; i++) {
        //   if (
        //     this.detailInfoData.xnxfbzList[i].xn ^
        //       this.detailInfoData.xnxfbzList[i].xf ||
        //     (!this.detailInfoData.xnxfbzList[i].xn &&
        //       this.detailInfoData.xnxfbzList[i].xf == 0)
        //   ) {
        this.$set(this.detailInfoData, "xh", this.xh);
        this.$set(this.detailInfoData, "xm", this.xsjbxx.xm);
        this.$set(this.detailInfoData, "sqlxm", this.sqlxm);
        let data = this.detailInfoData;
        //     console.log(2222);
        insert(data)
          .then((res) => {
            this.$message.success("保存成功");
            this.$router.go(-1);
          })
          .catch((err) => {});
        //} else this.$message.error("第" + (i + 1) + "学年学费不能为空！");
        //}
      }
    },
    jia(row, index) {
      var obj = {
        jx: "",
        je: 0,
        px: Number(this.detailInfoData.jxdjList.length) + 1,
      };
      this.detailInfoData.jxdjList.push(obj);
    },
    jian(row, index) {
      this.detailInfoData.jxdjList.splice(index, 1);
    },
    countXF() {
      var num = 0;
      for (let i = 0; i < this.detailInfoData.xnxfbzList.length; i++) {
        num = num + this.detailInfoData.xnxfbzList[i].xf;
      }
      this.$set(this.detailInfoData, "sqjezj", num || 0);
    },
    changeSQLX() {
      this.detailInfoData.yjnxfjezj = 0;
      this.detailInfoData.gxgjzxdkbj = 0;
      this.detailInfoData.sydxyzxdkbj = 0;
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

    .tableStyle {
      position: relative;
      padding: 20px;
      .imgWrap {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 100;
        .photo {
          width: 160px;
          height: 206px;
          background: #fff;
          overflow: hidden;
          img {
            width: 160px;
            height: 206px;
          }
        }
      }
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
            color: #1f1f1f;
            margin: 0 !important;
          }
          .titlesmall {
            flex: 0 0 200px;
            line-height: 24px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            margin: 0 !important;
          }
          .content {
            font-weight: 400;
            font-size: 14px;
            color: #1f1f1f;
            line-height: 22px;
            margin-left: 16px;
          }
          .jia {
            margin-top: 9px;
            background: url("~@/assets/images/jia.png") no-repeat;
          }

          .jian {
            margin-top: 9px;
            background: url("~@/assets/images/jian.png") no-repeat;
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
