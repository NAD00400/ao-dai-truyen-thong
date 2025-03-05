import type { NextApiRequest, NextApiResponse } from "next";
import { GHTK_API_URL, HEADERS } from "./config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { order_code } = req.query;

  try {
    const response = await fetch(`${GHTK_API_URL}/shipment/print/${order_code}`, {
      method: "GET",
      headers: HEADERS
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    // Chuyển stream thành Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="label_${order_code}.pdf"`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
