const { PUBLIC_HIGHLIGHTS_API_URL } = import.meta.env;

interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

interface Source {
  id: number;
  title: string;
  type: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Highlight {
  author: string;
  body: string;
  metadata: string;
  source: string;
  tags: string[];
}

export const getAuthors = async (): Promise<Array<Author>> => {
  if (!PUBLIC_HIGHLIGHTS_API_URL) {
    throw Error("Missing 'PUBLIC_HIGHLIGHTS_API_URL' environment variable!");
  }

  return await fetch(`${PUBLIC_HIGHLIGHTS_API_URL}/authors`)
    .then(res => res.json())
    .then(json => json.authors);
};

export const getSources = async (): Promise<Array<Source>> =>
  await fetch(`${PUBLIC_HIGHLIGHTS_API_URL}/sources`)
    .then(res => res.json())
    .then(json => json.sources);

export const getTags = async (): Promise<Array<Tag>> =>
  await fetch(`${PUBLIC_HIGHLIGHTS_API_URL}/tags`)
    .then(res => res.json())
    .then(json => json.tags);

export const getRandomHighlight = async (): Promise<Highlight> =>
  await fetch(`${PUBLIC_HIGHLIGHTS_API_URL}/random`).then(res => res.json());

export const getHighlightsWithQuery = async (queryStr: string): Promise<Array<Highlight>> =>
  await fetch(`${PUBLIC_HIGHLIGHTS_API_URL}/highlights?${queryStr}`).then(res => res.json());
