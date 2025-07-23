/* 📁 cookie.ts */
import axios from 'axios';

export const tokenError = () => {
	sessionStorage.clear();

	deleteCookie()
		.catch(err => console.warn('deleteCookie failed:', err))
		.finally(() => {
			window.location.replace('/login');
		});
};

// 쿠키 삭제
const deleteCookie = async (): Promise<void> => {
	try {
        await axios.post(
            `${import.meta.env.VITE_API_URL}/api/cookie/delete`
            , null
            , {
				headers: { 'Content-Type': 'application/json' }
				, withCredentials: true
			}
        );
    } catch (error) {
		console.warn('deleteCookie failed:', error);
    }
};