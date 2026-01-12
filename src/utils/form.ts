// FormData 필드 유틸
export const appendPlainFields = (
	fd: FormData,
	obj: Record<string, unknown>,
	exclude: string[] = []
): void => {
	(Object.keys(obj) as Array<keyof typeof obj>).forEach((key: string): void => {
		// 제외 코드
		if (exclude.includes(key as string)) return;
		
		const v = obj[key];

		if (v === null || v === undefined) return;

		// FormData는 기본적으로 string만 넣도록 통일
		if (
			typeof v === "string" ||
			typeof v === "number" ||
			typeof v === "boolean"
		) {
			fd.append(String(key), String(v));
		}
	});
};