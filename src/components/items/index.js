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

export let formComp = [
	select,Switch,input,slider,textarea,inputNumber,timePicker,
	date,rate
]

export let supportComp = [
	button,divider,link
]