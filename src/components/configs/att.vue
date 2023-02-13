<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="最大上传数">
			<el-input-number v-model="itemConf.limit" :min="1"></el-input-number>
		</el-form-item>
		<el-form-item label="显示提示">
			<el-switch v-model="itemConf.showTips"></el-switch>
		</el-form-item>
		<el-form-item label="提示" v-show="itemConf.showTips">
			<el-input v-model="itemConf.tips"></el-input>
		</el-form-item>
		<el-form-item label="格式" label-width="70px">
			<el-radio-group v-model="itemConf.listStyle">
				<el-radio-button label="text"></el-radio-button>
				<el-radio-button label="picture"></el-radio-button>
				<el-radio-button label="picture-card"></el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="上传限制">
			<el-select v-model="itemConf.acceptType">
				<el-option label="全部" value=""></el-option>
				<el-option label="图片"
					value=".xbm,.tif,.pjp,.svgz,.jpg,.jpeg,.ico,.tiff,.gif,.svg,.jfif,.webp,.png,.bmp,.pjpeg,.avif">
				</el-option>
				<el-option label="视频" value=".ogm,.wmv,.mpg,.webm,.ogv,.mov,.asx,.mpeg,.mp4,.m4v,.avi"></el-option>
				<el-option label="音频"
					value=".opus,.flac,.webm,.weba,.wav,.ogg,.m4a,.mp3,.oga,.mid,.amr,.aiff,.wma,.au,.acc"></el-option>
				<el-option label="txt" value=".txt"></el-option>
				<el-option label="pdf" value=".pdf"></el-option>
				<el-option label="word" value=".dot,.doc,.docx"></el-option>
				<el-option label="excel" value=".xls,.xlsx"></el-option>
			</el-select>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'uploadConf',
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
