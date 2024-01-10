export interface PaginatedResult {
  data: any[]
  meta: {
    total: number // number of all pages
    page: number // current page the user is on
    last_page: number
  }
}
