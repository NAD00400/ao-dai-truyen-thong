import type { NextApiRequest, NextApiResponse } from "next";
import { GHTK_API_URL, HEADERS } from "./config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch(`${GHTK_API_URL}/shipment/order`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
