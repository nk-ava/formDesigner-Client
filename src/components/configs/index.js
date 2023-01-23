const components = [
	'button',
	'divider',
	'input',
	'select',
	'slider',
	'switch',
	'textarea',
	'link',
	'inputNumber',
	'time',
	'date',
	'rate',
	'checkbox',
	'radio',
	'editor',
	'colorpicker',
	'collapse',
	'qrcode'
]

let cpms = [];
components.forEach(v=>{cpms.push({name:v,content:null})});
export default cpms;