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
              v-model="moreIform.dwhList"
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
              v-model="moreIform.zydmList"
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
              v-model="moreIform.bjList"
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
            <span>年<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.njList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in allNj"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
           <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>住宿类型：</span>
            <el-select
              v-model="moreIform.zslxmList"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in zslxOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>修改时间：</span>
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
        </el-row> -->
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>审核状态：</span>
            <el-select
              v-model="moreIform.statusList"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in ztStatus"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">性<span v-html="'\u3000\u3000'"></span>别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="dmxbmOPs"
                @training="dmxbmAll"
                @checkedTraining="dmxbmCheck"
              ></checkboxCom>
            </div>
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
          <span class="title">已处理列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="mbDown" v-show="AUTHFLAG">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderBlue" v-show="AUTHFLAG">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon blueIcon"></i><span class="title">导入</span>
            </el-upload>
          </div>
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderLight" @click="handleDelete" v-show="AUTHFLAG">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="handleNew" v-show="AUTHFLAG">
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
          <el-table-column prop="xh" label="学号" width="100" sortable> </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85" sortable> </el-table-column>
          <el-table-column prop="xb" label="性别" width="85" sortable> </el-table-column>
          <el-table-column prop="pycc" label="培养层次" width="100" sortable> </el-table-column>
          <el-table-column prop="dwmc" label="培养单位" min-width="100" sortable> </el-table-column>
          <el-table-column prop="zslx" label="住宿类型" min-width="100" sortable> </el-table-column>
          <el-table-column prop="zsksrq" label="住宿开始时间" min-width="100" sortable> </el-table-column>
          <el-table-column prop="zsjsrq" label="住宿结束时间" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="statusChinese" label="审核状态" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button 
                type="text" 
                size="small" 
                @click="lctClick(scope.row)"
                v-show="scope.row.sftb == '1'"
              >
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
              <el-button 
                type="text" 
                size="small" 
                @click="lctClick(scope.row)"
                v-show="scope.row.sftb !== '1'"
                disabled
              >
                <i class="scopeIncon lct"></i>
                <span class="handleName2">流转记录</span>
              </el-button>
            </template>
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

      <el-dialog
        title="申报详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="50%"
      >
        <template>
          <div class="baseInfo">
          <el-form :data="formDetails" label-width="110px">
            <div class="formLeft"><span class="title">基本信息</span></div>
            <div class="backDetail">
            
            <div class="formRight">
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学号</div>
                    <div class="content">{{ formDetails.xh }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">姓名</div>
                    <div class="content">{{ formDetails.xm }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">性别</div>
                    <div class="content">{{ formDetails.xb }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养层次</div>
                    <div class="content">{{ formDetails.pycc }}</div>
                  </div>
                </el-col>
                
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养单位</div>
                    <div class="content">{{ formDetails.dwmc }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业</div>
                    <div class="content">{{ formDetails.zy }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">年级</div>
                    <div class="content">{{ formDetails.nj }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">班级</div>
                    <div class="content">{{ formDetails.bjmmc }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
            </div>
            <div class="formLeft"><span class="title">申请信息</span></div>
            <div>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="申请住宿类型" prop="zslxm" :rules="rules.zslxm">
                    <div>{{formDetails.zslx}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-show="jzflag ==2">
                  <el-form-item
                    label="是否退宿"
                    prop="sfts"
                  >
                    <div>{{formDetails.sftsmc}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                
              </el-row>
              <el-row :gutter="20">
                
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" v-show="jzflag ==1">
                  <el-form-item
                    label="申请住宿地点"
                    prop="xzsdzm"
                  >
                    <div>{{formDetails.sqld + "  "+ formDetails.sqfj}}</div> 
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-show="jzflag ==2">
                  <el-form-item
                    label="非集中住宿地址"
                    prop="xzsdzm"
                  >
                    <div>{{formDetails.xzsdz + "  "+ formDetails.xzsxxdz}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="原住宿地址"
                    prop="yzsdzm"
                  >
                    <div v-show="jzflag ==1">
                      <div>{{formDetails.yzsdz + "  "+ formDetails.yzsxxdz}}</div>
                    </div>
                    <div v-show="jzflag ==2">
                      <div>{{formDetails.sqld + "  "+ formDetails.sqfj}}</div> 
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="住宿时间" prop="datePickerEdit">
                    <div>{{formDetails.zsksrq + " 至 "+ formDetails.zsjsrq}}</div>
                    <!-- <div v-show="isEdit == 1">
                    <el-date-picker
                      type="daterange"
                      placeholder="选择日期"
                      v-model="datePickerEdit"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                    </div> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="申请理由" prop="sqly">
                    <div>{{formDetails.sqly}}</div>
                    <!-- <el-input
                      v-model="formDetails.sqly"
                      type="textarea"
                      maxlength="2000"
                      :disabled="isEdit == 0"
                      placeholder="请输入"
                    ></el-input> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请材料">
                    <div>
                      <div v-for="item in formDetails.fileList">
                        <div style="display: flex; justify-content: space-between ">
                          <a>
                            <span style="color: #005657">{{ item.fileName }}</span>
                          </a>
                          <!-- <el-button>预览</el-button> -->
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <!-- <div class="formLeft"><span class="title">审核信息</span></div>
          <el-form>
            <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核结果"
                    label-width="120px" 
                    prop="shjg"
                  >
                    {{formDetails.statusChinese}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核意见" label-width="120px">
                    {{formDetails.msg}}

                  </el-form-item>
                </el-col>
              </el-row>
          </el-form> -->

          <!-- <el-form :data="editDetails" ref="editDetails" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核结果"
                    label-width="120px" 
                    prop="shjg"
                  >
                    <el-select
                      v-model="editDetails.shjg"
                      collapse-tags
                      @change="changeJG(editDetails.shjg)"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in shjgOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核意见" label-width="120px" prop="shyj">
                    <el-input 
                      v-model="editDetails.shyj"
                      :autosize="{ minRows: 2 }"
                      type="textarea"
                      maxlength="500"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form> -->
              
          </div>
        </template>
        <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="detailCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="editClick"
          >确 定</el-button>
      </span> -->
      </el-dialog>
      <el-dialog
      title="新增申请"
      :visible.sync="addModal"
      width="50%"
      :close-on-click-modal="false"
      @close="emptyAdd()"
    >
      <el-form
        ref="formAdd"
        :model="formAdd"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="学生姓名" prop="xsxm" :rules="rules.xsxm">
              <el-autocomplete
                v-model="formAdd.xsxm"
                :fetch-suggestions="querySearch"
                placeholder="请输入学生姓名"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
              
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input v-model="formAdd.xsxh" readonly/>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请住宿类型" prop="zslxm" :rules="rules.zslxm">
              <el-select
                v-model="formAdd.zslxm"
                placeholder="请选择住宿类型"
                @change="changeZslx(formAdd.zslxm)"
                collapse-tags
              >
                <el-option
                  v-for="(item, index) in zslxOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="jzflag ==2">
            <el-form-item
              label="是否退宿"
              label-width="100px"
              :rules="jzflag ==2 ? rules.sfts :[{ required: false}]"
              prop="sfts"
            >
              <el-select
                v-model="formAdd.sfts"
                placeholder="非集中是否退宿"
                collapse-tags
              >
                <el-option
                  v-for="(item, index) in sftsOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" v-if="jzflag ==1">
            <el-form-item
              label="申请住宿地点"
              prop="sqldid"
            >
                <el-select
                  v-model="formAdd.sqldid"  
                  placeholder="集中寝室楼栋"
                  @change="changeLD(formAdd.sqldid)"
                  clearable
                  collapse-tags
                >
                  <el-option
                    v-for="(item, index) in ldOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="formAdd.sqfjid"  
                  placeholder="集中寝室房间"
                  collapse-tags
                  clearable
                >
                  <el-option
                    v-for="(item, index) in fjOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="jzflag ==2">
            <el-form-item
              label="非集中住宿地址"
              :rules="jzflag ==2 ? rules.xzsdzm :[{ required: false}]"
              prop="xzsdzm"
            >
                <el-cascader
                  v-model="formAdd.xzsdzm"
                  :options="options"
                  @change="handleChangeJgX"
                  :props="locationProps"
                ></el-cascader>
                <el-input v-model="formAdd.xzsxxdz" maxlength="255" placeholder="请输入详细地址"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="原住宿地址"
              prop="yzsdzm"
              label-width="100px"
              :rules="jzflag ==1 ? rules.yzsdzm :[{ required: false}]"
            >
              <div v-if="jzflag ==1">
                <el-cascader
                  v-model="formAdd.yzsdzm"
                  :options="options"
                  @change="handleChangeJgY"
                  :props="locationProps"
                ></el-cascader>
                <el-input v-model="formAdd.yzsxxdz" 
                  maxlength="255"
                  placeholder="请输入详细地址"/>
              </div>
              <div v-if="jzflag ==2">
                <div>{{formAdd.sqld + "  "+ formAdd.sqfj}}</div> 
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form-item label="住宿时间" prop="datePickerAdd"  :rules="rules.datePickerAdd">
              <el-date-picker
                type="daterange"
                placeholder="选择日期"
                v-model="formAdd.datePickerAdd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请理由" prop="sqly">
              <el-input
                v-model="formAdd.sqly"
                type="textarea"
                maxlength="2000"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请材料" width="360px">
              <el-upload
                action="#"
                multiple
                class="el-upload"
                :auto-upload="false"
                ref="upload"
                :file-list="formAdd.files"
                :on-change="fileChange"
                accept=".pdf,.jpg"
                :before-remove="beforeRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addClick"
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
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出{{ leng }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 批量删除对话框 -->
    <el-dialog title="删除" :visible.sync="showDelete" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="rmRecord"
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
import CheckboxCom from "../../../../components/checkboxCom";
import {
  queryYshList,
  queryDshDetail,
  exportZjbbFlowed,
  mbDown,
  zssqAdd,
  zssqImport,
  del,
} from "@/api/dailyBehavior/dormTea"
import {
  queryFj,
  queryLd,
  queryLdAndFj,
} from "@/api/dailyBehavior/dormStu";
import { getCollege,getGrade } from "@/api/class/maintenanceClass";
import { getZY, getBJ} from "@/api/student/index";
import lctCom from "../../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getLocationjl } from "@/api/student/index";
import { delwj } from "@/api/assistantWork/classEvent";
import { getToken } from "@/utils/auth";
import { queryStuList } from "@/api/assistantWork/homeSchool";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
  computed: {
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
  },
  data() {
    return {
      showExport: false,
      lctModal: false,
      ztStatus: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwhList: [], // 学院下拉框
        zydmList: [],
        bjList: [],
        njList:[],
        zslxmList:[],
        statusList:[],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [],
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      allNj: [], //年级下拉
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
      detailModal: false,
      formDetails: {
        sqldid:"",
        sqfjid:"",
      },
      editDetails:[],
      editparams:{},
      shjgOps:[
        {dm:'01',mc: '通过'},
        {dm:'02',mc: '拒绝'},
        {dm:'03',mc: '退回'},
      ],
      jzflag: 1,//1集中2非集中
      zslxOps: [
        {dm: "1", mc: "校内集中住宿"},
        {dm: "2", mc: "非集中住宿"},
      ],
      dmxbmOPs: {
        // 性别：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      uploadUrl: process.env.VUE_APP_BASE_API + "/rcswZssq/importExcel",
      addModal: false,
      formAdd: {
        xsxm:"",
        xsxh:"",
        sqld:"",
        sqfj:"",
        yzsdzm: "",
        xzsdzm: "",
        datePickerAdd: [],
      },
      jzflag: 1,//1集中2非集中
      zslxOps: [
        {dm: "1", mc: "校内集中住宿"},
        {dm: "2", mc: "非集中住宿"},
      ],
      fjOps:[],
      ldOps:[],
      sftsOps:[],
      //地区级联
      locationProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      fileList: [],
      fileListAdd: [],
      showDelete: false,
      delArr: [],
      rules: {
        xsxm:[
          { required: true, message: "学生姓名不能为空", trigger: "change" },
        ],
        sfts: [
          { required: true, message: "是否退宿不能为空", trigger: "change" },
        ],
        zslxm: [
          { required: true, message: "住宿类型不能为空", trigger: "change" },
        ],
        yzsdzm: [
          { required: true, message: "原住宿地址不能为空", trigger: "change" },
        ],
        xzsdzm:[
          { required: true, message: "新住宿地址不能为空", trigger: "change" },
        ],
        datePickerAdd:[
          { required: true, message: "住宿时间不能为空", trigger: "change" },
        ],
      },
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次dmxbm
    this.getCode("dmxbm"); // 性别
    this.getCode1("dmsplcm"); 
    this.getCode1("dmsfbzm");//是否
    this.getLocationjl();
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  methods: {
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
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let idList = [];
      for (let item_row of this.multipleSelection) {
        idList.push(item_row.businesId);
      }
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "idList", idList);
      //this.$set(this.exportParams, "status", "1");
      exportZjbbFlowed(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "住宿申请已处理列表导出.xlsx", "xlsx");
          if(this.$store.getters.excelcount > 0){
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
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        bjmList: this.moreIform.bjList,
        njList: this.moreIform.njList,
        zslxmList: this.moreIform.zslxmList,
        pyccmList: this.training.choose || [],
        xbmList: this.dmxbmOPs.choose || [],
        loginId: this.$store.getters.userId,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      if (this.multipleSelection.length > 0) {
        this.leng = this.multipleSelection.length;
      } else {
        await queryYshList(data)
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
    getCode1(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
          case "dmsfbzm":
            this.sftsOps = res.data; //是否
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
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.stuInfo = []; // 专业
        this.moreIform.pread = []; // 班级
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
    //获取年级
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.allNj = res.data.rows;
        })
        .catch((err) => {});
    },
    async hadleDetail(row) {
      console.log("row", row);
      this.detailModal = true;
      this.editparams = row;
      var data = {
        xh: row.xh,
        roleId: this.$store.getters.roleId,
        businesId: row.businesId,
      };
      await queryDshDetail(data).then((res) => {
        this.formDetails = res.data;
        this.jzflag = res.data.zslxm;
      });
      
    },
    detailCancel() {
      this.detailModal = false;
      this.commonParams = [];
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      // let rqs,rqe = "";
      // if (this.datePicker && this.datePicker.length > 0) {
      //   rqs = this.datePicker[0];
      //   rqe = this.datePicker[1];
      // }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        bjList: this.moreIform.bjList,
        njList: this.moreIform.njList,
        zslxmList: this.moreIform.zslxmList,
        pyccmList: this.training.choose || [],
        xbmList: this.dmxbmOPs.choose || [],
        loginId: this.$store.getters.userId,
        statusList: this.moreIform.statusList,
        // sqsjs: rqs || "",
        // sqsje: rqe || "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryYshList(data)
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
      //流程
    lctClick(row) {
      if (!!row.processId) {
        this.$refs.child.inner(row.processId);
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
            case "dmxbm":
              this.$set(this.dmxbmOPs, "checkBox", res.data);
              this.xbOps = res.data;
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
    // 性别：全选
    dmxbmAll(val) {
      let allCheck = [];
      for (let i in this.dmxbmOPs.checkBox) {
        allCheck.push(this.dmxbmOPs.checkBox[i].dm);
      }
      this.dmxbmOPs.choose = val ? allCheck : [];

      this.dmxbmOPs.isIndeterminate = false;
    },
    // 性别：单选
    dmxbmCheck(value) {
      let checkedCount = value.length;
      this.dmxbmOPs.checkAll = checkedCount === this.dmxbmOPs.checkBox.length;
      this.dmxbmOPs.isIndeterminate =
        checkedCount > 0 && checkedCount < this.dmxbmOPs.checkBox.length;
      // console.log(this.dmxbmOPs.choose, "单选");
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = val.map((item) => item.businesId);
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processId: v.processId,
        status: v.status,
        taskId: v.taskId,
        xh: v.xh,
      }));
    },
    //导入失败
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.handleSearch();
        this.$message({
          type: "success",
          message: res.errmsg,
        });
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    delCancel() {
      this.showDelete = false;
    },
    //批量删除
    rmRecord() {
      this.showDelete = false;
      del({ ids: this.delArr })
        .then((res) => {
          this.$message.success("删除成功");
          this.handleSearch();
        })
        .catch((err) => {});
    },
    handleDelete() {
      if (this.delArr && this.delArr.length > 0) {
          this.showDelete = true;
        } else {
          this.$message.error("请先勾选数据");
        }
    },
    //模板下载
    mbDown() {
      mbDown().then((res) => {
        this.downloadFn(res, "住宿申请模板下载", "xlsx");
      });
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.fileList = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 2) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过2M");
      } else if (file.status == "ready") {
        this.fileListAdd = [];
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
    },
    //新增
    handleNew() {
      this.formAdd={};
      this.formAdd.files = [];
      this.fileList = [];
      this.addModal = true;

      
      //获取楼栋
      queryLd()
        .then((res)=>{
          if (res.errcode == "00") {
            this.ldOps = res.data;
          }
        })
        .catch((err) => {});
      // 楼栋房间自动回显
      queryLdAndFj( this.$store.getters.userId ).then((res) =>{
        this.formAdd.sqld= res.data !==null ? res.data.ld : null;
        this.formAdd.sqfj= res.data !==null ? res.data.fj : null;
      });
      
    },
    addCancel() {
      this.addModal = false;
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let rqs,
          rqe = "";
        if (this.formAdd.datePickerAdd && this.formAdd.datePickerAdd.length > 0) {
          rqs = this.formAdd.datePickerAdd[0];
          rqe = this.formAdd.datePickerAdd[1];
        }
        let formData = new FormData();
        formData.append("zslxm", this.formAdd.zslxm);
        formData.append("zsjsrq", rqe);
        formData.append("zsksrq", rqs);
        formData.append("sfts", this.formAdd.sfts ||"");
        formData.append("sqfjid", this.formAdd.sqfjid ||"");
        formData.append("sqldid", this.formAdd.sqldid ||"");
        formData.append("sqly", this.formAdd.sqly);
        formData.append("xzsdzm", this.formAdd.xzsdzm ||"");
        formData.append("xzsxxdz", this.formAdd.xzsxxdz ||"");
        formData.append("yzsdzm", this.formAdd.yzsdzm ||"");
        formData.append("yzsxxdz", this.formAdd.yzsxxdz);
        formData.append("xh", this.formAdd.xsxh);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        zssqAdd(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.addModal = false;
            this.handleSearch();
          } else {
            this.$message.error("新增失败");
          }
        });
        
      }
    },
    changeZslx(flag){
      if( flag && flag == 1){
        this.jzflag = 1;
      } else{ 
        this.jzflag = 2;
      }
    },
    changeLD(flag){
      queryFj({ dm: flag }).then((res) => {
        if (res.errcode == "00") {
          this.fjOps = res.data;
        } else {
          this.$message.error("获取房间号失败");
        }
      });
    },
    getLocationjl() {
      getLocationjl().then((res) => {
        this.options = res.data;
      });
    },
    emptyAdd() {
      this.$nextTick(() => {
        this.$refs.formAdd.resetFields();
      });
    },
    handleChangeJgY(value) {
      if (value && value.length == 1) {
        console.log("value.length",value.length);
        //若是简单下拉框，则绑定v-model就可以
        this.formAdd.yzsdzm= this.formAdd.yzsdzm ? this.formAdd.yzsdzm = value[0]: "";
        console.log(this.formAdd.yzsdzm);
      } else if (value && value.length == 2) {
        this.formAdd.yzsdzm= this.formAdd.yzsdzm ? this.formAdd.yzsdzm = value[1]: "";
        console.log(this.formAdd.yzsdzm);
      } else {
        this.formAdd.yzsdzm= this.formAdd.yzsdzm ? this.formAdd.yzsdzm = value[2]: "";
        console.log(this.formAdd.yzsdzm);
      }
    },
    handleChangeJgX(value) {
      if (value && value.length == 1) {
        this.formAdd.xzsdzm= this.formAdd.xzsdzm ? this.formAdd.xzsdzm = value[0]: "";
      } else if (value && value.length == 2) {
        this.formAdd.xzsdzm= this.formAdd.xzsdzm ? this.formAdd.xzsdzm = value[1]: "";
      } else {
        this.formAdd.xzsdzm= this.formAdd.xzsdzm ? this.formAdd.xzsdzm = value[2]: "";
      }
    },
    //学生
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xm).then((res) => {
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
    handleSelect(item){
      this.formAdd.xsxh = item.gh;
      this.formAdd.xsxm = item.xm;
      console.log("this.formAdd.xsxh",this.formAdd.xsxh);

    },
  },
};
</script>

<style lang="scss" scoped>
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
  .handleName2 {
    font-weight: 400;
    font-size: 14px;
    color: #bfbfbf;
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
        .borderLight {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .borderGreen {
          border: 1px solid grey;
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
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
        }
      }
    }
  }
  .baseInfo{
    margin-left: 30px;
    margin-right: 30px;
  }
  .formLeft {
      background: #fff;
      display: flex;
      flex-direction:row;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
    }
  .backDetail {
    display: flex;
    margin-bottom: 20px;
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
</style>
