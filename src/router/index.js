import VueRouter from "vue-router";
import Vue from "vue";
import editForm from "../components/editFormPage.vue";
import home from "../components/home.vue";
import tempManager from "../components/tempManager.vue";
import fillOut from "../components/fillOutPage.vue";

Vue.use(VueRouter);
const routes = [{
	path: '/',
	name: 'home',
	component: home
}, {
	path: "/edit",
	name: "formDesigner",
	component: editForm,
	props: true
}, {
	path: '/temp',
	name: 'tempManager',
	component: tempManager
},{
	path: '/fill',
	name: 'fillOutPage',
	component: fillOut,
	props: true
}]
const router = new VueRouter({
	routes
});
export default router;
