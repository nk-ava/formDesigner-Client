<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label="显示标签">
			<el-switch v-model="itemConf.showLabel"></el-switch>
		</el-form-item>
		<el-form-item label="必填">
			<el-switch v-model="itemConf.required"></el-switch>
		</el-form-item>
		<el-form-item label="禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="尺寸">
			<el-radio-group v-model="itemConf.size">
				<el-radio-button label="medium">中</el-radio-button>
				<el-radio-button label="small">小</el-radio-button>
				<el-radio-button label="mini">迷你</el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="是否透明">
			<el-switch v-model="itemConf['show-alpha']"></el-switch>
		</el-form-item>
		<el-form-item label="预定义颜色">
			<div style="overflow: hidden;margin-top:3px;margin-bottom:3px;" v-for="(item,index) in itemConf.predefine" :key="item">
				<div class="preview_color" :style="{'background-color':item}"></div>
				<div style="float: left;margin-left:10px;" class="colorPre">
					<i class="el-icon-remove-outline" @click="handlerRemoveColor(index)" />
				</div>
			</div>
			<el-color-picker v-model="color" @change="handlerAddPreColor"></el-color-picker>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'colorpickerConf',
		data() {
			return {
				color: "#55aaff"
			}
		},
		props: {
			itemConf: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			handlerRemoveColor(index) {
				this.itemConf.predefine.splice(index, 1);
			},
			handlerAddPreColor() {
				this.itemConf.predefine.push(this.color);
			}
		}
	}
</script>

<style>
	.preview_color{
		height:30px;
		width: 70%;
		float: left;
	}
	.colorPre i{
		font-size:20px;
	}
</style>
