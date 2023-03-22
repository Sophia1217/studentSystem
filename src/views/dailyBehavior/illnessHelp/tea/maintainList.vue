<template>
  <div class="talkRec">
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入"
          v-model.trim="searchVal"
          class="inputSelect"
          clearable
        >
          <el-select
            v-model="select"
            @change="changeSelect"
            class="elSelect"
            slot="prepend"
            placeholder="请选择查询条件"
          >
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span>{{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20" class="mt15">
          <el-col :span="6">
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.dwh"
              multiple
              collapse-tags
              @change="changeXY"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in allDwh"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>专<span v-html="'\u3000\u3000'"></span>业：</span>
            <el-select
              v-model="moreIform.zydm"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in zyOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.bjm"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in bjOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>申请时间：</span>
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="datePicker"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width= 60px;"
            ></el-date-picker>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="3">培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="training"
                @training="handleCheckAllChangeTraining"
                @checkedTraining="handleCheckedCitiesChangeTraining"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row> -->
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">大病救助结果列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderRed" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns fullGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" width="100" sortable>
          </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85" sortable>
          </el-table-column>
          <el-table-column
            prop="dwhmc"
            label="培养单位"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column prop="zydmmc" label="专业" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="bjmmc" label="班级" min-width="100" sortable>
          </el-table-column>
          <el-table-column
            prop="sqJe"
            label="申请金额（元）"
            min-width="135"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sqsj"
            label="申请时间"
            min-width="100"
            sortable
          >
          </el-table-column>
          <!-- <el-table-column property="fjName" label="申请附件" width="140">
            <template slot-scope="scope">
              <div class="moban">
                <div class="content">
                  <el-button
                    type="text"
                    size="small"
                    @click="xzWj(scope.row, 1)"
                  >
                    <span class="handleName">{{ scope.row.fjName }}</span>
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            prop="statusChinese"
            label="状态"
            min-width="100"
            sortable
          >
          </el-table-column> -->
          <!-- <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column> -->

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申报详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="申报详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="50%"
      >
        <template>
          <div class="baseInfo">
            <el-form :model="formEdit">
              <div class="formLeft"><span class="title">基本信息</span></div>
              <div class="backDetail">
                <div class="formRight">
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">学号</div>
                        <div class="content">{{ basicInfo.xh }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">姓名</div>
                        <div class="content">{{ basicInfo.xm }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养层次</div>
                        <div class="content">{{ basicInfo.pyccmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养单位</div>
                        <div class="content">{{ basicInfo.dwhmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">专业</div>
                        <div class="content">{{ basicInfo.zydmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">年级</div>
                        <div class="content">{{ basicInfo.nj }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">班级</div>
                        <div class="content">{{ basicInfo.bjmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">困难等级</div>
                        <div class="content">{{ basicInfo.kndjMc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="formLeft"><span class="title">申请记录</span></div>
              <el-table :data="formEdit.jzList">
                <el-table-column
                  fixed="left"
                  type="index"
                  label="序号"
                  width="50"
                ></el-table-column>
                <el-table-column prop="sqJe" label="申请金额（元）" />
                <el-table-column prop="fjName" label="申请附件" />
                <el-table-column prop="xyFjName" label="协议附件" />
                <el-table-column prop="sqsj" label="申请时间" />
                <el-table-column prop="createDwhMc" label="审核进度">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="lctClick(scope.row)"
                    >
                      <i class="scopeIncon lct"></i>
                      <span class="handleName">流转记录</span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="formLeft"><span class="title">减免记录</span></div>
              <el-table :data="formEdit.jmList">
                <el-table-column
                  fixed="left"
                  type="index"
                  label="序号"
                  width="50"
                ></el-table-column>
                <el-table-column prop="dbjzsqSqje" label="申请金额（元）" />
                <el-table-column prop="jmJe" label="减免金额（元）" />
                <el-table-column prop="sqsj" label="申请时间" />
                <el-table-column prop="fjName" label="附件" />
                <el-table-column prop="createDwhMc" label="审核进度">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="lctClick(scope.row)"
                    >
                      <i class="scopeIncon lct"></i>
                      <span class="handleName">流转记录</span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="formLeft"><span class="title">还款记录</span></div>
              <div class="formRight2">
                <!-- <div class="btns borderRed" @click="showDel">
                  <i class="icon lightIcon"></i><span class="title">删除</span>
                </div> -->
                <div class="editBtn" @click="addHkData" v-show="editFlag == 2">
                  <i class="addIcon" /> 新增
                </div>
              </div>
              <el-table :data="formEdit.hkList">
                <el-table-column
                  fixed="left"
                  type="index"
                  label="序号"
                  width="50"
                ></el-table-column>
                <el-table-column prop="yhJe" label="已还金额（元）">
                  <template slot-scope="scope">
                    <el-form-item :prop="'hkList.' + scope.$index + '.yhJe'">
                      <el-input-number
                        v-model="scope.row.yhJe"
                        v-show="editFlag == 2"
                        :min="0"
                        :max="9999999"
                        :controls="false"
                      ></el-input-number>
                      <div v-show="editFlag == 1">
                        {{ scope.row.yhJe }}
                      </div>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="hkSj" label="还款时间">
                  <template slot-scope="scope">
                    <el-form-item :prop="'hkList.' + scope.$index + '.hkSj'">
                      <el-date-picker
                        v-model="scope.row.hkSj"
                        v-show="editFlag == 2"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                      <div v-show="editFlag == 1">
                        {{ scope.row.hkSj }}
                      </div>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="fjName" label="还款凭证">
                  <template slot-scope="scope">
                    <el-form-item :prop="'hkList.' + scope.$index + '.fjName'">
                      <div
                        v-if="editFlag == 1"
                        style="display: flex; justify-content: space-between"
                      >
                        <a>
                          {{ scope.row.fjName }}
                        </a>
                      </div>
                      <div v-else>
                        <el-upload
                          action="#"
                          class="el-upload"
                          :auto-upload="false"
                          ref="upload"
                          :file-list="formEdit.files"
                          :on-change="fileChangeEdit"
                          :before-remove="beforeRemoveEdit"
                        >
                          <el-button size="small" type="primary"
                            >附件上传</el-button
                          >
                        </el-upload>
                      </div>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="删除选项" align="center">
                  <template slot-scope="scope">
                    <div style="margin-bottom: 20px">
                      <i
                        class="icon jian"
                        v-if="editFlag == 2"
                        @click="jian(scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  label="确认按钮"
                  align="center"
                  v-if="editFlag == 2"
                >
                  <template slot-scope="scope">
                    <div style="margin-bottom: 20px">
                      <el-button
                        type="primary"
                        class="confirm"
                        @click="editClick(scope.row)"
                        >确任修改</el-button
                      >
                    </div>
                  </template>
                </el-table-column> -->
              </el-table>
            </el-form>
          </div>
        </template>
        <!-- <span slot="footer" class="dialog-footer footerFlex">
          <el-button
            @click="detailCancel"
            style="margin-right: 12px; padding: 8px 20px"
            >关 闭</el-button
          >
        </span> -->
        <span slot="footer" class="dialog-footer" v-show="editFlag == 1">
          <el-button type="primary" class="confirm" @click="EditStatus"
            >编 辑</el-button
          >
        </span>
        <!-- <span slot="footer" class="dialog-footer" v-show="editFlag == 2">
          <el-button @click="editCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editCance"
            >确 定</el-button
          >
        </span> -->
      </el-dialog>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>
    <el-dialog
      title="新增还款记录"
      :visible.sync="addModalHk"
      width="60%"
      @close="addCanceHk"
      :close-on-click-modal="false"
    >
      <el-form ref="formAddHk" :model="formAddHk">
        <el-table :data="formAddHk.addData">
          <el-table-column
            label="待还金额（元）"
            min-width="180px"
            align="center"
            :render-header="addRedStar"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'addData.' + scope.$index + '.dhJe'"
                :rules="rules.common"
              >
                <el-input maxlength="200" v-model="scope.row.dhJe" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="还款金额（元）"
            min-width="180px"
            align="center"
            :render-header="addRedStar"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'addData.' + scope.$index + '.yhJe'"
                :rules="rules.common"
              >
                <el-input-number
                  v-model="scope.row.yhJe"
                  :min="0"
                  :max="9999999"
                  :controls="false"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="还款时间"
            min-width="200px"
            align="center"
            :render-header="addRedStar"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'addData.' + scope.$index + '.hkSj'"
                :rules="rules.common"
              >
                <el-date-picker
                  v-model="scope.row.hkSj"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="还款凭证" min-width="200px">
            <template slot-scope="scope">
              <el-form-item :prop="'addData.' + scope.$index + '.fileListHk'">
                <el-upload
                  action="#"
                  multiple
                  class="el-upload"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="scope.row.fileListHk"
                  :on-change="
                    (file, fileList) => {
                      fileChange(file, fileList, 1);
                    }
                  "
                  accept=".pdf,.jpg"
                  :before-remove="
                    (file, fileList) => {
                      beforeRemove(file, fileList, 1);
                    }
                  "
                >
                  <el-button size="small" type="primary">上传附件</el-button>
                </el-upload>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCanceHk">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addClickHk"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="新增"
      :visible.sync="addModal"
      width="70%"
      @close="addCance"
      :close-on-click-modal="false"
    >
      <el-form ref="formAdd" :model="formAdd">
        <div class="baseInfo">
          <div class="formLeft"><span class="title">基本信息</span></div>
          <div class="backDetail">
            <div class="formRight">
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学号</div>
                    <template>
                      <div class="content">
                        <el-form-item prop="xh" :rules="rules.common">
                          <el-autocomplete
                            v-model="formAdd.xh"
                            :fetch-suggestions="querySearchByXh"
                            placeholder="请输入学生学号"
                            :trigger-on-focus="false"
                            @select="handleSelectXh"
                          ></el-autocomplete>
                        </el-form-item>
                      </div>
                    </template>

                    <!-- <el-autocomplete
                      v-model="formAdd.xh"
                      :fetch-suggestions="querySearchByXh"
                      placeholder="请输入学生学号"
                      :trigger-on-focus="false"
                      @select="handleSelectXh"
                    ></el-autocomplete> -->
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">姓名</div>
                    <div class="content">{{ basicInfo2.xm }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养层次</div>
                    <div class="content">{{ basicInfo2.pyccmmc }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养单位</div>
                    <div class="content">{{ basicInfo2.dwhmc }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业</div>
                    <div class="content">{{ basicInfo2.zydmmc }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">年级</div>
                    <div class="content">{{ basicInfo2.nj }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">班级</div>
                    <div class="content">{{ basicInfo2.bjmmc }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">困难等级</div>
                    <div class="content">{{ basicInfo2.kndjMc }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="formLeft"><span class="title">申请记录</span></div>
          <el-table :data="formAdd.jzList">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="sqJe" label="申请金额（元）">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'jzList.' + scope.$index + '.sqJe'"
                  :rules="rules.common"
                >
                  <el-input-number
                    v-model="scope.row.sqJe"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="files" label="申请附件">
              <template slot-scope="scope">
                <el-form-item :prop="'jzList.' + scope.$index + '.fjName'">
                  <div>
                    <el-upload
                      action="#"
                      class="el-upload"
                      :auto-upload="false"
                      ref="upload"
                      :file-list="fileListSq"
                      :on-change="
                        (file, fileList) => {
                          fileChange(file, fileList, 'sq');
                        }
                      "
                      accept=".pdf,.jpg"
                      :before-remove="
                        (file, fileList) => {
                          beforeRemove(file, fileList, 'sq');
                        }
                      "
                    >
                      <el-button size="small" type="primary"
                        >附件上传</el-button
                      >
                    </el-upload>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="filesxy" label="协议附件">
              <template slot-scope="scope">
                <el-form-item :prop="'jzList.' + scope.$index + '.filesxy'">
                  <div>
                    <el-upload
                      action="#"
                      class="el-upload"
                      :auto-upload="false"
                      ref="upload"
                      :file-list="fileListXy"
                      :on-change="
                        (file, fileList) => {
                          fileChange(file, fileList, 'xy');
                        }
                      "
                      accept=".pdf,.jpg"
                      :before-remove="
                        (file, fileList) => {
                          beforeRemove(file, fileList, 'xy');
                        }
                      "
                    >
                      <el-button size="small" type="primary"
                        >附件上传</el-button
                      >
                    </el-upload>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="sqsj" label="申请时间">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'jzList.' + scope.$index + '.sqsj'"
                  :rules="rules.common"
                >
                  <el-date-picker
                    type="date"
                    placeholder="请选择日期"
                    v-model="scope.row.sqsj"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
          <div class="formLeft"><span class="title">减免记录</span></div>
          <el-table :data="formAdd.jmList">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="dbjzsqSqje" label="申请金额（元）">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'jmList.' + scope.$index + '.dbjzsqSqje'"
                  :rules="rules.common"
                >
                  <el-input-number
                    v-model="scope.row.dbjzsqSqje"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="jmJe" label="减免金额（元）">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'jmList.' + scope.$index + '.jmJe'"
                  :rules="rules.common"
                >
                  <el-input-number
                    v-model="scope.row.jmJe"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="sqsj" label="申请时间">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'jmList.' + scope.$index + '.sqsj'"
                  :rules="rules.common"
                >
                  <el-date-picker
                    type="date"
                    placeholder="请选择日期"
                    v-model="scope.row.sqsj"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="files" label="附件">
              <template slot-scope="scope">
                <el-form-item :prop="'jmList.' + scope.$index + '.filesxy'">
                  <div>
                    <el-upload
                      action="#"
                      class="el-upload"
                      :auto-upload="false"
                      ref="upload"
                      :file-list="fileListJm"
                      :on-change="
                        (file, fileList) => {
                          fileChange(file, fileList, 'jm');
                        }
                      "
                      accept=".pdf,.jpg"
                      :before-remove="
                        (file, fileList) => {
                          beforeRemove(file, fileList, 'jm');
                        }
                      "
                    >
                      <el-button size="small" type="primary"
                        >附件上传</el-button
                      >
                    </el-upload>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
          <div class="formLeft"><span class="title">还款记录</span></div>
          <!-- <div class="formRight2">
            <div class="editBtn" @click="addHk"><i class="addIcon" /> 新增</div>
          </div> -->
          <el-table :data="formAdd.hkList">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="yhJe" label="已还金额（元）">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'hkList.' + scope.$index + '.yhJe'"
                  :rules="rules.common"
                >
                  <el-input-number
                    v-model="scope.row.yhJe"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="hkSj" label="还款时间">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'hkList.' + scope.$index + '.hkSj'"
                  :rules="rules.common"
                >
                  <el-date-picker
                    v-model="scope.row.hkSj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="fjName" label="还款凭证">
              <template slot-scope="scope">
                <el-form-item :prop="'hkList.' + scope.$index + '.fjName'">
                  <div>
                    <el-upload
                      action="#"
                      class="el-upload"
                      :auto-upload="false"
                      ref="upload"
                      :file-list="scope.row.files"
                      :on-change="
                        (file, fileList) => {
                          fileChangeList(file, fileList, scope.row);
                        }
                      "
                      accept=".pdf,.jpg"
                      :before-remove="
                        (file, fileList) => {
                          beforeRemoveList(file, fileList, scope.row);
                        }
                      "
                    >
                      <el-button size="small" type="primary"
                        >附件上传</el-button
                      >
                    </el-upload>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="添加选项" align="center">
              <template slot-scope="scope">
                <div style="margin-bottom: 20px">
                  <i
                    class="icon jia"
                    @click="jiaAdd(scope.row, scope.$index)"
                  ></i>
                  <i
                    class="icon jian"
                    @click="jianAdd(scope.row, scope.$index)"
                  ></i>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
                  label="确认按钮"
                  align="center"
                  v-if="editFlag == 2"
                >
                  <template slot-scope="scope">
                    <div style="margin-bottom: 20px">
                      <el-button
                        type="primary"
                        class="confirm"
                        @click="editClick(scope.row)"
                        >确任修改</el-button
                      >
                    </div>
                  </template>
                </el-table-column> -->
          </el-table>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addClick"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>

<script>
import CheckboxCom from "../../../components/checkboxCom";
import { xhQuery } from "@/api/dailyBehavior/lskn";
import {
  queryResultList,
  deleteResult,
  importResult,
  queryDbjzDetail,
} from "@/api/dailyBehavior/illnessHelpTea";
import { importHkjl } from "@/api/dailyBehavior/illnessHelpStu";
import { getZY, getBJ } from "@/api/student/index";
import { queryStuList } from "@/api/familyDifficulties/difficultTea";
import { querywj, delwj, Exportwj } from "@/api/assistantWork/classEvent";
import { getCollege } from "@/api/class/maintenanceClass";
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
  data() {
    return {
      delModal: false,
      lctModal: false,
      ztStatus: [],
      zdOps: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        bjm: [],
        zydm: [],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [],
      zyOps: [],
      bjOps: [],
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
      tempRadio: false,
      detailModal: false,
      formEdit: {
        jzList: [],
        jmList: [],
        hkList: [],
      },
      formAdd: {
        xh: "",
        jzList: [{ sqJe: "", sqsj: "" }],
        jmList: [
          {
            dbjzsqSqje: "",
            jmJe: "",
            sqsj: "",
          },
        ],
        hkList: [
          {
            hkSj: "",
            yhJe: "",
            files: [],
          },
        ],
      },
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      sqlxOps: [{ mc: "救助" }, { mc: "减免" }],
      basicInfo: {},
      basicInfo2: {},
      addModal: false,
      addModalHk: false,
      fileList: [],
      fileListHk: [],
      fileListSq: [],
      fileListXy: [],
      fileListJm: [],
      fileHkList: [],
      delArr: [],
      editFlag: 1, //1只读，2编辑
      formAddHk: {
        addData: [
          {
            id: "",
            dbjzsqId: "",
            dbjzsqSqje: "",
            dhJe: "",
            hkSj: "",
            yhJe: "",
          },
        ],
      },
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode1("dmsplcm"); // 培养层次
  },

  methods: {
    // 表单校验
    checkFormAddHk() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAddHk.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    jian(row) {
      deleteHkjl({ ids: [row.id] }).then((res) => {
        this.$message.success("删除减免记录成功");
        queryDbjzDetail({ id: this.formEdit.queryhkid }).then((res) => {
          this.formEdit.hkList = res.data.hkList;
        });
      });
    },
    addHkData() {
      this.addModalHk = true;
    },
    editCance() {
      this.detailModal = false;
      // this.$refs.formEdit.resetFields();
    },
    // editClick(row) {
    //   if (!this.checkFormEdit()) {
    //     this.$message.error("请完善表单相关信息！");
    //     return;
    //   } else {
    //     // var data = this.formEdit.hkList[0];
    //     let formData = new FormData();
    //     formData.append("dbjzsqId", row.dbjzsqId);
    //     formData.append("dbjzsqSqje", row.dbjzsqSqje);
    //     formData.append("dhJe", row.dhJe);
    //     formData.append("hkSj", row.hkSj);
    //     formData.append("yhJe", row.yhJe);
    //     formData.append("id", row.id);
    //     // formData.append("xh", this.$store.getters.userId);
    //     if (this.formEdit.files.length > 0) {
    //       this.formEdit.files.map((file) => {
    //         formData.append("files", file.raw);
    //       });
    //     }
    //     importHkjl(formData).then((res) => {
    //       if (res.errcode == "00") {
    //         this.$message.success("编辑成功");
    //         this.queryHk();
    //       } else {
    //         this.$message.error("编辑失败");
    //       }
    //     });
    //     this.detailModal = false;
    //   }
    // },
    addCanceHk() {
      this.addModalHk = false;
      this.$refs.formAddHk.resetFields();
    },
    jiaAdd(row, index) {
      var obj = { hkSj: "", yhJe: "", files: [] };
      this.formAdd.hkList.push(obj);
    },
    jianAdd(row, index) {
      if (this.formAdd.hkList.length > 1) {
        this.formAdd.hkList.splice(index, 1);
      } else {
        this.$message.error("至少保留一个");
      }
    },
    addClickHk() {
      if (!this.checkFormAddHk()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAddHk.addData[0];
        let formData = new FormData();
        formData.append("id", data.id);
        formData.append("dbjzsqId", data.dbjzsqId);
        formData.append("dbjzsqSqje", data.dbjzsqSqje);
        formData.append("dhJe", data.dhJe);
        formData.append("hkSj", data.hkSj);
        formData.append("yhJe", data.yhJe);

        if (this.fileListHk.length > 0) {
          this.fileListHk.map((file) => {
            formData.append("files", file.raw);
          });
        }
        importHkjl(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("还款新增成功");
            this.queryHk();
          } else {
            this.$message.error("还款新增失败");
          }
        });
        this.addModalHk = false;
        this.detailModal = false;
      }
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.zydm = []; // 专业
        this.moreIform.bjm = []; // 班级
      }
      this.getZY(val);
      this.getBJ(val);
    },
    getZY(val) {
      this.zyOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getZY(data)
          .then((res) => {
            this.zyOps = res.data;
          })
          .catch((err) => {});
      }
    },
    getBJ(val) {
      this.bjOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getBJ(data)
          .then((res) => {
            this.bjOps = res.data;
          })
          .catch((err) => {});
      }
    },
    showDel() {
      if (this.delArr && this.delArr.length > 0) {
        this.delModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    del() {
      deleteResult({ ids: this.delArr }).then((res) => {
        this.handleSearch();
        this.delModal = false;
        this.$message.success("删除成功");
      });
    },
    delCancel() {
      this.delModal = false;
    },
    getCode1(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
        }
      });
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    EditStatus() {
      this.editFlag = 2;
    },
    hadleDetail(row) {
      console.log("row", row);
      this.editFlag = 1; //不可编辑
      this.formEdit.queryhkid = row.id || "";
      queryDbjzDetail({ id: row.id }).then((res) => {
        this.formEdit.jzList = [res.data.sqPo];
        console.log("bbb", res.data.sqPo);
        this.formEdit.jmList = res.data.jmList;
        this.formEdit.hkList = res.data.hkList;
      });
      xhQuery({ xh: row.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      this.detailModal = true;
    },
    detailCancel() {
      this.detailModal = false;
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwh: this.moreIform.dwh,
        bjm: this.moreIform.bjm,
        zydm: this.moreIform.zydm,
        // pyccm: this.training.choose || [],
        sqsjs:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        sqsje:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryResultList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    //流程,注意id大小写
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    //获取培养层次
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    // 培养层次全选
    handleCheckAllChangeTraining(val) {
      let allCheck = [];
      for (let i in this.training.checkBox) {
        allCheck.push(this.training.checkBox[i].dm);
      }
      this.training.choose = val ? allCheck : [];
      this.training.isIndeterminate = false;
    },
    // 培养层次单选
    handleCheckedCitiesChangeTraining(value) {
      let checkedCount = value.length;
      this.training.checkAll = checkedCount === this.training.checkBox.length;
      this.training.isIndeterminate =
        checkedCount > 0 && checkedCount < this.training.checkBox.length;
    },
    //下载附件
    xzWj(row) {
      Exportwj({ id: row.fjId.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, row.fjName);
      });
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = val.map((item) => item.id);
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processId: v.processId,
        status: v.status,
        taskId: v.taskId,
        xh: v.xh,
        mk: v.sqlx,
      }));
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    // 表单校验
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
    //通过
    xinzeng() {
      this.addModal = true;
      this.formAdd = {
        xh: "",
        jzList: [{ sqJe: "", sqsj: "" }],
        jmList: [
          {
            dbjzsqSqje: "",
            jmJe: "",
            sqsj: "",
          },
        ],
        hkList: [
          {
            hkSj: "",
            yhJe: "",
            files: [],
          },
        ],
      };
      this.fileListSq = [];
      this.fileListXy = [];
      this.fileListJm = [];
    },
    addHk() {},
    addCance() {
      this.addModal = false;
    },
    addClick() {
      console.log("jzlist", this.formAdd.jzList);
      console.log("jmlist", this.formAdd.jmList);
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let formData = new FormData();
        formData.append("xh", this.xh);
        var aaa = this.formAdd.jzList[0];
        formData.append("sqPo.sqJe", aaa.sqJe);
        formData.append("sqPo.sqsj", aaa.sqsj);
        if (this.fileListSq.length > 0) {
          this.fileListSq.map((file) => {
            formData.append("sqPo.files", file.raw);
          });
        }
        if (this.fileListXy.length > 0) {
          this.fileListXy.map((file) => {
            formData.append("sqPo.filesxy", file.raw);
          });
        }
        debugger;
        for (let i = 0, len = this.formAdd.jmList.length; i < len; i++) {
          var location = this.formAdd.jmList[i];

          formData.append("jmList[" + i + "].dbjzsqSqje", location.dbjzsqSqje);
          formData.append("jmList[" + i + "].jmJe", location.jmJe);
          formData.append("jmList[" + i + "].sqsj", location.sqsj);
        }
        // if (this.fileListJm.length > 0) {
        //   this.fileListJm.map((file) => {
        //     formData.append("jmList[0].files", file.raw);
        //   });
        // }

        for (let i = 0, len = this.formAdd.hkList.length; i < len; i++) {
          var locationInfo = this.formAdd.hkList[i];

          formData.append("hkList[" + i + "].yhJe", locationInfo.yhJe);
          formData.append("hkList[" + i + "].hkSj", locationInfo.hkSj);
          if (this.hkList[i].files.length > 0) {
            this.hkList[i].files.map((ele) => {
              formData.append("hkList[" + i + "].files", ele.raw);
            });
          }
        }
        importResult(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.handleSearch();
            this.addModal = false;
          } else {
            this.$message.error("新增失败");
          }
        });
      }
    },
    fileChange(file, fileList, index) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      } else if (index == 1) {
        this.fileListHk = fileList;
      } else if (index == "sq") {
        this.fileListSq = fileList;
      } else if (index == "xy") {
        this.fileListXy = fileList;
      } else if (index == "jm") {
        this.fileListJm = fileList;
      } else {
        this.fileList = fileList;
      }
    },
    beforeRemove(file, fileList, index) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      } else if (index == 1) {
        this.fileListHk = fileList;
      } else if (index == "sq") {
        this.fileListSq = fileList;
      } else if (index == "xy") {
        this.fileListXy = fileList;
      } else if (index == "jm") {
        this.fileListJm = fileList;
      } else {
        this.fileList = fileList;
      }
    },
    fileChangeEdit(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      }
      this.formEdit.files = fileList;
    },
    beforeRemoveEdit(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.formEdit.files = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    fileChangeList(file, fileList, row) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      } else {
        this.formAdd.hkList[row].files = fileList;
      }
    },
    beforeRemoveList(file, fileList, row) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      } else {
        this.formAdd.hkList[row].files = fileList;
      }
    },
    //通过学号查姓名信息
    querySearchByXh(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xh = { xh: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xh).then((res) => {
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    handleSelectXh(item) {
      this.formAdd.xh = item.gh;
      // this.formAdd.xsxm = item.xm;
      xhQuery({ xh: item.gh }).then((res) => {
        this.basicInfo2 = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.footerFlex {
  display: flex;
  justify-content: flex-end;
}
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.talkRec {
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .handledie {
    background: url("~@/assets/images/details.png");
  }
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
  .mt15 {
    margin-top: 15px;
  }
  .searchWrap {
    background: #fff;
    padding: 20px;
    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      .elSelect {
        width: 150px;
      }
      .inputSelect {
        width: 50%;
      }
      .more {
        flex: 0 0 100px;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #005657;
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
    }
    .moreSelect {
      margin-top: 20px;
      padding: 20px;
      background: #fafafa;
    }
  }
  .tableWrap {
    background: #fff;
    padding: 20px;
    .headerTop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .headerLeft {
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          background: #fff;
          border: 1px solid grey;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
        }
        .borderRed {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
          background: #005657;
        }
        .btns {
          margin-right: 15px;
          padding: 0px 10px;
          cursor: pointer;
          border-radius: 4px;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            // vertical-align: middle;
          }
          .title1 {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            // vertical-align: middle;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .deteIcon {
            background: url("~@/assets/images/yes.png") no-repeat;
          }
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
        }
      }
    }
  }
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // overflow-x: auto;
    .formLeft {
      background: #fff;
      // display: flex;
      align-items: flex-start;
      margin-top: 10px;
      margin-bottom: 10px;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
    }
    .formRight2 {
      display: flex;
      align-items: center;
      // flex-direction: row-reverse;
      justify-content: flex-end;
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
  }
  .backDetail {
    display: flex;
    margin-bottom: 10px;
    flex-direction: row;

    .formRight {
      width: 100%;
      margin-top: 15px;
      .rowStyle {
        padding: 0 !important;
        margin: 0;
        border-bottom: 1px solid #cccccc;
      }
      .wrap {
        display: flex;
        align-items: center;
        .title {
          flex: 0 0 160px;
          line-height: 48px;
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
      }

      .GreenButton {
        //border: 1px solid grey;
        height: 49px;
        border-radius: 2px;
        background: #005657;
      }
      .title1 {
        font-size: 16px;
        text-align: center;
        line-height: 48px;
        color: #fff;
        // vertical-align: middle;
      }
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: top;
        margin-right: 5px;
      }
      .greenIcon {
        margin: 15px;
        background: url("~@/assets/assistantPng/add.png") no-repeat;
      }
    }
  }
}
.jia {
  margin-top: 9px;
  background: url("~@/assets/images/jia.png") no-repeat;
}
.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
</style>
