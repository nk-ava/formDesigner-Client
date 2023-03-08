<template>
	<el-upload action="http://81.68.210.170:8081/FORM/upload" :on-success="handleSuccess" :file-list="fileList" :on-preview="handlePreview"
		:on-error="handleError" :on-remove="handleRemove" :disabled="disabled" :limit="limit" :on-exceed="handleExceed"
		:list-type="listStyle" :accept="acceptType">
		<el-button icon="el-icon-upload" size="small" type="primary">点击上传</el-button>
		<div slot="tip" class="el-upload__tip">{{tips}}</div>
	</el-upload>
</template>

<script>
	export default {
		name: 'myUpload',
		data() {
			return {
				fileList: this.value
			}
		},
		mounted() {
			let lts = this.$parent.$listeners;
			if (!Object.keys(lts).includes("input")) this.disabled = true;
		},
		props: {
			value: {
				type: Array,
				default: () => ([])
			},
			disabled: {
				type: Boolean,
				default: false
			},
			limit: {
				type: Number,
				default: null
			},
			tips: {
				type: String,
				default: ""
			},
			listStyle: {
				type: String,
				default: "text"
			},
			acceptType: {
				type: String,
				default: '.*'
			},
			showTips: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleExceed() {
				this.$message.error({
					message: '文件数量超出限制',
					duration: 1000
				})
			},
			handleSuccess(res, file, fileList) {
				this.fileList.push({
					name: file.name,
					url: res.message,
					uid: file.uid
				});
			},
			handlePreview(file) {
				window.open(file.url, "_blank")
			},
			handleError(err, file, fileList) {
				this.$confirm("上传失败，请稍后重试").then();
			},
			handleRemove(file, fileList) {
				let index;
				try {
					this.fileList.forEach((ele, i) => {
						if (ele.uid == file.uid) {
							index = i;
							throw new Error("End Loop");
						}
					})
				} catch (err) {
					if (err.message != "End Loop") throw err;
				}
				this.fileList.splice(index, 1);
			}
		},
		watch: {
			fileList(newValue, oldValue) {
				let ans = [];
				newValue.forEach(ele => {
					ans.push({
						name: ele.name,
						url: ele.url,
						uid: ele.uid
					})
				})
				this.$emit('input', ans);
			}
		},
	}
</script>

<style>
</style>
