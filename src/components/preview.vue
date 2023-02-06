<template>
	<el-form class="preview_sub">
		<template v-for="model in list">
			<el-form-item :label="model.showLabel?model.title:''" :required="model.required" style="margin-bottom:5px;"
				:label-width="model.showLabel?'80px':'10px'" class="form-item">
				<render v-if="!look" :confs="model" @input="changeValue(model,$event)" />
				<render v-if="look" :confs="model" />
			</el-form-item>
		</template>
		<el-row type="flex" justify="center" v-if="showSub">
			<el-button v-if="save" type="primary" @click="submitForm">提交</el-button>
			<el-button v-if="!save" type="primary" @click="updateForm">提交</el-button>
		</el-row>
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
				list: JSON.parse(JSON.stringify(this.listOrigin))
			}
		},
		props: {
			listOrigin: {
				type: Array,
				default: []
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
					list: this.list
				};
				if (this.tempId != null) data.tempId = this.tempId;
				this.$axios({
					url: `/example/saveForm`,
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
					url: `/example/updateFormById`,
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
