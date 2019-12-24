<template>
    <div class="execution">
        <basic-container>
            <avue-crud ref="crud"
                       :page="page"
                       :data="tableData"
                       :permission="permissionList"
                       :table-loading="tableLoading"
                       :option="tableOption"
                       @on-load="getList"
                       @search-change="searchChange"
                       @refresh-change="refreshChange"
                       @row-update="handleUpdate"
                       @row-save="handleSave"
                       @row-del="rowDel">
                       <template slot="alarmColorForm"
                      slot-scope="scope">
                               <!-- <el-input type="color" v-model="scope.row.alarmColor" @change="changeColor(scope)" placeholder="请输入内容"></el-input> -->
                               <el-color-picker v-model="scope.row.alarmColor" @change="changeColor(scope)"></el-color-picker>
            </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
    import {
        fetchList,
        getObj,
        addObj,
        putObj,
        delObj
    } from '@/api/datamon/sysalarmconfig'
    import {
        tableOption
    } from '@/const/crud/datamon/sysalarmconfig'
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: 'sysalarmconfig',
        data() {
            return {
                tableData: [],
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20 // 每页显示多少条
                },
                tableLoading: false,
                tableOption: tableOption
            }
        },
        computed: {
            ...mapGetters(['permissions']),
            permissionList() {
                return {
                    addBtn: this.vaildData(this.permissions.admin_sysalarmconfig_add, true),
                    delBtn: this.vaildData(this.permissions.admin_sysalarmconfig_del, true),
                    editBtn: this.vaildData(this.permissions.admin_sysalarmconfig_edit, true)
                };
            }
        },
        methods: {
            getList(page, params) {
                this.tableLoading = true
                fetchList(Object.assign({
                    current: page.currentPage,
                    size: page.pageSize
                }, params)).then(response => {
                    this.tableData = response.data.data.records
                    this.page.total = response.data.data.total
                    this.tableLoading = false
                })
            },
            rowDel: function (row, index) {
                var _this = this
                this.$confirm('是否确认删除ID为' + row.alarmconfigId, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    return delObj(row.alarmconfigId)
                }).then(data => {
                    _this.tableData.splice(index, 1)
                    _this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    })
                    this.getList(this.page)
                }).catch(function (err) {
                })
            },
            /**
             * @title 数据更新
             * @param row 为当前的数据
             * @param index 为当前更新数据的行数
             * @param done 为表单关闭函数
             *
             **/
            handleUpdate: function (row, index, done) {
                putObj(row).then(data => {
                    this.tableData.splice(index, 1, Object.assign({}, row))
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                    done()
                    this.getList(this.page)
                })
            },
            /**
             * @title 数据添加
             * @param row 为当前的数据
             * @param done 为表单关闭函数
             *
             **/
            handleSave: function (row, done) {
                addObj(row).then(data => {
                    this.tableData.push(Object.assign({}, row))
                    this.$message({
                        showClose: true,
                        message: '添加成功',
                        type: 'success'
                    })
                    done()
                    this.getList(this.page)
                })
            },
            /**
             * 搜索回调
             */
            searchChange(form) {
                this.getList(this.page,  this.filterForm(form))
            },
            /**
             * 刷新回调
             */
            refreshChange() {
                this.getList(this.page)
            },
            // 更改颜色
            changeColor(scope){
                console.log(scope)
                // scope.row.alarmColor = scope.alarmColor
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
