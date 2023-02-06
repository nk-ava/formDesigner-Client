<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="html文本">
			<el-input v-model="itemConf.text" type="textarea" :rows="15"></el-input>
		</el-form-item>
		<el-form-item label="布局">
			<el-radio-group v-model="itemConf.align">
				<el-radio-button label="left">左</el-radio-button>
				<el-radio-button label="center">中</el-radio-button>
				<el-radio-button label="right">右</el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="颜色">
			<el-color-picker v-model="itemConf.color"></el-color-picker>
		</el-form-item>
		<el-form-item label="尺寸">
			<el-input-number v-model="itemConf.size" :min="10" :max="50"></el-input-number>
		</el-form-item>
		<el-form-item label="加粗">
			<el-input-number v-model="itemConf.bold" :step="100" :min="100" :max="800"></el-input-number>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		name: 'textConf',
		props: {
			itemConf: {
				type: Object,
				default: () => ({})
			}
		}
	}
</script>
