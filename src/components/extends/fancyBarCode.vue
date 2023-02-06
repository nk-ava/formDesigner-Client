<template>
	<bar-code v-model="text" :format="format" :lineColor="lineColor" :background="background" :width="barWidth"
		:height="barHeight" :displayValue="displayValue" :fontSize="fontSize">
	</bar-code>
</template>

<script>
	import barCode from "vue-barcode";
	export default {
		name: 'fancyBarCode',
		components: {
			barCode
		},
		props: {
			text: {
				type: String,
				default: 'formDesig'
			},
			format: {
				type: String,
				default: 'CODE128'
			},
			lineColor: {
				type: String,
				default: '#000'
			},
			background: {
				type: String,
				default: '#fff'
			},
			barWidth: {
				type: Number,
				default: 5
			},
			barHeight: {
				type: Number,
				default: 30
			},
			displayValue: {
				type: Boolean,
				default: true
			},
			fontSize: {
				type: Number,
				default: 12
			}
		}
	}
</script>

<style>
</style>
