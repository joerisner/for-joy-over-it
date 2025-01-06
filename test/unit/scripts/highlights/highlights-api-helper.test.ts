import { describe, test, vi, expect, type Mock, beforeEach, expectTypeOf } from 'vitest';
import { getSources, getRandomHighlight, getHighlightsWithQuery } from 'src/scripts/highlights/highlights-api-helper';

const mockFetchResponse = (mockResponse: Object) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse)
    })
  ) as Mock;
};

describe('Highlights API Helper', () => {
  beforeEach(() => vi.clearAllMocks());

  test('getSources()', async () => {
    const mockResponse = { sources: [{ id: 1, title: 'Foo', type: 'BOOK' }] };
    mockFetchResponse(mockResponse);

    const response = await getSources();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockResponse.sources);
  });

  test('getRandomHighlight()', async () => {
    mockFetchResponse({});

    const response = await getRandomHighlight();

    expect(fetch).toHaveBeenCalledTimes(1);
    expectTypeOf(response).toBeObject();
  });

  test('getHighlightsWithQuery()', async () => {
    mockFetchResponse([{}]);

    const response = await getHighlightsWithQuery('author=1');

    expect(fetch).toHaveBeenCalledTimes(1);
    expectTypeOf(response).toBeArray();
  });
});
