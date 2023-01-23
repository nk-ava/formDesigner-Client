<template>
	<div style="position: relative;" :class="{'quill-container':redBorder}">
		<quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)" @change="onEditorChange($event)">
		</quill-editor>
		<div :class="{'text-number':redBorder}" style="position: absolute;bottom: 0px;right: 10px;font-size: 13px;">
			{{currentLength}}/{{defaultMaxLength}}
		</div>
	</div>
</template>

<script>
	import {
		quillEditor
	} from "vue-quill-editor";
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";

	export default {
		name: 'fancyEditor',
		components: {
			quillEditor
		},
		data() {
			return {
				content: this.value,
				lastContent: '',
				currentLength: 0,
				editorOption: {
					placeholder: '请输入....',
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
							['blockquote', 'code-block'], //引用，代码块
							[{
								'header': 1
							}, {
								'header': 2
							}], // 标题，键值对的形式；1、2表示字体大小
							[{
								'list': 'ordered'
							}, {
								'list': 'bullet'
							}], //列表
							[{
								'script': 'sub'
							}, {
								'script': 'super'
							}], // 上下标
							[{
								'indent': '-1'
							}, {
								'indent': '+1'
							}], // 缩进
							[{
								'direction': 'rtl'
							}], // 文本方向
							[{
								'size': ['small', false, 'large', 'huge']
							}], // 字体大小
							[{
								'header': [1, 2, 3, 4, 5, 6, false]
							}], //几级标题
							[{
								'color': []
							}, {
								'background': []
							}], // 字体颜色，字体背景颜色
							[{
								'font': []
							}], //字体
							[{
								'align': []
							}], //对齐方式
							['clean'], //清除字体样式
							['link', 'image', 'video'] //上传图片、上传视频
						]
					},
					theme: 'snow',
				},
				maxSaveContent: 4294967280
			}
		},
		mounted() {
			let lts = this.$parent.$listeners;
			if(!Object.keys(lts).includes("input")) this.$refs.myQuillEditor.quill.enable(false);
		},
		props: {
			value: {
				type: String,
				default: ""
			},
			defaultMaxLength: {
				type: Number,
				default: 2000
			},
			check: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onEditorBlur(editor) {}, // 失去焦点事件
			onEditorFocus(v) {}, // 获得焦点事件
			onEditorChange(v) {
				if (v.html.length > this.maxSaveContent) {
					let arr = v.quill.getContents()['ops'];
					if (arr[arr.length - 1].insert === "\n") {
						arr.splice(arr.length - 2, 1);
					} else {
						let str = arr[arr.length - 1].insert;
						arr[arr.length - 1].insert = str.substr(0, str.length - 2) + '\n';
					}
					v.quill.setContents(arr);
					this.$message.error({
						message: '超出了存储的最大范围',
						duration: 1000
					});
				} else {
					this.currentLength = v.text.length - 1;
					this.$emit("input", v.html);
				}
			} // 内容改变事件
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill;
			},
			redBorder() {
				return this.currentLength > this.defaultMaxLength && this.check;
			}
		}
	}
</script>

<style>
	.quill-container {
		border: 1px solid red;
	}

	.ql-editor {
		height: 300px;
	}

	.text-number {
		color: red;
	}
</style>
