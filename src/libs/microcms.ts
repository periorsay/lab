import { createClient, MicroCMSQueries } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});
export const getBlogs = async (queries?: MicroCMSQueries) => {
  return await client.get({ endpoint: 'blogs', queries });
};

export const getBlogsDetail = async (blogId: string, queries?: MicroCMSQueries) => {
  return await client.getListDetail({ endpoint: 'blogs', queries, contentId: blogId });
};
