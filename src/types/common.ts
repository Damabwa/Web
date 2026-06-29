export interface ImageFile {
  name: string;
  url: string;
}

export interface Address {
  jibunAddress: string;
  roadAddress: string;
}

export interface Region {
  category: string;
  name: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface RegistrationResponse {
  id: number;
  roles: string[];
  [key: string]: unknown;
}
