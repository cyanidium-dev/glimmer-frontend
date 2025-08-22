import axios from "axios";

export async function getNPCities() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const { data } = await axios.post(`${baseUrl}/api/novaposhta/cities`);
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}
