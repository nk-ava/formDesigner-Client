import fancyEditor from "./extends/fancyEditor.vue";
import genQRCode from "./extends/genQrCode.vue";
import fancyText from "./extends/fancyText.vue";
import fancyBarCode from "./extends/fancyBarCode.vue";
import iconDialog from "./iconDialog.vue";

export default {
	install: function(Vue) {
		Vue.component("fancy-editor", fancyEditor);
		Vue.component("gen-qrcode",genQRCode);
		Vue.component("fancy-text",fancyText);
		Vue.component("fancy-bar-code",fancyBarCode);
		Vue.component("icon-dialog",iconDialog);
	}
}
