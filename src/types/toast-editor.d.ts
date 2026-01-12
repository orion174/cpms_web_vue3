declare module "@toast-ui/editor" {
	export interface ToastEditorInstance {
		getHTML(): string;
		setHTML(html: string): void;
		reset(): void;
		addHook(hook: string, callback: Function): void;
	}

	export default class Editor {
		constructor(options: any);
		getInstance(): ToastEditorInstance;
	}
}
