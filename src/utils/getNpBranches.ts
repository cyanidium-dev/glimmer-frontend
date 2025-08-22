import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function getNPBranches(cityRef: string) {
  try {
    const { data } = await axios.post(`${baseUrl}/api/novaposhta/warehouses`, {
      cityRef,
    });
    return data;
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return [];
  }
}
