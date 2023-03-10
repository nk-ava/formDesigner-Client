<template>
	<el-form class="preview_sub">
		<template v-for="model in list">
			<el-row :type="model.compAlign==undefined?'':'flex'" :justify="model.compAlign||''">
				<el-form-item :label="model.showLabel?model.title:''" :required="model.required"
					style="margin-bottom:5px;" :label-width="model.showLabel?'80px':'10px'" class="form-item">
					<render v-if="!look" :confs="model" @input="changeValue(model,$event)" />
					<render v-if="look" :confs="model" />
				</el-form-item>
			</el-row>
		</template>
		<el-divider v-if="showSub"></el-divider>
		<el-row type="flex" justify="center" v-if="showSub">
			<el-button v-if="save" type="primary" @click="showSave">提交</el-button>
			<el-button v-if="!save" type="primary" @click="updateForm">提交</el-button>
		</el-row>
		<el-dialog :visible.sync="showSaveInfo" title="保存表单">
			<el-form label-width="80px">
				<el-form-item label="表单名称">
					<el-input v-model="formName"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input type="textarea" v-model="detail" :rows="5"></el-input>
				</el-form-item>
				<el-row type="flex" justify="center">
					<el-button type="primary" @click="submitForm">提交</el-button>
				</el-row>
			</el-form>
		</el-dialog>
	</el-form>
</template>

<script>
	import render from "./render.vue";
	export default {
		name: "preview",
		components: {
			render
		},
		data() {
			return {
				list: JSON.parse(JSON.stringify(this.listOrigin)),
				formName: '',
				detail: '',
				showSaveInfo: false
			}
		},
		props: {
			listOrigin: {
				type: Array,
				default: ()=>([])
			},
			tempId: {
				default: null,
				required: false
			},
			showSub: {
				type: Boolean,
				default: false
			},
			look: {
				type: Boolean,
				default: false
			},
			formId: {
				type: String,
				default: null
			},
			save: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			checkList() {
				for (let ele of this.list) {
					if (ele.required && ((ele.value&&ele.value.toString()=="") || !ele.value)) {
						this.$message.error({
							message: `${ele.title}为必填字段`,
							duration: 1000
						})
						return false;
					}
				}
				return true;
			},
			showSave() {
				if (!this.checkList()) return;
				this.showSaveInfo = true;
			},
			changeValue(origin, val) {
				this.$set(origin, 'value', val)
			},
			submitForm() {
				let loader = this.$loading({
					text: "正在保存",
					target: ".preview_sub"
				});
				let data = {
					subTime: (new Date).getTime(),
					list: this.list,
					formName: this.formName,
					detail: this.detail
				};
				if (this.tempId != null) data.tempId = this.tempId;
				this.$axios({
					url: `/FORM/saveForm`,
					method: "post",
					headers: {
						'Content-Type': "application/json"
					},
					data: data
				}).then(res => {
					loader.close();
					res = res.data;
					if (res.code == 200) {
						this.$emit("success");
						this.$message.success({
							message: "保存成功",
							duration: 1000
						});
					} else this.$confirm(res.message).then();
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				})
			},
			updateForm() {
				if (!this.checkList()) return;
				let loader = this.$loading({
					text: '正在保存',
					target: '.preview_sub'
				});
				let data = {
					formId: this.formId,
					subTime: (new Date).getTime(),
					list: this.list
				}
				this.$axios({
					url: `/FORM/updateFormById`,
					method: 'post',
					headers: {
						'Content-Type': 'application/json'
					},
					data: data
				}).then(res => {
					loader.close();
					res = res.data;
					if (res.code == 200) {
						this.$emit("success");
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
</style>
