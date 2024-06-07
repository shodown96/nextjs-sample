export interface Response<T> {
  code: 200 | 201 | 400;
  status: "success" | "error";
  message: string;
  data?: T;
}

export interface PaginatedData<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface PaginateDataRequest {
  items: any;
  query: {
    page?: number;
    pageSize?: number;
  };
}
