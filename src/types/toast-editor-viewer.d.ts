declare module "@toast-ui/editor/dist/toastui-editor-viewer.js" {
	export default class Viewer {
		constructor(options: {
			el: HTMLElement;
			initialValue?: string;
			height?: string;
		});
	}
}