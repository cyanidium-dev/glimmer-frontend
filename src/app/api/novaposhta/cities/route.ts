// import { NextResponse } from "next/server";
// import axios from "axios";
// import { NOVA_POSHTA_API_URL } from "@/constants/constants";

// const API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY || "";

// export async function POST(req: Request) {
//   try {
//     const { query } = await req.json();

//     if (!query || query.trim().length < 1) {
//       return NextResponse.json([]);
//     }

//     const methodProperties = { FindByString: query };

//     const response = await axios.post(NOVA_POSHTA_API_URL, {
//       apiKey: API_KEY,
//       modelName: "Address",
//       calledMethod: "getCities",
//       methodProperties: methodProperties,
//     });

//     return NextResponse.json(response.data?.data || []);
//   } catch (error) {
//     console.error("Error fetching cities:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch cities" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import axios from "axios";
import { NOVA_POSHTA_API_URL } from "@/constants/constants";

const API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY || "";

export async function POST() {
  try {
    const response = await axios.post(NOVA_POSHTA_API_URL, {
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "getCities",
      //   methodProperties: {
      //     Page: "1",      // необов’язково, дефолт = 1
      //     Limit: "1000",  // можна вказати скільки записів повертати за раз
      //   },
    });

    return NextResponse.json(response.data?.data || []);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
