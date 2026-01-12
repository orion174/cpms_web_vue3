import 'vue-router';

interface MenuMeta {
	label: string;
	icon?: string;
	parent?: string | null;
}

declare module 'vue-router' {
	interface RouteMeta {
		menu?: MenuMeta;
	}
}
