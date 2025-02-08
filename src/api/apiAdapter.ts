import {MetaDataPageAPI, PageApi} from '@api/types';
// @ts-ignore
import {MetaDataPage, Page} from '@types/Pages';
import {userAdapter} from '@domain/User/userAdapter';

function toMetaDataPage(meta: MetaDataPageAPI): MetaDataPage {
  return {
    total: meta.total,
    perPage: meta.per_page,
    currentPage: meta.current_page,
    lastPage: meta.last_page,
    firstPage: meta.first_page,
    hasNextPage: !!meta.next_page_url,
    hasPreviousPage: !!meta.previous_page_url,
  };
}

function toPageModel<ApiType, ModelType>(
  apiType: PageApi<ApiType>,
  adapterToModel: (apiType: ApiType) => ModelType,
): Page<ModelType> {
  return {
    meta: toMetaDataPage(apiType.meta),
    data: apiType.data.map(adapterToModel),
  };
}

export const apiAdapter = {
  toMetaDataPage,
  toPageModel,
};
