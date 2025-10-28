import { jwtDecode } from 'jwt-decode';

// 사용자 권한 조회
interface JwtPayload {
	authType: string;
	[ key: string ]: any;
}

export const getUserAuthType = async (): Promise<string | null> => {

	const accessToken = sessionStorage.getItem('accessToken');

	if (!accessToken) return null;

	try {
		const decoded = jwtDecode<JwtPayload>(accessToken);
		return decoded.authType ?? null;

	} catch (e) {
		console.error("JWT 디코딩 실패:", e);
		return null;
	}
};

export function handleEnter(callback: () => void) {
	return (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			callback();
		}
	};
};
