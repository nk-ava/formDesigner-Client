<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label="尺寸">
			<el-select v-model="itemConf.size">
				<el-option label="大" value="large"></el-option>
				<el-option label="小" value="small"></el-option>
				<el-option label="迷你" value="mini"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="类型">
			<el-select v-model="itemConf.type">
				<el-option label="年" value="year"></el-option>
				<el-option label="日期" value="date"></el-option>
				<el-option label="月" value="months"></el-option>
				<el-option label="周" value="week"></el-option>
				<el-option label="日期时间" value="datetime"></el-option>
				<el-option label="日期时间范围" value="datetimerange"></el-option>
				<el-option label="日期范围" value="daterange"></el-option>
				<el-option label="月份范围" value="monthrange"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="显示标签">
			<el-switch v-model="itemConf.showLabel"></el-switch>
		</el-form-item>
		<el-form-item label="是否只读">
			<el-switch v-model="itemConf.readonly"></el-switch>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="文本可编辑">
			<el-switch v-model="itemConf.editable"></el-switch>
		</el-form-item>
		<el-form-item label="可清除">
			<el-switch v-model="itemConf.clearable"></el-switch>
		</el-form-item>
		<el-form-item label="必填">
			<el-switch v-model="itemConf.required"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'dateConf',
		props: {
			itemConf: {
				type: Object,
				default: () => ({})
			}
		}
	}
</script>

<style>
</style>
