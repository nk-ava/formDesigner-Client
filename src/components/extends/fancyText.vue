<!--文本扩展-->
<template>
	<p v-html="text" style="margin-block-start:0em;margin-block-end:0em;" :style="{'text-align':align,
        'color':color,
        'font-size':size+'px',
        'font-weight':bold
        }" />
</template>

<script>
	export default {
		name: "fancyText",
		props: {
			text: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: true
			},
			align: {
				type: String,
				default: 'left'
			},
			color: {
				type: String,
				default: ''
			},
			size: {
				type: Number,
				default: 14,
			},
			bold: {
				type: Number,
				default: 400,
			}
		}
	}
</script>
<style>
</style>
