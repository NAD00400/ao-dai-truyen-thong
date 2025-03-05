import { NextApiRequest, NextApiResponse } from 'next';

const GHTK_API_URL = 'https://api.ghtk.vn';
const TOKEN = 'your-ghtk-token';
//main
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    case 'GET':
      if (req.query.type === 'calculate_fee') {
        return calculateFee(req, res);
      }
      return getOrderStatus(req, res);
    case 'DELETE':
      return cancelOrder(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
// tạo đơn hàng 
async function createOrder(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${GHTK_API_URL}/services/shipment/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': TOKEN,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
}
// lấy trạng thái đơn hàng 
async function getOrderStatus(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { orderId } = req.query;
    const response = await fetch(`${GHTK_API_URL}/services/shipment/v2/${orderId}`, {
      headers: { 'Token': TOKEN },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get order status' });
  }
}
// hủy đơn hàng 
async function cancelOrder(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { orderId } = req.query;
    const response = await fetch(`${GHTK_API_URL}/services/shipment/cancel/${orderId}`, {
      method: 'DELETE',
      headers: { 'Token': TOKEN },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel order' });
  }
}
// tính phí 
async function calculateFee(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { pick_province, pick_district, province, district, weight } = req.query;
    const queryString = `?pick_province=${pick_province}&pick_district=${pick_district}&province=${province}&district=${district}&weight=${weight}`;
    const response = await fetch(`${GHTK_API_URL}/services/shipment/fee${queryString}`, {
      headers: { 'Token': TOKEN },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate fee' });
  }
}
// api in nhãn
async function printLabel(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { orderId } = req.query;
    const response = await fetch(`${GHTK_API_URL}/services/label/${orderId}`, {
      headers: { 'Token': TOKEN },
    });
    const blob = await response.blob();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(await blob.arrayBuffer()));
  } catch (error) {
    res.status(500).json({ error: 'Failed to print label' });
  }
}
