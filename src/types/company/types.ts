
// 회사 정보 요청 인터페이스
export interface ReqCompanyDTO {
	companyId: number;
	authType: string;
	companyNm: string;
	zipCode: string;
	address: string;
	extraAddress: string;
	homepage: string;
	companyInfo: string;
	adminNote: string;
	useYn: string;
};

// 회사 정보 리스트 요청 인터페이스
export interface ReqCompanyListDTO {
	companyId: number;
	companyNm: string;
	useYn: string;
	pageNo: number;
	pageSize: number;
};

// 회사 리스트 응답 인터페이스
export interface ResCompanyListDTO {
	companyId: number;
	companyNm: string;
	authType: string;
	address: string;
	useYn: string;
	regDt: string;
};
