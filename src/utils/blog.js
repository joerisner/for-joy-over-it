import { getCollection } from 'astro:content';

export const getFinalizedPosts = async () => {
  const posts = await getCollection('blog');
  return posts.filter(post => post.data.isDraft === false);
};
