<template>
	<div class="nav">
		<ul style="margin-left: 0px;padding-left: 0px;">
			<template v-for="(tempModel,index) in formList">
				<li class="nav-list" style="position: relative;">
					<h2 @click="setClickAnima(index)">{{tempModel.name}}({{tempModel.formList.length}}条表单)
						<i class="sjx"></i>
						<div class="time">-{{tempModel['update_time']}}</div>
					</h2>
					<el-dropdown trigger="click" class="caidan">
						<span class="el-dropdown-link">
							<icon code="select"></icon>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item icon="el-icon-view"
								@click.native="previewTemp(tempModel.name,tempModel.id)">
								查看</el-dropdown-item>
							<el-dropdown-item icon="el-icon-edit" @click.native="fillOutTemp(tempModel.id)">填写
							</el-dropdown-item>
							<el-dropdown-item icon="el-icon-edit-outline" @click.native="editTempById(tempModel.id)">编辑
							</el-dropdown-item>
							<el-dropdown-item icon="el-icon-tickets"
								@click.native="reName(tempModel.id,tempModel.name)">重命名
							</el-dropdown-item>
							<el-dropdown-item icon="el-icon-delete-solid" @click.native="deleteTemp(tempModel.id)">
								删除
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<div class="hide">
						<div class="container" v-for="(form,jndex) in tempModel.formList">
							<h5 @click="previewForm(form.id)">
								{{form.id}}
								<div class="time">-{{form['submit_time']}}</div>
							</h5>
							<el-dropdown trigger="click" class="caidan" style="top: 3px;">
								<span class="el-dropdown-link">
									<icon code="select"></icon>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item icon="el-icon-view" @click.native="previewForm(form.id)">查看
									</el-dropdown-item>
									<el-dropdown-item icon="el-icon-edit-outline" @click.native="editForm(form.id)">
										编辑
									</el-dropdown-item>
									<el-dropdown-item icon="el-icon-delete-solid" @click.native="deleteForm(form.id)">删除
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
						<div class="container" v-if="tempModel.formList.length==0">
							<h5>无数据</h5>
						</div>
					</div>
				</li>
			</template>
		</ul>
		<el-dialog class="showForm" :visible.sync="showForm" width="70%" :title="activeId">
			<preview v-if="showForm" :tempId="tempId" :listOrigin="compList" :look="isLook" :showSub="isSub">
			</preview>
		</el-dialog>
		<el-dialog class="showRename" :visible.sync="showRename" title="重命名">
			<el-form label-width="80px">
				<el-form-item label="模板名字">
					<el-input v-model="tempName" clearable></el-input>
				</el-form-item>
				<el-row justify="center" type="flex">
					<el-button type="primary" @click="tempRename">确定</el-button>
				</el-row>
			</el-form>
		</el-dialog>
		<el-empty v-show="isEmpty" description="没有任何数据"></el-empty>
	</div>
</template>

<script>
	import icon from "./icon.vue";
	import preview from "./preview.vue";
	
	export default {
		inject: ['reload'],
		name: 'tempList',
		data() {
			return {
				lastClick: -1,
				compList: [],
				showForm: false,
				activeId: "",
				isLook: true,
				isSub: false,
				tempId: null,
				showRename: false,
				tempName: '',
			}
		},
		components:{
			icon,
			preview
		},
		props: {
			formList: {
				type: Array,
				default: () => ([])
			}
		},
		computed: {
			aList() {
				return document.querySelectorAll(".nav-list h2");
			},
			aHide() {
				return document.querySelectorAll(".hide");
			},
			aIcon() {
				return document.querySelectorAll(".nav-list i.sjx")
			},
			isEmpty() {
				if (this.formList.length == 0) return true;
				return false;
			}
		},
		methods: {
			setClickAnima(index) {
				if (this.lastClick >= 0 && this.lastClick != index) this.aList[this.lastClick].className = "";
				this.aList[index].className = "on";
				if (this.aHide[index].style.height == "" || this.aHide[index].style.height == "0px") {
					if (this.lastClick >= 0) this.aHide[this.lastClick].style.height = "0px";
					this.aHide[index].style.height = "auto";
					if (this.lastClick >= 0) this.aIcon[this.lastClick].className = "";
					this.aIcon[index].className = "on";
				} else {
					this.aHide[index].style.height = "0px";
					this.aIcon[index].className = "";
				}
				this.lastClick = index;
			},
			editForm(id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `${this.host}/example/getFormById?id=${id}`,
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
			deleteForm(id) {
				let loader = this.$loading({
					text: '请稍后',
					target: '.showForm'
				});
				this.$axios({
					url: `${this.host}/example/deleteFormById?id=${id}`,
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
			},
			reName(id, name) {
				this.showRename = true;
				this.tempId = id;
				this.tempName = name;
			},
			previewTemp(name, id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `${this.host}/example/getTempById?id=${id}`,
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
			previewForm(id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `${this.host}/example/getFormById?id=${id}`,
					method: 'get'
				}).then(res => {
					this.compList = res.data;
					this.activeId = id;
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
			deleteTemp(id) {
				this.$confirm("删除模板会将所有相关的表单数据一并删除，你确定吗").then(() => {
					let loader = this.$loading({
						text: "请稍后",
						target: ".showForm"
					});
					this.$axios({
						url: `${this.host}/example/deleteTempById?id=${id}`,
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
			editTempById(id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `${this.host}/example/getTempById?id=${id}`,
					method: 'get'
				}).then(res => {
					loader.close();
					this.$router.push({
						name: "formDesigner",
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
			fillOutTemp(id) {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `${this.host}/example/getTempById?id=${id}`,
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
					url: `${this.host}/example/updateTempName?id=${this.tempId}&name=${this.tempName}`,
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
			}
		}
	}
</script>

<style>
	.nav {
		width: 100%;
	}
	
	.nav-list h2 {
		position: relative;
		margin: 5px 10px 0 10px;
		padding: 13px 15px;
		background-color: #e6f2ff;
		font-size: 15px;
		border-radius: 5px;
		border-bottom: 1px solid #42495d;
	}
	
	.nav-list h2:hover {
		background-color: #e4e7ed;
		color: #000000;
	}
	
	.nav-list h2.on {
		background-color: #e4e7ed;
		color: #000000;
	}
	
	.nav-list i {
		position: absolute;
		right: 60px;
		top: 15px;
		border: 8px solid transparent;
		border-left-color: #000;
		transform-origin: 1px 7px;
		transition: 0.4s;
	}
	
	.nav-list i.on {
		border-left-color: #000000;
		transform: rotate(90deg);
	}
	
	.hide {
		position: relative;
		height: 0px;
		overflow: hidden;
		transition: 1s;
		margin-left: 30px;
	}
	
	.hide h5 {
		position: relative;
		margin: 0 10px 0 0;
		padding: 8px 10px;
		background-color: #e4e7ed;
		border-radius: 5px;
		border-bottom: 1px solid #42495d;
	}
	
	.hide h5:hover {
		background-color: #ffffff;
		color: #000000;
		border-top: 1px solid #42495d;
	}
	
	.hide h5.on {
		background-color: #ffffff;
		color: #000000;
	}
	
	.time {
		position: absolute;
		bottom: 5px;
		right: 100px;
		font-size: 10px;
	}
	
	.caidan {
		position: absolute;
		right: 40px;
		top: 8px;
	}
</style>
