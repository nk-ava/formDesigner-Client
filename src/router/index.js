import VueRouter from "vue-router";
import Vue from "vue";
import editForm from "../components/editFormPage.vue";
import home from "../components/home.vue";
import tempManager from "../components/tempManager.vue";

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
}]
const router = new VueRouter({
	routes
});
export default router;
