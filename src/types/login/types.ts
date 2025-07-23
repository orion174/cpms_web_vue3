// 로그인 요청 인터페이스
export interface ReqLoginDTO {
	loginId: string;
	loginPw: string;
}

// 로그인 응답 인터페이스
export interface ResLoginDTO {
	authType: string;
	loginHistoryId: number;
	userId: number;
	userNm: string;
	companyId: number;
	loginId: string;
	loginPw: string;
	useYn: string;
	accessToken: string;
	refreshToken: string;
	accessTokenExpiration: number;
	refreshTokenExpiration: number;
}

// 리프레쉬 토큰 응답 인터페이스
export interface ResRefreshTokenDTO {
	accessToken: string;
	accessTokenExpiration: number;
}