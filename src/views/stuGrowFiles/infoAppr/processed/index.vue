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
            placeholder="查询条件"
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
            <span>专业：</span>
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
            <span>班级：</span>
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
          <!-- <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div> -->
          <div class="btns borderRed" @click="back">
            <i class="icon orangeIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse">
            <i class="icon orangeIcon"></i><span class="title">拒绝</span>
          </div>
          <div class="btns fullGreen" @click="pass">
            <i class="icon orangeIcon"></i><span class="title1">通过</span>
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
          <el-table-column prop="xh" label="学号"> </el-table-column>
          <el-table-column prop="xm" label="姓名"> </el-table-column>
          <el-table-column prop="dwhmc" label="培养单位"> </el-table-column>
          <el-table-column prop="pyccmmc" label="培养层次"> </el-table-column>
          <el-table-column prop="zydmmc" label="专业"> </el-table-column>
          <el-table-column prop="bjmmc" label="班级"> </el-table-column
          ><el-table-column prop="mk" label="所属模块"> </el-table-column
          ><el-table-column prop="createTime" label="申报日期">
          </el-table-column>

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
      <el-dialog title="申报详情" :visible.sync="detailModal" width="80%">
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
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="detailCancel"
            >确 定</el-button
          >
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
} from "@/api/growFiles/infoAppr";
import {
  query1,
  query2,
  query3,
  query4,
  query5,
  query6,
  query7,
} from "@/api/stuDangan/detailList/many";
import { getCollege } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
export default {
  name: "manStudent",
  components: { CheckboxCom },
  data() {
    return {
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
      tableData: [],
      allDwh: [],
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      mkOps: [
        { mc: "奖学金" },
        { mc: "社会实践" },
        { mc: "社团经历" },
        { mc: "校内外培训" },
        { mc: "学习成绩" },
        { mc: "资格认证" },
        { mc: "志愿服务" },
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
        { dm: "stlx", mc: "社团类型" },
        { dm: "gkdwmc", mc: "挂靠单位" },
        { dm: "rzzw", mc: "任职职务" },
        { dm: "kssj", mc: "开始时间" },
        { dm: "jssj", mc: "结束时间" },
        { dm: "zdlsxm", mc: "指导老师" },
      ],
      tableHeader3: [
        { dm: "xmmc", mc: "项目名称" },
        { dm: "zzdw", mc: "组织单位" },
        { dm: "djm", mc: "等级" },
        { dm: "lx", mc: "类型" },
        { dm: "sjdd", mc: "实践地点" },
        { dm: "kssj", mc: "开始时间" },
        { dm: "jssj", mc: "结束时间" },
        { dm: "zmr", mc: "证明人" },
        { dm: "lxfs", mc: "联系方式" },
      ],
      tableHeader4: [
        { dm: "xmmc", mc: "项目名称" },
        { dm: "zzdw", mc: "组织单位" },
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
        { dm: "zslx", mc: "证书类型" },
        { dm: "cj", mc: "成绩" },
        { dm: "djm", mc: "等级" },
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
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode1("dmsplcm"); // 培养层次
  },

  methods: {
    detailCancel() {
      this.detailModal = false;
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
        var processId = { processId: this.commonParams[0].processId };
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
    expor() {
      var rqs = "";
      var rqe = "";
      var idList = [];
      this.multipleSelection.map((item) => idList.push(item.id));
      var data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        xzmc: this.select == "xzmc" ? this.xzmc : null,
        buyEndTime: rqs,
        buyStartTime: rqe,
        cbgs: this.select == "cbgs" ? this.cbgs : null,
        lxr: this.select == "lxr" ? this.lxr : null,
        lxdh: this.select == "lxdh" ? this.lxdh : null,
        xzlxList: this.moreIform.xzlx,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      if (this.multipleSelection.length > 0) {
        expor({ idList: idList }).then((res) =>
          this.downloadFn(res, "学平险列表下载", "xlsx")
        );
      } else {
        expor(data).then((res) =>
          this.downloadFn(res, "学平险列表下载", "xlsx")
        );
      }
    },

    async hadleDetail(row) {
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
        case "校内外培训":
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
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
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
        width: 110px;
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
        }
      }
    }
  }
}
</style>
