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
          <el-col :span="6">
            <span>所属模块：</span>
            <el-select
              v-model="moreIform.mk"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in mkOps"
                :key="item.mc"
                :label="item.mc"
                :value="item.mc"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
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
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">待审核列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderRed" @click="back">
            <i class="icon backIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse">
            <i class="icon refuseIcon"></i><span class="title">拒绝</span>
          </div>
          <div class="btns fullGreen" @click="pass">
            <i class="icon passIcon"></i><span class="title1">通过</span>
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
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" width="100">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85"> </el-table-column>
          <el-table-column prop="dwhmc" label="培养单位" min-width="100">
          </el-table-column>
          <el-table-column prop="pyccmmc" label="培养层次" width="80">
          </el-table-column>
          <el-table-column prop="zydmmc" label="专业" min-width="100">
          </el-table-column>
          <el-table-column prop="bjmmc" label="班级" min-width="100">
          </el-table-column
          ><el-table-column prop="mk" label="所属模块" width="90">
          </el-table-column
          ><el-table-column prop="createTime" label="申报日期" min-width="100">
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, scope.$index)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申报详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="拒绝理由" :visible.sync="jjModal" width="30%">
        <template>
          <el-input placeholder="请输入拒绝理由" v-model="jjly"></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="jjCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="jjConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="退回选择" :visible.sync="thTableModal" width="20%">
        <template>
          <el-table
            :data="tableInner"
            ref="multipleTable1"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column width="55">
              <template slot-scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="tempRadio"
                  @change.native="getRow(scope.$index, scope.row)"
                  >{{ "" }}</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="actName" label="节点名称" sortable="custom">
            </el-table-column>
          </el-table>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thTableCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="thTableConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="退回理由" :visible.sync="thModal" width="30%">
        <template>
          <el-input placeholder="请输入退回理由" v-model="thly"></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="thConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="退回理由" :visible.sync="thModal" width="30%">
        <template>
          <el-input placeholder="请输入退回理由" v-model="thly"></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="thConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="申报详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="80%"
      >
        <template>
          <el-form>
            <el-row :gutter="20">
              <el-col :span="4">
                <el-form-item label="申报人学号" label-width="100px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.xh"
                    placeholder="请输入"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="4">
                <el-form-item label="姓名" label-width="60px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.xm"
                    placeholder="请输入"
                  ></el-input> </el-form-item></el-col
              ><el-col :span="4">
                <el-form-item label="学院" label-width="60px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.dwhmc"
                    placeholder="请输入"
                  ></el-input> </el-form-item></el-col
              ><el-col :span="4">
                <el-form-item label="专业" label-width="60px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.zydmmc"
                    placeholder="请输入"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="4">
                <el-form-item label="班级" label-width="60px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.bjmmc"
                    placeholder="请输入"
                  ></el-input> </el-form-item
              ></el-col>
            </el-row>
          </el-form>
          <el-table :data="tableDetails" v-if="whatType == '1'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader1" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column
              prop="fileList"
              label="结业证书"
              sortable="custom"
              align="center"
              width="300"
              fixed="right"
            >
              <template slot-scope="scope">
                <div v-for="item in scope.row.fileList">
                  <div style="display: flex; justify-content: space-between">
                    <a>
                      {{ item.fileName }}
                    </a>
                    <el-button>预览</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="审核状态"
              sortable="custom"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '2'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader2" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '3'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader3" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '4'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader4" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <h3 v-if="whatType == '4'">服务内容 ：{{ tableDetails[0].fwnr }}</h3>
          <el-table :data="tableDetails" v-if="whatType == '6'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader6" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column
              prop="fileList"
              label="结业证书"
              sortable="custom"
              align="center"
              width="300"
              fixed="right"
            >
              <template slot-scope="scope">
                <div v-for="item in scope.row.fileList">
                  <div style="display: flex; justify-content: space-between">
                    <a>
                      {{ item.fileName }}
                    </a>
                    <el-button>预览</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '7'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader7" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '8'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader8" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '9'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader9" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '10'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader10" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column
              prop="fileList"
              label="参赛凭证"
              sortable="custom"
              align="center"
              width="200"
              fixed="right"
            >
              <template slot-scope="scope">
                <div v-for="item in scope.row.fileList">
                  <div style="display: flex; justify-content: space-between">
                    <a>
                      {{ item.fileName }}
                    </a>
                    <el-button>预览</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '11'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader11" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="whatType == '12'">
            <div
              class="backDetail"
              v-for="(ele, index) in tableDetails"
              :key="index"
            >
              <div class="formLeft">
                <div class="title">论文期刊</div>
              </div>
              <div class="formRight">
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">论文名称</div>
                      <div class="content">{{ ele.lwzwmc }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">英文名</div>
                      <div class="content">{{ ele.lwywmc }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">发表刊物</div>
                      <div class="content">{{ ele.fbkw }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">出版物类型</div>
                      <div class="content">{{ ele.cbwlx }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">署名</div>
                      <div class="content">{{ ele.sm }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">收录类别</div>
                      <div class="content">{{ ele.sllb }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">分类号</div>
                      <div class="content">{{ ele.flh }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">版面</div>
                      <div class="content">{{ ele.bm }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">卷期</div>
                      <div class="content">{{ ele.jq }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">起止页</div>
                      <div class="content">{{ ele.qzy }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">成果所属单位</div>
                      <div class="content">{{ ele.cgssdw }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">发表时间</div>
                      <div class="content">{{ ele.fbrq }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">附件</div>
                      <div class="content">
                        <div v-for="item in ele.fileList">
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                            "
                          >
                            <a>
                              {{ item.fileName }}
                            </a>
                            <!-- <el-button>预览</el-button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">审核状态</div>
                      <div class="content">
                        <el-select
                          v-model="ele.status"
                          placeholder="请选择"
                          :disabled="true"
                        >
                          <el-option
                            v-for="(item, index) in ztStatus"
                            :key="index"
                            :label="item.mc"
                            :value="item.dm"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22" class="rowStyle">
                    <div class="wrap">
                      <div class="title">操作</div>
                      <div class="content">
                        <el-button type="text" size="small" @click="back">
                          <i class="scopeIncon handledie"></i>
                          <span class="handleName">退回</span>
                        </el-button>
                        <el-button type="text" size="small" @click="refuse">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">拒绝</span>
                        </el-button>
                        <el-button type="text" size="small" @click="pass">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">通过</span>
                        </el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div v-if="whatType == '13'">
            <div
              class="backDetail"
              v-for="(ele, index) in tableDetails"
              :key="index"
            >
              <div class="formLeft">
                <div class="title">专利</div>
              </div>
              <div class="formRight">
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">专利名称</div>
                      <div class="content">{{ ele.zlmc }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">专利号</div>
                      <div class="content">{{ ele.zlh }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">专利类型</div>
                      <div class="content">{{ ele.zllx }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请日</div>
                      <div class="content">{{ ele.sqrq }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请人</div>
                      <div class="content">{{ ele.sqr }}</div>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">成果所属单位</div>
                      <div class="content">{{ ele.cgssdw }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">附件</div>
                      <div class="content">
                        <div v-for="item in ele.fileList">
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                            "
                          >
                            <a>
                              {{ item.fileName }}
                            </a>
                            <!-- <el-button>预览</el-button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">审核状态</div>
                      <div class="content">
                        <el-select
                          v-model="ele.status"
                          placeholder="请选择"
                          :disabled="true"
                        >
                          <el-option
                            v-for="(item, index) in ztStatus"
                            :key="index"
                            :label="item.mc"
                            :value="item.dm"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22" class="rowStyle">
                    <div class="wrap">
                      <div class="title">操作</div>
                      <div class="content">
                        <el-button type="text" size="small" @click="back">
                          <i class="scopeIncon handledie"></i>
                          <span class="handleName">退回</span>
                        </el-button>
                        <el-button type="text" size="small" @click="refuse">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">拒绝</span>
                        </el-button>
                        <el-button type="text" size="small" @click="pass">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">通过</span>
                        </el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div v-if="whatType == '14'">
            <div
              class="backDetail"
              v-for="(ele, index) in tableDetails"
              :key="index"
            >
              <div class="formLeft">
                <div class="title">著作</div>
              </div>
              <div class="formRight">
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">著作名称</div>
                      <div class="content">{{ ele.zzmc }}</div>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">类别</div>
                      <div class="content">{{ ele.zzlb }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">出版时间</div>
                      <div class="content">{{ ele.cbrq }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">出版社</div>
                      <div class="content">{{ ele.cbs }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">出版社级别</div>
                      <div class="content">{{ ele.cbsjb }}</div>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">作者</div>
                      <div class="content">{{ ele.gtzz }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">成果所属单位</div>
                      <div class="content">{{ ele.cgssdw }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">附件</div>
                      <div class="content">
                        <div v-for="item in ele.fileList">
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                            "
                          >
                            <a>
                              {{ item.fileName }}
                            </a>
                            <!-- <el-button>预览</el-button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">审核状态</div>
                      <div class="content">
                        <el-select
                          v-model="ele.status"
                          placeholder="请选择"
                          :disabled="true"
                        >
                          <el-option
                            v-for="(item, index) in ztStatus"
                            :key="index"
                            :label="item.mc"
                            :value="item.dm"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22" class="rowStyle">
                    <div class="wrap">
                      <div class="title">操作</div>
                      <div class="content">
                        <el-button type="text" size="small" @click="back">
                          <i class="scopeIncon handledie"></i>
                          <span class="handleName">退回</span>
                        </el-button>
                        <el-button type="text" size="small" @click="refuse">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">拒绝</span>
                        </el-button>
                        <el-button type="text" size="small" @click="pass">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">通过</span>
                        </el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div v-if="whatType == '15'">
            <div
              class="backDetail"
              v-for="(ele, index) in tableDetails"
              :key="index"
            >
              <div class="formLeft">
                <div class="title">软件著作</div>
              </div>
              <div class="formRight">
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">软著名称</div>
                      <div class="content">{{ ele.rjzzmc }}</div>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">软件著作权类型</div>
                      <div class="content">{{ ele.rjzzqlx }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">音像制品类型</div>
                      <div class="content">{{ ele.yxzplx }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">证书号</div>
                      <div class="content">{{ ele.zsh }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">登记号</div>
                      <div class="content">{{ ele.djh }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">著作权人</div>
                      <div class="content">{{ ele.zzqr }}</div>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">学校署名顺序</div>
                      <div class="content">{{ ele.xxsmsx }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">附件</div>
                      <div class="content">
                        <div v-for="item in ele.fileList">
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                            "
                          >
                            <a>
                              {{ item.fileName }}
                            </a>
                            <!-- <el-button>预览</el-button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">审核状态</div>
                      <div class="content">
                        <el-select
                          v-model="ele.status"
                          placeholder="请选择"
                          :disabled="true"
                        >
                          <el-option
                            v-for="(item, index) in ztStatus"
                            :key="index"
                            :label="item.mc"
                            :value="item.dm"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22" class="rowStyle">
                    <div class="wrap">
                      <div class="title">操作</div>
                      <div class="content">
                        <el-button type="text" size="small" @click="back">
                          <i class="scopeIncon handledie"></i>
                          <span class="handleName">退回</span>
                        </el-button>
                        <el-button type="text" size="small" @click="refuse">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">拒绝</span>
                        </el-button>
                        <el-button type="text" size="small" @click="pass">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">通过</span>
                        </el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div v-if="whatType == '16'">
            <div
              class="backDetail"
              v-for="(ele, index) in tableDetails"
              :key="index"
            >
              <div class="formLeft">
                <div class="title">研究报告</div>
              </div>
              <div class="formRight">
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">报告名称</div>
                      <div class="content">{{ ele.bgmc }}</div>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">编号</div>
                      <div class="content">{{ ele.bh }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">字数</div>
                      <div class="content">{{ ele.zs }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">提交单位</div>
                      <div class="content">{{ ele.tjdw }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">单位级别</div>
                      <div class="content">{{ ele.dwjb }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">是否采纳</div>
                      <div class="content">{{ ele.sfcn }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">采纳时间</div>
                      <div class="content">{{ ele.cnrq }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">作者</div>
                      <div class="content">{{ ele.zzxm }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">成果所属单位</div>
                      <div class="content">{{ ele.cgssdw }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">附件</div>
                      <div class="content">
                        <div v-for="item in ele.fileList">
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                            "
                          >
                            <a>
                              {{ item.fileName }}
                            </a>
                            <!-- <el-button>预览</el-button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">审核状态</div>
                      <div class="content">
                        <el-select
                          v-model="ele.status"
                          placeholder="请选择"
                          :disabled="true"
                        >
                          <el-option
                            v-for="(item, index) in ztStatus"
                            :key="index"
                            :label="item.mc"
                            :value="item.dm"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22" class="rowStyle">
                    <div class="wrap">
                      <div class="title">操作</div>
                      <div class="content">
                        <el-button type="text" size="small" @click="back">
                          <i class="scopeIncon handledie"></i>
                          <span class="handleName">退回</span>
                        </el-button>
                        <el-button type="text" size="small" @click="refuse">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">拒绝</span>
                        </el-button>
                        <el-button type="text" size="small" @click="pass">
                          <i class="scopeIncon handleEdit"></i>
                          <span class="handleName">通过</span>
                        </el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="confirm"
            @click="upDate"
            v-if="upDownIndex > 0"
            >上一条</el-button
          >
          <el-button type="primary" class="confirm" @click="downDate"
            >下一条</el-button
          >
          <el-button @click="detailCancel">关 闭</el-button>
        </span>
      </el-dialog>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出{{ leng }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from "../../../components/checkboxCom";
import {
  queryDshList,
  tyFlow,
  jjFlow,
  backFlow,
  thFinal,
  texcelExportCzdaFlow,
} from "@/api/growFiles/infoAppr";
import {
  query1,
  query2,
  query3,
  query4,
  query5,
  query6,
  query7,
  queryGbjl,
  queryRych,
  queryHdxx,
  queryCyjl,
  queryLwqk,
  queryKyzl,
  queryKyzz,
  queryRjzz,
  queryYjbg,
} from "@/api/stuDangan/detailList/many";
import { getCollege } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
export default {
  name: "manStudent",
  components: { CheckboxCom },
  data() {
    return {
      showExport: false,
      ztStatus: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        zydm: [],
        bjm: [],
        mk: [],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      updownDate: [],
      allDwh: [],
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      mkOps: [
        { mc: "奖学金" },
        { mc: "社会实践" },
        { mc: "社团经历" },
        { mc: "培训经历" },
        { mc: "学习成绩" },
        { mc: "资格认证" },
        { mc: "志愿服务" },
        { mc: "荣誉称号" },
        { mc: "千部经历" },
        { mc: "活动信息" },
        { mc: "创业经历" },
        { mc: "科研论文" },
        { mc: "科研专利" },
        { mc: "科研著作" },
        { mc: "软件著作" },
        { mc: "研究报告" },
      ],
      tableHeader1: [
        { dm: "pxxmmc", mc: "培训项目名称" },
        { dm: "dwh", mc: "组织单位" },
        { dm: "pxkssj", mc: "培训开始时间" },
        { dm: "pxjssj", mc: "培训结束时间" },
        { dm: "zxs", mc: "总学时" },
        { dm: "xz", mc: "性质" },
        { dm: "pxdwlb", mc: "培训单位类别" },
        { dm: "jg", mc: "结果" },
      ],
      tableHeader2: [
        { dm: "stmc", mc: "社团名称" },
        { dm: "stlxChinese", mc: "社团类型" },
        { dm: "gkdwmc", mc: "挂靠单位" },
        { dm: "rzzwChinese", mc: "任职职务" },
        { dm: "kssj", mc: "开始时间" },
        { dm: "jssj", mc: "结束时间" },
        { dm: "zdlsxm", mc: "指导老师" },
      ],
      tableHeader3: [
        { dm: "xmmc", mc: "项目名称" },
        { dm: "zzdw", mc: "组织单位" },
        { dm: "dj", mc: "等级" },
        { dm: "lxchinese", mc: "类型" },
        { dm: "sjdd", mc: "实践地点" },
        { dm: "kssj", mc: "开始时间" },
        { dm: "jssj", mc: "结束时间" },
        { dm: "zmr", mc: "证明人" },
        { dm: "lxfs", mc: "联系方式" },
      ],
      tableHeader4: [
        { dm: "xmmc", mc: "项目名称" },
        { dm: "zzdw", mc: "组织单位" },
        { dm: "fwsc", mc: "服务时长(小时)" },
        { dm: "fwdd", mc: "服务地点" },
        { dm: "fwdx", mc: "服务对象" },
        { dm: "kssj", mc: "开始时间" },
        { dm: "jssj", mc: "结束时间" },
        { dm: "zdlsxm", mc: "指导老师" },
      ],
      tableHeader5: [
        { dm: "xn", mc: "学年" },
        { dm: "xq", mc: "课程名称" },
        { dm: "kcmc", mc: "成绩" },
        { dm: "cj", mc: "学分数" },
        { dm: "xfs", mc: "学分绩" },
        { dm: "xfj", mc: "学年专业排名" },
      ],
      tableHeader6: [
        { dm: "zslxchinese", mc: "证书类型" },
        { dm: "dj", mc: "等级" },
        { dm: "fxlb", mc: "方向/类别" },
        { dm: "zsbh", mc: "证书编号" },
        { dm: "fzdw", mc: "发证单位" },
        { dm: "fzsj", mc: "发证时间" },
      ],
      tableHeader7: [
        { dm: "jxjmc", mc: "奖学金名称" },
        { dm: "jb", mc: "级别" },
        { dm: "dj", mc: "等级" },
        { dm: "je", mc: "金额" },
        { dm: "jxjlx", mc: "奖学金类型" },
        { dm: "sldw", mc: "设立单位" },
        { dm: "hjsj", mc: "获奖时间" },
      ],
      tableHeader8: [
        //干部经历
        { dm: "rzzz", mc: "任职组织" },
        { dm: "sldw", mc: "设立单位" },
        { dm: "jb", mc: "级别" },
        { dm: "rzzw", mc: "任职职务" },
        { dm: "kssj", mc: "开始日期" },
        { dm: "jssj", mc: "结束日期" },
        { dm: "zmr", mc: "证明人" },
        { dm: "lxfs", mc: "联系方式" },
      ],
      tableHeader9: [
        //荣誉称号
        { dm: "rymc", mc: "荣誉名称" },
        { dm: "jb", mc: "级别" },
        { dm: "dj", mc: "等级" },
        { dm: "bzdw", mc: "表彰单位" },
        { dm: "hjsj", mc: "获奖时间" },
        { dm: "zsbh", mc: "证书编号" },
      ],
      tableHeader10: [
        //活动信息
        { dm: "hdssmc", mc: "活动/赛事名称" },
        { dm: "zzdw", mc: "组织单位" },
        { dm: "jb", mc: "级别" },
        { dm: "cszp", mc: "参赛作品" },
        { dm: "cy", mc: "成员" },
        { dm: "pm", mc: "排名" },
        { dm: "hdsj", mc: "活动时间" },
      ],
      tableHeader11: [
        //创业经历
        { dm: "gsmc", mc: "公司名称" },
        { dm: "zcrq", mc: "注册日期" },
        { dm: "zczj", mc: "注册资金" },
        { dm: "sshy", mc: "所属行业" },
        { dm: "frdb", mc: "法人代表" },
        { dm: "zyyw", mc: "主营业务" },
        { dm: "srzw", mc: "所任职务" },
      ],
      tableHeader12: [
        //创业经历
        { dm: "gsmc", mc: "公司名称" },
        { dm: "zcrq", mc: "注册日期" },
        { dm: "zczj", mc: "注册资金" },
        { dm: "sshy", mc: "所属行业" },
        { dm: "frdb", mc: "法人代表" },
        { dm: "zyyw", mc: "主营业务" },
        { dm: "srzw", mc: "所任职务" },
      ],
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
      multipleSelection1: "",
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      defaultRes: {},
      detailModal: false,
      whatType: "",
      tableDetails: [],
      upDownIndex: 0,
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode1("dmsplcm"); // 培养层次
  },

  methods: {
    async upDate() {
      var tarIndex = this.upDownIndex - 1;
      var tar = this.updownDate[tarIndex];
      var data = {
        xh: tar.xh,
        pageNum: "",
        pageSize: "",
        orderZd: "",
        orderPx: "",
        businesId: tar.businesId,
      };
      switch (tar.mk) {
        case "奖学金":
          this.whatType = "7";
          await query7(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "资格认证":
          this.whatType = "6";
          await query6(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "志愿服务":
          this.whatType = "4";
          await query4(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "社会实践":
          this.whatType = "3";
          await query3(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "社团经历":
          this.whatType = "2";
          await query2(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "培训经历":
          await query1(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          this.whatType = "1";
          break;
        case "干部经历":
          this.whatType = "8";
          await queryGbjl(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "荣誉称号":
          this.whatType = "9";
          await queryRych(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "活动信息":
          this.whatType = "10";
          await queryHdxx(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "创业经历":
          this.whatType = "11";
          await queryCyjl(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "科研论文":
          this.whatType = "12";
          await queryLwqk(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "科研专利":
          this.whatType = "13";
          await queryKyzl(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "科研著作":
          this.whatType = "14";
          await queryKyzz(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "软件著作":
          this.whatType = "15";
          await queryRjzz(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
        case "研究报告":
          this.whatType = "16";
          await queryYjbg(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: tar.businesId,
              mk: tar.mk,
              processId: tar.processId,
              status: tar.status,
              taskId: tar.taskId,
              xh: tar.xh,
            }));
          });
          break;
      }
      this.upDownIndex = this.upDownIndex - 1;
    },
    async downDate() {
      if (
        this.upDownIndex == 9 ||
        (this.queryParams.total < 10 &&
          this.upDownIndex == this.queryParams.total - 1) ||
        (this.queryParams.pageSize > 1 &&
          this.queryParams.pageNum * 10 - this.queryParams.total > 0 &&
          this.upDownIndex ==
            this.queryParams.total - (this.queryParams.pageNum - 1) * 10 - 1)
      ) {
        this.$message.warning("已到最后一行");
      } else {
        var tarIndex = this.upDownIndex + 1;
        var tar = this.updownDate[tarIndex];
        var data = {
          xh: tar.xh,
          pageNum: "",
          pageSize: "",
          orderZd: "",
          orderPx: "",
          businesId: tar.businesId,
        };
        switch (tar.mk) {
          case "奖学金":
            this.whatType = "7";
            await query7(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "资格认证":
            this.whatType = "6";
            await query6(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "志愿服务":
            this.whatType = "4";
            await query4(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "社会实践":
            this.whatType = "3";
            await query3(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "社团经历":
            this.whatType = "2";
            await query2(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "培训经历":
            await query1(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            this.whatType = "1";
            break;
          case "干部经历":
            this.whatType = "8";
            await queryGbjl(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "荣誉称号":
            this.whatType = "9";
            await queryRych(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "活动信息":
            this.whatType = "10";
            await queryHdxx(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "创业经历":
            this.whatType = "11";
            await queryCyjl(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "科研论文":
            this.whatType = "12";
            await queryLwqk(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "科研专利":
            this.whatType = "13";
            await queryKyzl(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "科研著作":
            this.whatType = "14";
            await queryKyzz(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "软件著作":
            this.whatType = "15";
            await queryRjzz(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
          case "研究报告":
            this.whatType = "16";
            await queryYjbg(data).then((res) => {
              this.tableDetails = res.data;
              this.commonParams = res.data.map((v) => ({
                businesId: tar.businesId,
                mk: tar.mk,
                processId: tar.processId,
                status: tar.status,
                taskId: tar.taskId,
                xh: tar.xh,
              }));
            });
            break;
        }
        this.upDownIndex = this.upDownIndex + 1;
      }
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.businesId);
      }
      this.exportParams.pageNum = 0;
      this.$set(this.exportParams, "ids", ids);
      //this.$set(this.exportParams, "status", "1");
      texcelExportCzdaFlow(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "成长档案待审核列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});

      this.showExport = false;
    },
    async expor() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwh: this.moreIform.dwh,
        zydm: this.moreIform.zydm,
        bjm: this.moreIform.bjm,
        mk: this.moreIform.mk,
        pyccm: this.training.choose || [],
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      if (this.multipleSelection.length > 0) {
        this.leng = this.multipleSelection.length;
      } else {
        await queryDshList(data)
          .then((res) => {
            this.leng = res.totalCount;
          })
          .catch((err) => {});
      }
      console.log(this.leng);
      if (this.leng > 0) {
        this.showExport = true;
      } else {
        this.$message.warning("当前无数据导出");
      }
    },
    detailCancel() {
      this.detailModal = false;
      this.commonParams = [];
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
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    //通过
    pass() {
      if (this.commonParams.length > 0) {
        var data = this.commonParams.map((item) => ({
          ...item,
          opMsg: "审核通过",
        }));
        tyFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("审核已通过");
            this.detailModal = false;
            this.handleSearch();
          }
        });
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    //拒绝
    refuse() {
      if (this.commonParams.length > 0) {
        this.jjModal = true;
        this.jjly = "";
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    jjCancel() {
      this.jjModal = false;
    },
    jjConfirm() {
      var data = this.commonParams.map((item) => ({
        ...item,
        opMsg: this.jjly,
      }));
      jjFlow(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.detailModal = false;
          this.handleSearch();
        }
      });
      this.jjModal = false;
    },
    async back() {
      if (this.commonParams.length > 0) {
        var processId = { processId: this.commonParams[0].taskId };
        await backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    thTableCancel() {
      this.thTableModal = false;
    },
    thTableConfirm() {
      if (!!this.tempRadio || this.tempRadio === 0) {
        this.thTableModal = false;
        this.thModal = true;
      } else {
        this.$message.error("请先勾选退回的节点");
      }
    },
    thCancel() {
      this.thModal = false;
    },
    thConfirm() {
      this.thModal = false;
      var data = this.commonParams.map((item) => ({
        ...item,
        opMsg: this.thly,
      }));
      var targ = {
        czdaFlowNodeRes: this.multipleSelection1,
        czdaFlowOpReqList: data,
      };
      thFinal(targ).then((res) => {
        if (res.errcode == "00") {
          this.detailModal = false;
          this.$message.success("退回成功");
          this.handleSearch();
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
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.zydm = []; // 专业
        this.moreIform.bjm = []; // 班级
      }
      this.getZY(val);
      this.getBJ(val);
    },
    // 学院找专业
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
    // expor() {
    //   var rqs = "";
    //   var rqe = "";
    //   var idList = [];
    //   this.multipleSelection.map((item) => idList.push(item.id));
    //   var data = {
    //     xm: this.select == "xm" ? this.searchVal : null,
    //     xh: this.select == "xh" ? this.searchVal : null,
    //     xzmc: this.select == "xzmc" ? this.xzmc : null,
    //     buyEndTime: rqs,
    //     buyStartTime: rqe,
    //     cbgs: this.select == "cbgs" ? this.cbgs : null,
    //     lxr: this.select == "lxr" ? this.lxr : null,
    //     lxdh: this.select == "lxdh" ? this.lxdh : null,
    //     xzlxList: this.moreIform.xzlx,
    //     pageNum: this.queryParams.pageNum,
    //     pageSize: this.queryParams.pageSize,
    //     orderZd: this.queryParams.orderZd,
    //     orderPx: this.queryParams.orderPx,
    //   };
    //   if (this.multipleSelection.length > 0) {
    //     expor({ idList: idList }).then((res) =>
    //       this.downloadFn(res, "学平险列表下载", "xlsx")
    //     );
    //   } else {
    //     expor(data).then((res) =>
    //       this.downloadFn(res, "学平险列表下载", "xlsx")
    //     );
    //   }
    // },

    async hadleDetail(row, index) {
      console.log("row", row);
      this.upDownIndex = index;
      this.defaultRes = row;
      this.detailModal = true;
      var data = {
        xh: row.xh,
        pageNum: "",
        pageSize: "",
        orderZd: "",
        orderPx: "",
        businesId: row.businesId,
      };
      switch (row.mk) {
        case "奖学金":
          this.whatType = "7";
          await query7(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "资格认证":
          this.whatType = "6";
          await query6(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "志愿服务":
          this.whatType = "4";
          await query4(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "社会实践":
          this.whatType = "3";
          await query3(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "社团经历":
          this.whatType = "2";
          await query2(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "培训经历":
          await query1(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          this.whatType = "1";
          break;
        case "干部经历":
          this.whatType = "8";
          await queryGbjl(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "荣誉称号":
          this.whatType = "9";
          await queryRych(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "活动信息":
          this.whatType = "10";
          await queryHdxx(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "创业经历":
          this.whatType = "11";
          await queryCyjl(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "科研论文":
          this.whatType = "12";
          await queryLwqk(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "科研专利":
          this.whatType = "13";
          await queryKyzl(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "科研著作":
          this.whatType = "14";
          await queryKyzz(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "软件著作":
          this.whatType = "15";
          await queryRjzz(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
        case "研究报告":
          this.whatType = "16";
          await queryYjbg(data).then((res) => {
            this.tableDetails = res.data;
            this.commonParams = res.data.map((v) => ({
              businesId: row.businesId,
              mk: row.mk,
              processId: row.processId,
              status: row.status,
              taskId: row.taskId,
              xh: row.xh,
            }));
          });
          break;
      }
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
        zydm: this.moreIform.zydm,
        bjm: this.moreIform.bjm,
        mk: this.moreIform.mk,
        pyccm: this.training.choose || [],
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryDshList(data)
        .then((res) => {
          this.tableData = res.data;
          this.updownDate = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        mk: v.mk,
        processId: v.processId,
        status: v.status,
        taskId: v.taskId,
        xh: v.xh,
      }));
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
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
          background: url("../../../../assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("../../../../assets/images/chevronUp.png") no-repeat;
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
          background: url("../../../../assets/images/updata.png") no-repeat;
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
          .passIcon {
            margin-top: 10px;
            background: url("~@/assets/images/passWhite.png") no-repeat;
          }
          .refuseIcon {
            margin-top: 10px;
            background: url("~@/assets/images/refuse.png") no-repeat;
          }
          .backIcon {
            margin-top: 10px;
            background: url("~@/assets/images/back.png") no-repeat;
          }
        }
      }
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
</style>
