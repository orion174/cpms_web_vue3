import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/pages/login/index.vue';
import SupportList from '@/pages/support/list/index.vue';
import SupportForm from '@/pages/support/form/index.vue';

import Dashboard from '../examples/views/Dashboard.vue';
import Tables from '../examples/views/Tables.vue';
import Billing from '../examples/views/Billing.vue';
import Profile from '../examples/views/Profile.vue';
import SignIn from '../examples/views/SignIn.vue';
import SignUp from '../examples/views/SignUp.vue';

interface MenuMeta {
	label: string;
	icon?: string;
	parent?: string | null;
};

const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/support/list',
		name: 'Support List',
		component: SupportList,
		meta: {
			menu: {
				label: 'Support',
				icon: 'dashboard',
				parent: 'support',
			}
		}
	},
	{
		path: '/support/insert',
		name: 'Support Form',
		component: SupportForm,
		meta: {
			menu: false
		}
	},
	{
		path: '/myPage/info',
		name: 'My Page',
		component: Profile,
		meta: {
			menu: {
				label: 'Profile',
				icon: 'person',
				parent: null,
			}
		}
	},
	// 템플릿 페이지
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
	},
	{
		path: '/tables',
		name: 'Tables',
		component: Tables,
	},
	{
		path: '/billing',
		name: 'Billing',
		component: Billing,
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
	},
	{
		path: '/sign-in',
		name: 'SignIn',
		component: SignIn,
	},
	{
		path: '/sign-up',
		name: 'SignUp',
		component: SignUp,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkActiveClass: 'active',
});

export default router;
