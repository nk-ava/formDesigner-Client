import {button} from "./button.js";
import {Switch} from "./switch.js";
import {input} from "./input.js";
import {select} from "./select.js";
import {slider} from "./slider.js";
import {textarea} from "./textarea.js";
import {divider} from "./divider.js";
import {link} from "./link.js";
import {inputNumber} from "./inputNumber.js";
import {timePicker} from "./timePicker.js";
import {date} from "./date.js";
import {rate} from "./rate.js";
import {checkbox} from "./checkbox.js";
import {radio} from "./radio.js";
import {editor} from "./editor.js";
import {colorpicker} from "./colorpicker.js";
import {collapse} from "./collapse.js";
import {qrcode} from "./qrcode.js";

export let formComp = [
	select,Switch,input,slider,textarea,inputNumber,timePicker,
	date,rate,checkbox,radio,editor,colorpicker,collapse,qrcode,
]

export let supportComp = [
	button,divider,link
]