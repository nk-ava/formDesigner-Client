<template>
	<div class="editPage">
		<div class="left-div">
			<!-- 顶部菜单栏 -->
			<div class="action-bar">
				<el-button icon="el-icon-s-home" type="text" class="home" @click="goBack">返回</el-button>
				<el-button icon="el-icon-view" type="text" @click="preview">
					预览
				</el-button>
				<el-button v-if="!createNewForm" icon="el-icon-folder" type="text" @click="save">
					保存
				</el-button>
				<el-button v-if="createNewForm" icon="el-icon-folder" type="text" @click="newForm">
					保存
				</el-button>
				<el-button class="delete-btn" icon="el-icon-delete-solid" type="text" @click="removeAll">
					清空
				</el-button>
			</div>
			<!-- 组件面板 -->
			<item-panel v-model="activeItem"></item-panel>
			<!-- 空状态信息 -->
			<el-empty v-show="showEmpty" description="从左侧拖曳添加控件" class="empty-info"></el-empty>
			<!-- 中间生成面板 -->
			<el-scrollbar class="center-scrollbar">
				<el-row class="center-board-row">
					<el-form label-width="80px">
						<draggable :list="list" animation="100" group="genComponents" class="item-receiver">
							<div v-for="element in list">
								<item-present :model="element" :activeItem="activeItem" @copyItem="copyItem"
									@activeItemChange="clickItem" @deleteItem="deleteItem" />
							</div>
						</draggable>
					</el-form>
				</el-row>
			</el-scrollbar>
		</div>
		<config-panel v-show="showConfig" :activeItem="activeItem"></config-panel>
		<el-dialog :visible.sync="showPreview" width="70%">
			<preview v-if="showPreview" :listOrigin="list"></preview>
		</el-dialog>
		<el-dialog :visible.sync="showSave" title="保存模板">
			<el-form class="loadingDiv">
				<el-form-item label="模板名" label-width="60px">
					<el-input v-model="tempName" :clearable="true"></el-input>
				</el-form-item>
				<el-row type="flex" justify="center">
					<el-button type="primary" @click="saveTemp">确定</el-button>
				</el-row>
			</el-form>
		</el-dialog>
		<el-dialog :visible.sync="showNewForm" title="新建表单">
			<el-form class="loadingDiv" label-width="80px">
				<el-form-item label="模板名称">
					<el-input v-model="tempName" :clearable="true"></el-input>
				</el-form-item>
				<el-form-item label="表单名称">
					<el-input v-model="formName"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input type="textarea" v-model="detail" :rows="5"></el-input>
				</el-form-item>
				<el-row type="flex" justify="center">
					<el-button type="primary" @click="saveForm">确定</el-button>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import itemPresent from '../components/itemPresent.vue';
	import draggable from "vuedraggable";
	import configPanel from "../components/configPanel.vue";
	import itemPanel from "../components/itemPanel.vue";
	import preview from "../components/preview.vue";

	export default {
		name: "editFormPage",
		components: {
			itemPresent,
			draggable,
			configPanel,
			itemPanel,
			preview
		},
		data() {
			return {
				list: this.dataList,
				activeItem: {},
				showPreview: false,
				showSave: false,
				tempName: "",
				formName: "",
				showNewForm: false,
				detail: ""
			}
		},
		computed: {
			showEmpty() {
				return this.list.length === 0;
			},
			showConfig() {
				return this.activeItem.id !== undefined;
			}
		},
		props: {
			dataList: {
				type: Array,
				default: () => ([]),
				required: false
			},
			tempId: {
				type: String,
				default: null,
				required: false
			},
			createNewForm: {
				type: Boolean,
				default: false,
				required: false
			}
		},
		methods: {
			saveForm() {
				let loader = this.$loading({
					text: '正在保存',
					target: '.loadingDiv'
				})
				this.$axios({
					url: '/FORM/saveForm',
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'post',
					data: {
						tempName: this.tempName,
						subTime: (new Date).getTime(),
						list: this.list,
						formName: this.formName,
						detail: this.detail
					}
				}).then(res => {
					loader.close();
					this.showNewForm = false;
					this.$message.success({
						message: '保存成功',
						duration: 1000
					})
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				})
			},
			newForm() {
				this.tempName = "temp_" + (new Date).getTime();
				this.showNewForm = true
			},
			save() {
				if (this.tempId == null) {
					this.tempName = "temp_" + (new Date).getTime();
					this.showSave = true;
				} else this.saveTemp();
			},
			removeAll() {
				this.$confirm('此操作将清空整个表单,是否继续?').then(() => {
					this.list = [];
				})
			},
			copyItem(origin) {
				let cloneEle = JSON.parse(JSON.stringify(origin));
				cloneEle.id = "fm_" + (new Date()).getTime();
				this.list.push(cloneEle);
			},
			deleteItem(origin) {
				let index = this.list.indexOf(origin);
				this.list.splice(index, 1);
			},
			clickItem(obj) {
				this.activeItem = obj;
			},
			preview() {
				this.showPreview = true;
			},
			goBack() {
				this.$router.back();
			},
			saveTemp() {
				let loader = this.$loading({
					text: "正在保存",
					target: ".loadingDiv"
				});
				if (this.tempId == null) {
					this.$axios({
						url: '/FORM/saveTemp',
						headers: {
							'Content-Type': "application/json"
						},
						method: 'post',
						data: {
							name: this.tempName,
							saveTime: (new Date).getTime(),
							list: this.list
						}
					}).then(res => {
						loader.close();
						res = res.data;
						if (res.code == 200) {
							this.showSave = false;
							this.$message.success({
								message: "成功",
								duration: 1000
							});
						} else this.$confirm(res.message).then();
					}).catch(err => {
						loader.close();
						this.$confirm(err.toString()).then();
					})
				} else {
					this.$axios({
						url: '/FORM/updateTempById',
						headers: {
							'Content-Type': "application/json"
						},
						method: 'post',
						data: {
							tempId: this.tempId,
							saveTime: (new Date).getTime(),
							list: this.list
						}
					}).then(res => {
						loader.close();
						res = res.data;
						if (res.code == 200) {
							this.$message.success({
								message: "成功",
								duration: 1000
							});
						} else this.$confirm(res.message).then();
					}).catch(err => {
						loader.close();
						this.$confirm(err.toString()).then();
					})
				}
			}
		}
	}
</script>
<style>
	@import '../components/style/designer.css';
</style>
