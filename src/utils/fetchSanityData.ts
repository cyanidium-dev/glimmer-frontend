import { createClient } from "next-sanity";

const client = createClient({
  projectId: "us9jz0mn",
  dataset: "production",
  apiVersion: "2025-08-04",
  useCdn: true,
});

export const fetchSanityDataServer = async (
  query: string,
  params: Record<string, unknown> = {}
) => {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.warn("Sanity fetch failed:", error);
  }
};
