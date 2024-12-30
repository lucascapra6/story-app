import {usePaginatedList} from '../usePaginatedList';
// @ts-ignore
import {MetaDataPage, Page} from '@types/Pages';
import {renderHook, waitFor} from '../../../test/test-utils';
const page1 = ['item1', 'item2', 'item3'];
const page2 = ['item4', 'item5', 'item6'];

function getList(page: number): Promise<Page<string>> {
  const data = page === 1 ? page1 : page2;

  const meta: MetaDataPage = {
    currentPage: page,
    firstPage: 1,
    lastPage: 2,
    hasNextPage: page === 1,
    hasPreviousPage: page === 2,
    perPage: 3,
    total: 6,
  };

  return Promise.resolve({data, meta});
}

describe('usePaginatedList', () => {
  it('returns all pages together and stops fetching if there are no more page', async () => {
    const mockedFn = jest.fn(getList);
    const {result} = renderHook(() => usePaginatedList(['key'], mockedFn));

    await waitFor(() => expect(result.current.list).toStrictEqual(page1));

    result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.list).toStrictEqual([...page1, ...page2]),
    );

    result.current.fetchNextPage();

    expect(mockedFn).toHaveBeenCalledTimes(2);
  });
});
