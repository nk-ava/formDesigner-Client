<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label="宽度">
			<el-input :value="itemConf.width.replace('px','')" @input="inputWidth" type="number" size="small">
				<template slot="append">px</template>
			</el-input>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="对齐方式">
			<el-radio-group v-model="itemConf.compAlign">
				<el-radio-button label="start">左对齐</el-radio-button>
				<el-radio-button label="center">居中</el-radio-button>
				<el-radio-button label="end">右对齐</el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="打开时文本">
			<el-input v-model="itemConf['active-text']"></el-input>
		</el-form-item>
		<el-form-item label="关闭时文本">
			<el-input v-model="itemConf['inactive-text']"></el-input>
		</el-form-item>
		<el-form-item label="打开时颜色">
			<el-color-picker v-model="itemConf['active-color']"></el-color-picker>
		</el-form-item>
		<el-form-item label="关闭时颜色">
			<el-color-picker v-model="itemConf['inactive-color']"></el-color-picker>
		</el-form-item>
		<el-form-item label="是否显示标签">
			<el-switch v-model="itemConf.showLabel"></el-switch>
		</el-form-item>
		<el-form-item label="是否必填">
			<el-switch v-model="itemConf.required"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "switchConf",
		props: {
			itemConf: {
				type: Object,
				default: {}
			}
		},
		methods: {
			inputWidth(val) {
				this.itemConf.width = val + "px";
			}
		}
	}
</script>

<style>
</style>
