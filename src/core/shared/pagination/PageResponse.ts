import Pagination from "./Pagination"

export default class PageResponse<T> {
  public items: T[]
  public pagination: Pagination

  static async responseList<T>(
    listItems: T[],
    totalItems: number,
    page: number,
    itemsPerPage: number,
  ) {
    const total: number = totalItems
    const totalPages = Math.ceil(total / itemsPerPage)

    const pagination: Pagination = {
      currentPage: Number(page),
      totalPage: totalPages,
      totalItems: Number(total),
      itemsPerPage: Number(itemsPerPage),
    }

    return {
      pagination,
      items: listItems,
    }
  }
}
