import fancyEditor from "./extends/fancyEditor.vue";
import genQRCode from "./extends/genQrCode.vue";

export default {
	install: function(Vue) {
		Vue.component("fancy-editor", fancyEditor);
		Vue.component("gen-qrcode",genQRCode);
	}
}
