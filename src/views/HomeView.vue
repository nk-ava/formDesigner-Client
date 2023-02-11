<template>
	<div>
		<el-container style="min-height: 100vh">
			<el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
				<el-menu :default-active="openIndex" style="min-height: 100%; overflow-x: hidden"
					background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="#ffd04b"
					:collapse-transition="false" :collapse="isCollapse" @select="openIndex=$event">
					<div style="height: 60px; line-height: 60px; text-align: center">
						<img src="../assets/logo.png" alt=""
							style="width: 20px; position: relative; top: 5px; right: 5px">
						<b style="color: white" v-show="logoTextShow">表单制作管理系统</b>
					</div>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-message"></i>
							<span slot="title">表单/模板管理</span>
						</template>
						<el-menu-item index="1-3">表单管理</el-menu-item>
						<el-menu-item index="1-4">模板管理</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container class="mainDiv">
				<el-header
					style="height: 42px;font-size: 12px; border-bottom: 1px solid #ccc; line-height: 42px; display: flex">
					<div style="flex: 1; font-size: 20px">
						<span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
					</div>
				</el-header>

				<el-main v-show="openIndex=='1-3'" style="padding-top: 10px;">
					<div style="margin-bottom: 10px;height: 7%;">
						<el-input style="width: 200px" placeholder="输入表单名称" v-model="formName"
							suffix-icon="el-icon-search" clearable></el-input>
						<el-button class="ml-5" type="primary" @click="getForm">搜索</el-button>
						<el-button @click="newForm" type="success" style="margin-left: 100px">创建新表单<i
								class="el-icon-circle-plus-outline"></i></el-button>
					</div>
					<el-table height="88%" :data="tableData" border stripe :header-cell-class-name="headerBg">
						<el-table-column prop="name" label="表单名称" width="180" sortable>
						</el-table-column>
						<el-table-column prop="submitTime" label="表单最近修改的时间" width="200" sortable>
						</el-table-column>
						<el-table-column label="描述" width="500">
							<template slot-scope="scope">
								<div @click="handleChangeDetail(scope.row.detail,scope.row.id)">
									{{scope.row.detail||"null"}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" align="center" width="450" fixed="right">
							<template slot-scope="scope">
								<el-button type="success" @click="previewForm(scope.row.id,scope.row.name)">详情 <i
										class="el-icon-view"></i></el-button>
								<el-button type="primary" @click="editForm(scope.row.id)">编辑 <i
										class="el-icon-edit-outline"></i></el-button>
								<el-button type="warning" @click="reFromName(scope.row.id,scope.row.name)">重命名 <i
										class="el-icon-tickets"></i></el-button>
								<el-button type="danger" @click="deleteForm(scope.row.id)">删除 <i
										class="el-icon-remove-outline"></i></el-button>
							</template>
						</el-table-column>
					</el-table>

					<div style="position:absolute;bottom: 3px;right: 20px;height:5%;">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:page-sizes="[5, 10, 15, 20]" :page-size="$root.query.pageSize"
							:current-page="$root.query.currentPage" layout="total, sizes, prev, pager, next, jumper"
							:total="totalPage">
						</el-pagination>
					</div>

				</el-main>

				<el-main v-show="openIndex=='1-4'" style="padding-top: 10px;">
					<div style="margin-bottom: 10px;height: 7%;">
						<el-input style="width: 200px" placeholder="输入模板名称" v-model="tempName"
							suffix-icon="el-icon-search" clearable></el-input>
						<el-button class="ml-5" type="primary" @click="getTemp">搜索</el-button>
						<el-button @click="newTemp" type="success" style="margin-left: 100px">创建新模板<i
								class="el-icon-circle-plus-outline"></i></el-button>
					</div>
					<el-table height="88%" :data="tableData" border stripe :header-cell-class-name="headerBg">
						<el-table-column prop="name" label="模板名称" width="300" sortable>
						</el-table-column>
						<el-table-column prop="date" label="最近修改的时间" width="300" sortable>
						</el-table-column>
						<el-table-column label="操作" width="530" align="center" fixed="right">
							<template slot-scope="scope">
								<el-button type="success" @click="previewTemp(scope.row.name,scope.row.id)">详情 <i
										class="el-icon-view"></i></el-button>
								<el-button type="primary" @click="editTempById(scope.row.id)">编辑<i
										class="el-icon-edit-outline"></i></el-button>
								<el-button type="info" @click="fillOutTemp(scope.row.id)">填写<i class="el-icon-edit"></i>
								</el-button>
								<el-button type="warning" @click="reName(scope.row.id,scope.row.name)">重命名<i
										class="el-icon-tickets"></i></el-button>
								<el-button type="danger" @click="deleteTemp(scope.row.id)">删除 <i
										class="el-icon-remove-outline"></i></el-button>
							</template>
						</el-table-column>
					</el-table>

					<div style="position:absolute;bottom: 3px;right: 20px;height:5%;">
						<el-pagination @size-change="handleSizeChangeTemp" @current-change="handleCurrentChangeTemp"
							:page-sizes="[5, 10, 15, 20]" :page-size="$root.queryTemp.pageSize"
							:current-page="$root.queryTemp.currentPage" layout="total, sizes, prev, pager, next, jumper"
							:total="totalPage">
						</el-pagination>
					</div>
				</el-main>
			</el-container>
		</el-container>

		<el-dialog class="showForm" :visible.sync="showForm" width="70%" :title="activeId">
			<preview v-if="showForm" :tempId="tempId" :listOrigin="compList" :look="isLook" :showSub="isSub">
			</preview>
		</el-dialog>
		<el-dialog class="showRename" :visible.sync="showRename" title="重命名">
			<el-form label-width="80px">
				<el-form-item label="模板名字">
					<el-input v-model="reTempName" clearable></el-input>
				</el-form-item>
				<el-row justify="center" type="flex">
					<el-button type="primary" @click="tempRename">确定</el-button>
				</el-row>
			</el-form>
		</el-dialog>
		<el-dialog class="showReFormName" :visible.sync="showReFormName" title="重命名">
			<el-form label-width="80px">
				<el-form-item label="表单名字">
					<el-input v-model="reFormName" clearable></el-input>
				</el-form-item>
				<el-row justify="center" type="flex">
					<el-button type="primary" @click="formRename">确定</el-button>
				</el-row>
			</el-form>
		</el-dialog>
		<el-dialog class="showReDetail" :visible.sync="showReDetail" title="修改描述">
			<el-form label-width="40px">
				<el-form-item label="描述">
					<el-input type="textarea" :rows="10" v-model="reFormDetail"></el-input>
				</el-form-item>
				<el-row justify="center" type="flex">
					<el-button type="primary" @click="formReDetail">确定</el-button>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios';
	import preview from "../components/preview.vue";

	export default {
		name: 'Home',
		components: {
			preview
		},
		inject: ['reload'],
		data() {
			return {
				tableData: [],
				formName: '',
				reFormName: '',
				tempName: '',
				reTempName: '',
				msg: "hello form",
				collapseBtnClass: 'el-icon-s-fold',
				isCollapse: false,
				sideWidth: 200,
				logoTextShow: true,
				headerBg: 'headerBg',
				openIndex: this.$root.openIndex,
				totalPage: 0,
				showForm: false,
				activeId: '',
				tempId: null,
				compList: [],
				isLook: true,
				isSub: false,
				showRename: false,
				showReFormName: false,
				showReDetail: false,
				formId: '',
				reFormDetail: ''
			}
		},
		created() {
			if (this.$root.openIndex == '1-3') this.getForm()
			else this.getTemp();
		},
		methods: {
			formReDetail() {
				let loader = this.$loading({
					text: '请稍后',
					target: '.showReDetail'
				})
				this.$axios({
					url: `/FORM/reFormDetail?id=${this.formId}&detail=${this.reFormDetail}`,
					method: 'get'
				}).then(res => {
					res = res.data;
					if (res.code == 200) {
						loader.close();
						this.showReDetail = false;
						this.reload();
						this.$message.success("成功");
					} else {
						loader.close();
						this.$confirm(res.message).then();
					}
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				})
			},
			handleChangeDetail(val, id) {
				this.showReDetail = true;
				this.reFormDetail = val;
				this.formId = id;
			},
			formRename() {
				let loader = this.$loading({
					text: '请稍后',
					target: '.showReFormName'
				})
				this.$axios({
					url: `/FORM/reFormName?id=${this.formId}&name=${this.reFormName}`,
					method: 'get'
				}).then(res => {
					res = res.data;
					if (res.code == 200) {
						loader.close();
						this.showReFormName = false;
						this.reload();
						this.$message.success("成功");
					} else {
						loader.close();
						this.$confirm(res.message).then();
					}
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				})
			},
			reFromName(id, name) {
				this.showReFormName = true;
				this.formId = id;
				this.reFormName = name;
			},
			deleteTemp(id) {
				this.$confirm("删除模板会将所有相关的表单数据一并删除，你确定吗").then(() => {
					let loader = this.$loading({
						text: "请稍后",
						target: ".showForm"
					});
					this.$axios({
						url: `/FORM/deleteTempById?id=${id}`,
						method: 'get'
					}).then(res => {
						loader.close();
						this.$message.success({
							message: '删除成功',
							duration: 1000
						});
						this.reload();
					}).catch(err => {
						loader.close();
						this.$confirm(err.toString()).then();
					});
				});
			},
			deleteForm(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let loader = this.$loading({
						text: '请稍后',
						target: '.showForm'
					});
					this.$axios({
						url: `/FORM/deleteFormById?id=${id}`,
						method: 'get'
					}).then(res => {
						res = res.data;
						loader.close();
						if (res.code == 200) {
							this.reload();
							this.$message.success({
								message: "成功",
								duration: 1000
							});
						} else this.$confirm(res.message).then();
					}).catch(err => {
						loader.close();
						this.$confirm(err.toString()).then();
					})
				})
			},
			editForm(id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `/FORM/getFormById?id=${id}`,
					method: 'get'
				}).then(res => {
					loader.close();
					this.$router.push({
						name: 'fillOutPage',
						params: {
							list: res.data,
							form_id: id
						}
					});
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				});
			},
			previewForm(id, name) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `/FORM/getFormById?id=${id}`,
					method: 'get'
				}).then(res => {
					this.compList = res.data;
					this.activeId = name;
					this.showForm = true;
					this.tempId = null;
					this.isLook = true;
					this.isSub = false;
					loader.close();
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				});
			},
			fillOutTemp(id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `/FORM/getTempById?id=${id}`,
					method: 'get'
				}).then(res => {
					loader.close();
					this.$router.push({
						name: 'fillOutPage',
						params: {
							list: res.data,
							temp_id: id
						}
					});
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				});
			},
			tempRename() {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showRename"
				});
				this.$axios({
					url: `/FORM/updateTempName?id=${this.tempId}&name=${this.reTempName}`,
					method: "get"
				}).then(res => {
					res = res.data;
					if (res.code == 200) {
						loader.close();
						this.showRename = false;
						this.reload();
						this.$message.success("成功");
					} else {
						loader.close();
						this.$confirm(res.message).then();
					}
				}).catch(err => {
					laoder.close();
					this.$confirm(err.toString()).then();
				})
			},
			reName(id, name) {
				this.showRename = true;
				this.tempId = id;
				this.reTempName = name;
			},
			editTempById(id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `/FORM/getTempById?id=${id}`,
					method: 'get'
				}).then(res => {
					loader.close();
					this.$router.push({
						name: "edit",
						params: {
							dataList: res.data,
							tempId: id
						}
					});
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				});
			},
			previewTemp(name, id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `/FORM/getTempById?id=${id}`,
					method: 'get'
				}).then(res => {
					this.compList = res.data;
					this.activeId = name;
					this.showForm = true;
					this.isLook = true;
					this.isSub = false;
					this.tempId = id;
					loader.close();
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				});
			},
			getTemp() {
				let loader = this.$loading({
					text: '请稍后',
					target: 'mainDiv'
				})
				axios.get("/FORM/getTempByName", {
					params: {
						current: this.$root.queryTemp.currentPage,
						limit: this.$root.queryTemp.pageSize,
						name: this.tempName
					}
				}).then((res) => {
					loader.close();
					this.tableData = res.data.data.rows
					this.totalPage = res.data.data.total
				}).catch(err => {
					loader.close();
					this.tableData = [];
					this.$confirm(err.toString()).then()
				})
			},
			newForm() {
				this.$router.push({
					name: "edit",
					params: {
						createNewForm: true
					}
				})
			},
			newTemp() {
				this.$router.push("/edit");
			},
			collapse() { // 点击收缩按钮触发
				this.isCollapse = !this.isCollapse
				if (this.isCollapse) { // 收缩
					this.sideWidth = 64
					this.collapseBtnClass = 'el-icon-s-unfold'
					this.logoTextShow = false
				} else { // 展开
					this.sideWidth = 200
					this.collapseBtnClass = 'el-icon-s-fold'
					this.logoTextShow = true
				}
			},
			getForm() {
				let loader = this.$loading({
					text: '请稍后',
					target: ".mainDiv"
				})
				axios.get("/form/getFormByName", {
					params: {
						current: this.$root.query.currentPage,
						limit: this.$root.query.pageSize,
						name: this.formName
					}
				}).then((res) => {
					this.tableData = res.data.data.rows
					this.totalPage = res.data.data.total
					loader.close();
				}).catch(err => {
					loader.close();
					this.tableData = [];
					this.$confirm(err.toString()).then();
				})
			},
			handleSizeChange(val) {
				this.$root.query.pageSize = val
				this.getForm()
			},
			handleCurrentChange(val) {
				this.$root.query.currentPage = val
				this.getForm()
			},
			handleSizeChangeTemp(val) {
				this.$root.queryTemp.pageSize = val
				this.getTemp()
			},
			handleCurrentChangeTemp(val) {
				this.$root.queryTemp.currentPage = val
				this.getTemp()
			}
		},
		watch: {
			openIndex(newValue, oldValue) {
				if (newValue == "1-3") {
					this.$root.query.currentPage = 1;
					this.$root.openIndex = "1-3";
					this.getForm();
				} else {
					this.$root.queryTemp.currentPage = 1;
					this.$root.openIndex = "1-4";
					this.getTemp();
				}
			}
		}
	}
</script>

<style>
	.headerBg {
		background: #eee !important;
	}
	.el-table__fixed-right-patch{
		background-color: #eeeeee !important;
	}
</style>
