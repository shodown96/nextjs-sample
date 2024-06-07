import { PaginateDataRequest, PaginatedData, Response } from "@/types/common";
import { COLORS, DEFAULT_PAGE_SIZE } from "./constants";

export function generateHexColor(index: number) {
  console.log(index, COLORS[index % COLORS.length]);
  return COLORS[index % COLORS.length];
}

export const getFirstName = (name = "") => {
  return name.split(" ")[0] || "";
};

export const getLastName = (name = "") => {
  return name.split(" ").slice(1).join("") || "";
};

export const paginateData = ({
  query,
  items,
}: PaginateDataRequest): PaginatedData<any> => {
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE } = query;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const _items = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / pageSize);

  return {
    items: _items,
    currentPage: page,
    pageSize,
    totalPages,
    totalItems: items.length,
  };
};

export const constructResponse = ({
  code,
  data,
  message,
}: any): Response<any> => {
  return {
    code,
    status: [200, 201].includes(code) ? "success" : "error",
    data,
    message,
  };
};
