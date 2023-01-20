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
	'rate'
]

let cpms = [];
components.forEach(v=>{cpms.push({name:v,content:null})});
export default cpms;