import type { NextApiRequest, NextApiResponse } from "next";
import { GHTK_API_URL, HEADERS } from "./test/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { order_code } = req.query;
  try {
    const response = await fetch(`${GHTK_API_URL}/shipment/status/${order_code}`, {
      method: "GET",
      headers: HEADERS
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
