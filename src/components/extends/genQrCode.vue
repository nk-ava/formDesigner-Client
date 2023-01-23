<template>
	<div class="qrcode" ref="qrCodeUrl"></div>
</template>

<script>
	import QRCode from "qrcodejs2";

	export default {
		name: 'genQrCode',
		components: {
			QRCode
		},
		methods: {
			creatQrCode() {
				this.$refs.qrCodeUrl.innerHTML="";
				var qrcodeRes = new QRCode(this.$refs.qrCodeUrl, {
					text: this.text,
					width: this.size,
					height: this.size,
					colorDark: this.colorDark,
					colorLight: this.colorLight,
					correctLevel: QRCode.CorrectLevel.H
				});
			}
		},
		props: {
			text: {
				type: String,
				default: "formDesigner"
			},
			size:{
				type:Number,
				default:80
			},
			colorDark:{
				type:String,
				default:"#000000"
			},
			colorLight:{
				type:String,
				default:"#ffffff"
			}
		},
		mounted() {
			this.creatQrCode();
		},
		watch: {
			text() {
				this.creatQrCode();
			},
			size(){
				this.creatQrCode();
			},
			colorDark(){
				this.creatQrCode();
			},
			colorLight(){
				this.creatQrCode();
			}
		}
	}
</script>

<style>
	.qrcode img {
		background-color: #fff;
		padding: 5px;
		box-sizing: border-box;
		margin-bottom:0px;
	}
</style>
