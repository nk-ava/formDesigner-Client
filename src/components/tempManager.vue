<template>
	<div class="nav">
		<ul style="margin-left: 0px;padding-left: 0px;">
			<template v-for="(tempModel,index) in formList">
				<li class="nav-list" style="position: relative;">
					<h2 @click="setClickAnima(index)">{{tempModel.name}}({{tempModel.formList.length}}条表单)
						<i></i>
						<div class="time">-{{tempModel['update_time']}}</div>
					</h2>
					<el-dropdown trigger="click" class="caidan">
						<span class="el-dropdown-link">
							<icon code="select"></icon>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item icon="el-icon-view" @click.native="previewTemp">查看</el-dropdown-item>
							<el-dropdown-item icon="el-icon-edit-outline">编辑</el-dropdown-item>
							<el-dropdown-item icon="el-icon-edit">填写</el-dropdown-item>
							<el-dropdown-item icon="el-icon-delete-solid" @click.native="deleteTemp(tempModel.id)">删除
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<div class="hide">
						<h5 v-for="(form,jndex) in tempModel.formList" @click="previewForm(form.id)">
							{{form.id}}
							<div class="time">-{{form['submit_time']}}</div>
						</h5>
						<h5 v-if="tempModel.formList.length==0">无数据</h5>
					</div>
				</li>
			</template>
		</ul>
		<el-dialog class="showForm" :visible.sync="showForm" width="70%" :title="activeId">
			<preview v-if="showForm" :tempId="tempId" :listOrigin="compList" :look="isLook" :showSub="isSub"></preview>
		</el-dialog>
	</div>
</template>

<script>
	import icon from "./icon.vue";
	import preview from "./preview.vue";

	export default {
		inject:['reload'],
		name: 'tempManager',
		components: {
			icon,
			preview
		},
		data() {
			return {
				formList: [],
				lastClick: -1,
				compList: [],
				showForm: false,
				activeId: "",
				isLook: true,
				isSub: false,
				tempId: null
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
				return document.querySelectorAll(".nav-list i")
			}
		},
		mounted() {
			this.getFormList();
		},
		methods: {
			getFormList() {
				let loader = this.$loading({
					text: "请稍后",
					target: ".nav"
				});
				this.$axios({
					url: "http://127.0.0.1:8848/example/getAllForm",
					method: 'get'
				}).then(res => {
					this.formList = res.data;
					loader.close();
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				});
			},
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
			previewTemp() {
				let loader = this.$loading({
					text: "请稍后",
					target: ".showForm"
				});
				this.$axios({
					url: `http://127.0.0.1:8848/example/getTempById?id=${id}`,
					method: 'get'
				}).then(res => {
					this.compList = res.data;
					loader.close();
					this.activeId = id;
					this.showForm = true;
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
					url: `http://127.0.0.1:8848/example/getFormById?id=${id}`,
					method: 'get'
				}).then(res => {
					this.compList = res.data;
					loader.close();
					this.activeId = id;
					this.showForm = true;
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
						url: `http://127.0.0.1:8848/example/deleteTempById?id=${id}`,
						method: 'get'
					}).then(res => {
						loader.close();
						this.$message.success({message:'删除成功',duration:1000});
						this.reload();
					}).catch(err => {
						loader.close();
						this.$confirm(err.toString()).then();
					});
				});
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
