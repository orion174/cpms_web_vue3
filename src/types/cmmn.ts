/* 📁 공통 인터페이스 */

// API 응답 인터페이스
export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message: string;
    errorCode?: string;
}

// JPA 페이징 응답 인터페이스
export interface PageResponse<T = unknown> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
}

// 공통 코드 요청 인터페이스
export interface ReqCmmnCodeDTO {
	groupCode: string;
}

// 공통 코드 목록 응답 인터페이스
export interface ResCmmnCodeDTO {
	codeId: number;
	codeNm: string;
}

// 파일 인터페이스
export interface ExistingFileItem {
    id: number,
    name: string,
    isNew: false;
}

// 업로드 첨부파일 인터페이스
export interface NewFileItem  {
    id: number;
    file?: File;
    name: string;
    isNew: boolean;
}

export type FileItem = ExistingFileItem | NewFileItem;