import type { NextApiRequest, NextApiResponse } from "next";
import { GHTK_API_URL, HEADERS } from "./config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { order_code } = req.body;

  try {
    const response = await fetch(`${GHTK_API_URL}/shipment/cancel/${order_code}`, {
      method: "POST",
      headers: HEADERS,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
