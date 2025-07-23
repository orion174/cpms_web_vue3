import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/pages/login/index.vue';
import SupportList from '@/pages/support/list/index.vue';

import Dashboard from '../examples/views/Dashboard.vue';
import Tables from '../examples/views/Tables.vue';
import Billing from '../examples/views/Billing.vue';
import Profile from '../examples/views/Profile.vue';
import SignIn from '../examples/views/SignIn.vue';
import SignUp from '../examples/views/SignUp.vue';

const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	// CPMS 화면
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/support',
		name: 'Support',
		component: SupportList,
	},
	// {
	// 	path: '/setting',
	// 	name: 'Setting',
	// 	component: Setting,
	// },
	// {
	// 	path: '/myPage',
	// 	name: 'MyPage',
	// 	component: MyPage,
	// },
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
