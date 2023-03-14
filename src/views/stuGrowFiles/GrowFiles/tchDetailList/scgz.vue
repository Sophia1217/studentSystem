<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">活动信息</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableDate"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="hdssmc" label="活动/赛事名称" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="zzdw" label="组织单位" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="jb" label="级别" sortable="custom">
          </el-table-column>
          <el-table-column prop="cszp" label="参赛作品" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="cy" label="成员" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="pm" label="排名" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="hdsj" label="活动时间" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="fileList"
            label="参赛凭证"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <div v-for="item in scope.row.fileList">
                <div style="display: flex; justify-content: space-between">
                  <a>
                    {{ item.fileName }}
                  </a>
                  <!-- <el-button>预览</el-button> -->
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="审核状态" sortable="custom">
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
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="bianji(scope.row)"
                v-show="AUTHFLAG"
              >
                <i class="scopeIncon Edit"></i>
                <span>编辑</span>
              </el-button>
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="新增" :visible.sync="addModal" width="80%" :close-on-click-modal="false">
        <el-form ref="formAdd" :model="formAdd" :rules="rules">
          <el-table :data="formAdd.addData">
            <el-table-column label="活动/赛事名称" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.hdssmc'"
                  :rules="rules.hdssmc"
                >
                  <el-input maxlength="200" v-model="scope.row.hdssmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="组织单位" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.zzdw'"
                  :rules="rules.zzdw"
                >
                  <el-input maxlength="200" v-model="scope.row.zzdw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="级别" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.jbm'"
                  :rules="rules.jbm"
                >
                  <el-select
                    v-model="scope.row.jbm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in jbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参赛作品" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.cszp'"
                  :rules="rules.cszp"
                >
                  <el-input maxlength="200" v-model="scope.row.cszp" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="成员" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.cy'"
                  :rules="rules.cy"
                >
                  <el-input maxlength="200" v-model="scope.row.cy" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="排名" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.pm'"
                  :rules="rules.pm"
                >
                  <el-input maxlength="200" v-model="scope.row.pm" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="活动时间" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.hdsj'"
                  :rules="rules.hdsj"
                >
                  <el-date-picker
                    v-model="scope.row.hdsj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参赛凭证" align="center">
              <template slot-scope="scope">
                <el-upload
                  action="#"
                  multiple
                  class="el-upload"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="scope.row.files"
                  :on-change="fileChange"
                  accept=".pdf,.jpg"
                  :before-remove="beforeRemove"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="editModal" width="80%" :close-on-click-modal="false">
        <el-form ref="formEdit" :model="formEdit" :rules="rules">
          <el-table :data="formEdit.editData">
            <el-table-column label="活动/赛事名称" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.hdssmc'"
                  :rules="rules.hdssmc"
                >
                  <el-input maxlength="200" v-model="scope.row.hdssmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="组织单位" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.zzdw'"
                  :rules="rules.zzdw"
                >
                  <el-input maxlength="200" v-model="scope.row.zzdw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="级别" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.jbm'"
                  :rules="rules.jbm"
                >
                  <el-select
                    v-model="scope.row.jbm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in jbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参赛作品" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.cszp'"
                  :rules="rules.cszp"
                >
                  <el-input maxlength="200" v-model="scope.row.cszp" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="成员" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.cy'"
                  :rules="rules.cy"
                >
                  <el-input maxlength="200" v-model="scope.row.cy" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="排名" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.pm'"
                  :rules="rules.pm"
                >
                  <el-input maxlength="200" v-model="scope.row.pm" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="活动时间" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.hdsj'"
                  :rules="rules.hdsj"
                >
                  <el-date-picker
                    v-model="scope.row.hdsj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参赛凭证" align="center">
              <template slot-scope="scope">
                <el-upload
                  action="#"
                  multiple
                  class="el-upload"
                  accept=".pdf,.jpg"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="scope.row.fileList"
                  :on-change="fileChange"
                  :before-remove="beforeRemove"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>活动信息确认删除？</span>
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
      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
      />
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">创业经历</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDelCy">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="xinzengCy">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableDateCy"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChangeCy"
          @sort-change="changeTableSortCy"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="gsmc" label="公司名称" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="zcrq" label="注册日期" sortable="custom">
          </el-table-column>
          <el-table-column prop="zczj" label="注册资金" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="sshy" label="所属行业" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="frdb" label="法人代表" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="zyyw" label="主营业务" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="srzw" label="所任职务" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="qssj" label="参与起始时间" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="jssj" label="参与结束时间" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="status" label="审核状态" sortable="custom">
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
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="bianjiCy(scope.row)"
                v-show="AUTHFLAG"
              >
                <i class="scopeIncon Edit"></i>
                <span>编辑</span>
              </el-button>
              <el-button type="text" size="small" @click="lctClickCy(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="新增" :visible.sync="addModalCy" width="80%" :close-on-click-modal="false">
        <el-form ref="formAddCy" :model="formAddCy" :rules="rules">
          <el-table :data="formAddCy.addDataCy">
            <el-table-column label="公司名称" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.gsmc'"
                  :rules="rules.gsmc"
                >
                  <el-input maxlength="200" v-model="scope.row.gsmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="注册日期" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.zcrq'"
                  :rules="rules.zcrq"
                >
                  <el-date-picker
                    v-model="scope.row.zcrq"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="注册资金" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.zczj'"
                  :rules="rules.zczj"
                >
                  <el-input maxlength="200" v-model="scope.row.zczj" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="所属行业" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.sshy'"
                  :rules="rules.sshy"
                >
                  <el-input maxlength="200" v-model="scope.row.sshy" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="法人代表" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.frdb'"
                  :rules="rules.frdb"
                >
                  <el-input maxlength="200" v-model="scope.row.frdb" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="主营业务" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.zyyw'"
                  :rules="rules.zyyw"
                >
                  <el-input maxlength="200" v-model="scope.row.zyyw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="所任职位" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.srzw'"
                  :rules="rules.srzw"
                >
                  <el-input maxlength="200" v-model="scope.row.srzw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参与起始时间" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.qssj'"
                  :rules="rules.qssj"
                >
                  <el-date-picker
                    v-model="scope.row.qssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(1)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参与结束时间" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addDataCy.' + scope.$index + '.jssj'"
                  :rules="rules.jssj"
                >
                  <el-date-picker
                    v-model="scope.row.jssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(2)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCanceCy">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClickCy"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="editModalCy" width="80%" :close-on-click-modal="false">
        <el-form ref="formEditCy" :model="formEditCy" :rules="rules">
          <el-table :data="formEditCy.editDataCy">
            <el-table-column label="公司名称" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.gsmc'"
                  :rules="rules.gsmc"
                >
                  <el-input maxlength="200" v-model="scope.row.gsmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="注册日期" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.zcrq'"
                  :rules="rules.zcrq"
                >
                  <el-date-picker
                    v-model="scope.row.zcrq"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="注册资金" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.zczj'"
                  :rules="rules.zczj"
                >
                  <el-input maxlength="200" v-model="scope.row.zczj" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="所属行业" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.sshy'"
                  :rules="rules.sshy"
                >
                  <el-input maxlength="200" v-model="scope.row.sshy" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="法人代表" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.frdb'"
                  :rules="rules.frdb"
                >
                  <el-input maxlength="200" v-model="scope.row.frdb" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="主营业务" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.zyyw'"
                  :rules="rules.zyyw"
                >
                  <el-input maxlength="200" v-model="scope.row.zyyw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="所任职位" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.srzw'"
                  :rules="rules.srzw"
                >
                  <el-input maxlength="200" v-model="scope.row.srzw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参与起始时间" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.qssj'"
                  :rules="rules.qssj"
                >
                  <el-date-picker
                    v-model="scope.row.qssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(3)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参与结束时间" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editDataCy.' + scope.$index + '.jssj'"
                  :rules="rules.jssj"
                >
                  <el-date-picker
                    v-model="scope.row.jssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(4)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCanceCy">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClickCy"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <pagination
        v-show="queryParamsCy.totalCount > 0"
        :total="queryParamsCy.totalCount"
        :page.sync="queryParamsCy.pageNum"
        :limit.sync="queryParamsCy.pageSize"
        @pagination="queryCy"
      />
    </div>
    <el-dialog title="删除" :visible.sync="delModalCy" width="20%">
      <span>创业经历确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancelCy">取 消</el-button>
        <el-button type="primary" class="confirm" @click="delCy()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <lctCom
      ref="child"
      :lctModal="lctModalCy"
      @handleCloseLct="handleCloseLctCy"
    ></lctCom>
  </div>
</template>
<script>
import { editHd, delHd, queryHd,
  editCy, delCy, queryCy,
} from "@/api/stuDangan/detailList/scgz";
import lctCom from "../../../components/lct";
import { delwj } from "@/api/assistantWork/classEvent";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  components: { lctCom },
  data() {
    return {
      AUTHFLAG: false,
      lctModal: false,
      lctModalCy:false,
      ztStatus: [],
      addModal: false,
      addModalCy: false,
      editModal: false,
      editModalCy: false,
      submitModal: false,
      submitModalCy: false,
      delModal: false,
      delModalCy: false,
      formAdd: { addData: [] },
      formEdit: { editData: [] },
      formAddCy: { addDataCy: [] },
      formEditCy: { editDataCy: [] },
      tableDate: [],
      tableDateCy: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      queryParamsCy: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      delArr: [],
      delArrCy: [],
      subArr: [],
      subArrCy: [],
      val: [],
      valCy: [],
      fileList: [],
      fileListAdd: [],
      jbOps:[],
      rules: {
        //活动信息校验
        cszp: [
          {
            required: true,
            message: "参赛作品不能为空",
            trigger: "blur",
          },
        ],
        cy: [
          { required: true, message: "成员不能为空", trigger: "blur" },
        ],
        hdsj: [
          {
            required: true,
            message: "活动时间不能为空",
            trigger: "blur",
          },
        ],
        hdssmc: [{ required: true, message: "活动/赛事名称不能为空", trigger: "blur" }],
        jbm: [
          { required: true, message: "级别不能为空", trigger: "change" },
        ],
        pm: [{ required: true, message: "排名不能为空", trigger: "blur" }],
        zzdw: [
          { required: true, message: "组织单位不能为空", trigger: "blur" },
        ],
        //创业经历校验
        frdb: [
          { required: true, message: "法人代表不能为空", trigger: "blur" },
        ],
        gsmc: [
          { required: true, message: "公司名称不能为空", trigger: "blur" },
        ],
        srzw: [
          { required: true, message: "所任职位不能为空", trigger: "blur" },
        ],
        sshy: [
          { required: true, message: "所属行业不能为空", trigger: "blur" },
        ],
        zcrq: [
          {
            required: true,
            message: "注册日期不能为空",
            trigger: "blur",
          },
        ],
        zczj: [
          { required: true, message: "注册资金不能为空", trigger: "blur" },
        ],
        zyyw: [
          { required: true, message: "主营业务不能为空", trigger: "blur" },
        ],
        qssj: [
          {
            required: true,
            message: "起始时间不能为空",
            trigger: "blur",
          },
        ],
        
      },
    };
  },
  mounted() {
    this.query();
    this.queryCy();
    this.getCode("dmsplcm"); //状态
    this.getCode("dmxgjljbm"); //级别
  },
  created() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    /*-----------------------活动信息------------------*/
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
    checkFormEdit() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formEdit.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }

      return true;
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
         this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm":
            this.ztStatus = res.data; //状态
            break;
          case "dmxgjljbm":
            this.jbOps = res.data; //级别
            break;
        }
      });
    },
    del() {
      delHd({ ids: this.delArr }).then((res) => {
        this.$message.success("删除成功");
        this.query();
        this.delModal = false;
      });
      
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.val = val;
      this.delArr = val.map((item) => item.id);
      this.subArr = val.map((item) => item.id);
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
    bianji(row) {
      this.formEdit.editData = [];
      row.fileList = row.fileList.map((ele) => {
        return {
          name: ele.fileName,
          ...ele,
        };
      });
      this.formEdit.editData.push(row);
      this.fileListAdd = [];
      this.editModal = true;
    },
    editCance() {
      this.editModal = false;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {      
        var data = this.formEdit.editData[0];
        let formData = new FormData();
        formData.append("cszp", data.cszp);
        formData.append("cy", data.cy);
        formData.append("hdsj", data.hdsj);
        formData.append("hdssmc", data.hdssmc);
        formData.append("jbm", data.jbm);
        formData.append("id", data.id);
        formData.append("pm", data.pm);
        formData.append("zzdw", data.zzdw);
        formData.append("xh", this.$route.query.xh);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        editHd(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.query();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModal = false;
      }
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAdd.addData[0];
        let formData = new FormData();
        formData.append("cszp", data.cszp);
        formData.append("cy", data.cy);
        formData.append("hdsj", data.hdsj);
        formData.append("hdssmc", data.hdssmc);
        formData.append("jbm", data.jbm);
        formData.append("pm", data.pm);
        formData.append("zzdw", data.zzdw);
        formData.append("xh", this.$route.query.xh);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        editHd(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.query();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
      }
    },
    query() {
      var data = {
        xh: this.$route.query.xh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryHd(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.formAdd.addData = []; // 每次打开弹框先将弹框的table数组置空
      var newLine = {
        cszp: "",
        cy: "",
        hdsj: "",
        hdssmc: "",
        jbm: "",
        pm: "",
        zzdw: "",
        files: [],
      };
      this.fileList = [],
      this.formAdd.addData.push(newLine);
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
    },
    showDel() {

        if (this.delArr && this.delArr.length > 0) {
          this.delModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }

    },
    delCancel() {
      this.delModal = false;
    },

/*----------------分界线-----后面是创业经历------------------------------*/
    // 表单校验
    checkFormAddCy() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAddCy.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }

      return true;
    },
    checkFormEditCy() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formEditCy.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }

      return true;
    },
    handleCloseLctCy() {
      this.lctModalCy = false;
    },
    lctClickCy(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModalCy = true;
      } else {
         this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    delCy() {
      delCy({ ids: this.delArrCy }).then((res) => {
        this.$message.success("删除成功");
        this.queryCy();
        this.delModalCy = false;
      });
      
    },
    changeTableSortCy(column) {
      this.queryParamsCy.orderZd = column.prop;
      this.queryParamsCy.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.queryCy();
    },
    handleSelectionChangeCy(val) {
      this.valCy = val;
      console.log("this.valCy",this.valCy);
      this.delArrCy = val.map((item) => item.id);
      this.subArrCy = val.map((item) => item.id);
    },
    bianjiCy(row) {
      this.formEditCy.editDataCy = [];
      this.formEditCy.editDataCy.push(row);
      this.editModalCy = true;
    },
    editCanceCy() {
      this.editModalCy = false;
    },
    editClickCy() {
      if (!this.checkFormEditCy()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = this.formEditCy.editDataCy[0];
        editCy(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.queryCy();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModalCy = false;
      }
    },
    addClickCy() {
      if (!this.checkFormAddCy()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAddCy.addDataCy[0];
        var params = {
          frdb: data.frdb,
          gsmc: data.gsmc,
          srzw: data.srzw,
          sshy: data.sshy,
          zcrq: data.zcrq,
          zczj: data.zczj,
          zyyw: data.zyyw,
          qssj: data.qssj,
          jssj: data.jssj,
          xh: this.$route.query.xh,
        };
        editCy(params).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.queryCy();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModalCy = false;
      }
    },
    queryCy() {
      var data = {
        xh: this.$route.query.xh,
        pageNum: this.queryParamsCy.pageNum,
        pageSize: this.queryParamsCy.pageSize,
        orderZd: this.queryParamsCy.orderZd ? this.queryParamsCy.orderZd : "",
        orderPx: this.queryParamsCy.orderPx ? this.queryParamsCy.orderPx : "",
      };
      queryCy(data).then((res) => {
        this.tableDateCy = res.data;
        this.queryParamsCy.totalCount = res.totalCount;
      });
    },
    xinzengCy() {
      this.formAddCy.addDataCy = []; // 每次打开弹框先将弹框的table数组置空
      var newLine = {
        frdb: "",
        gsmc: "",
        srzw: "",
        sshy: "",
        zcrq: "",
        zczj: "",
        zyyw: "",
        qssj: "",
        jssj: "",
      };
      this.formAddCy.addDataCy.push(newLine);
      this.addModalCy = true;
    },
    addCanceCy() {
      this.addModalCy = false;
    },
    showDelCy() {

        if (this.delArrCy && this.delArrCy.length > 0) {
          this.delModalCy = true;
        } else {
          this.$message.error("请先勾选数据");
        }

    },
    delCancelCy() {
      this.delModalCy = false;
    },
    // 判断 起始时间 结束时间
    changeDate(flag) {
      let addParams = this.formAdd.addData[0];
      let editParams = this.formEdit.editData[0];
      if (flag==1) {//新增起始时间
        if (addParams.jssj) {
          if (addParams.qssj > addParams.jssj) {
            addParams.qssj = null;
            this.$message.error("起始时间不能大于结束时间！");
          }
        }
      } else if (flag==2) {//新增结束时间
        if (addParams.qssj) {
          if (addParams.qssj > addParams.jssj) {
            addParams.jssj = null;
            this.$message.error("结束时间不能小于起始时间！");
          }
        }
      } else if (flag==3) {
        if (editParams.jssj) {
          if (editParams.qssj > editParams.jssj) {
            editParams.qssj = null;
            this.$message.error("起始时间不能大于结束时间！");
          }
        }
      } else {
        if (editParams.qssj) {
          if (editParams.qssj > editParams.jssj) {
            editParams.jssj = null;
            this.$message.error("结束时间不能小于起始时间！");
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/dangan/editDisable.png") no-repeat;
}
.ch {
  background: url("~@/assets/dangan/ch.png");
}
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
.mt15 {
  margin-top: 15px;
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
      }
    }
  }
}
</style>
