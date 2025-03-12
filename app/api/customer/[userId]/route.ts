import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  if (req.method === 'GET') {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id },
      });
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ error: 'Error retrieving customer' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { userId, phone, address } = req.body;
      const updatedCustomer = await prisma.customer.update({
        where: { id },
        data: { userId, phone, address },
      });
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating customer' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.customer.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting customer' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
