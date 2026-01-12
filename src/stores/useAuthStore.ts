import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
	authType: string;
	loginId: string;
}

export const useAuthStore = defineStore('auth', {
	state: () => ({
		accessToken: sessionStorage.getItem('accessToken') || '',
		authType: '',
		loginId: '',
	}),

	actions: {
		setToken(token: string) {
			this.accessToken = token;
			sessionStorage.setItem('accessToken', token);

			const decoded = jwtDecode<JwtPayload>(token);
			this.authType = decoded.authType;
			this.loginId = decoded.loginId;
		},

		logout() {
			this.accessToken = '';
			this.authType = '';
			this.loginId = '';

			sessionStorage.removeItem('accessToken');
		},

		loadFromSession() {
			const token = sessionStorage.getItem('accessToken');
			if (token) this.setToken(token);
		},
	}
});
