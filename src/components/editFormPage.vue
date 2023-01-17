<template>
	<div class="editPage">
		<div class="left-div">
			<!-- 顶部菜单栏 -->
			<div class="action-bar">
				<img src="../assets/logo.png" class="logo" />
				<i class="el-icon-plus"></i>
				<img src="../assets/element.png" class="ele-logo" />
				<el-button icon="el-icon-view" type="text" @click="preview">
					预览
				</el-button>
				<el-button icon="el-icon-folder" type=text @click="save">
					保存
				</el-button>
				<el-button class="delete-btn" icon="el-icon-delete-solid" type=text @click="removeAll">
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
	</div>
</template>

<script>
	import itemPresent from './itemPresent.vue';
	import draggable from "vuedraggable";
	import configPanel from "./configPanel.vue";
	import itemPanel from "./itemPanel.vue";
	import preview from "./preview.vue";

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
				tempName: ""
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
			}
		},
		methods: {
			save() {
				this.tempName = "temp_" + (new Date).getTime();
				this.showSave = true;
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
			saveTemp() {
				let loader = this.$loading({
					text: "正在保存",
					target: ".loadingDiv"
				});
				this.$axios({
					url: "http://127.0.0.1:8848/example/saveTemp",
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
			}
		}
	}
</script>
<style>
	@import './style/designer.css';
</style>