export interface MetaDataPageAPI {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  previous_page_url: string | null;
}

/**
 * @description Interface to determine a paginated API response
 * @template Data Type of the paginated data
 */
export interface PageApi<Data> {
  /**
   * @description Metadata about pagination such as page numbers and total records
   */
  meta: MetaDataPageAPI;

  /**
   * @description Array of data items for the current page
   * The type of each item is determined by the generic type `Data`.
   */
  data: Data;
}

export interface PageParams {
  page?: number;
  per_page?: number;
}
