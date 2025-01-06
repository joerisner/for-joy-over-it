const { PUBLIC_HIGHLIGHTS_API_URL } = import.meta.env;

interface Source {
  id: number;
  title: string;
  type: string;
}

interface Highlight {
  author: string;
  body: string;
  metadata: string;
  source: string;
  tags: string[];
}

export const getSources = async (): Promise<Array<Source>> =>
  await fetch(`${PUBLIC_HIGHLIGHTS_API_URL}/sources`)
    .then(res => res.json())
    .then(json => json.sources);

export const getRandomHighlight = async (): Promise<Highlight> =>
  await fetch(`${PUBLIC_HIGHLIGHTS_API_URL}/random`).then(res => res.json());

export const getHighlightsWithQuery = async (queryStr: string): Promise<Array<Highlight>> =>
  await fetch(`${PUBLIC_HIGHLIGHTS_API_URL}/highlights?${queryStr}`).then(res => res.json());
