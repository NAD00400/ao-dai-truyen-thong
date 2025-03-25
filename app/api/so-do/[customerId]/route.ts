import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const measurement = await prisma.customerMeasurement.findUnique({
          where: { id },
        });
        if (!measurement) {
          return res.status(404).json({ error: 'Customer measurement not found' });
        }
        return res.status(200).json(measurement);
      } catch (error) {
        console.error('Error retrieving customer measurement:', error);
        return res.status(500).json({ error: 'Error retrieving customer measurement' });
      }

    case 'PUT':
      try {
        const {
          chestSize,
          neckSize,
          bustSize,
          waistSize,
          hipSize,
          shoulderWidth,
          waistLength,
          armLength,
          armCircumference,
          pantLength,
          calfCircumference,
          headCircumference,
        } = req.body;

        const updatedMeasurement = await prisma.customerMeasurement.update({
          where: { id },
          data: {
            chestSize: chestSize !== undefined ? Number(chestSize) : undefined,
            neckSize: neckSize !== undefined ? Number(neckSize) : undefined,
            bustSize: bustSize !== undefined ? Number(bustSize) : undefined,
            waistSize: waistSize !== undefined ? Number(waistSize) : undefined,
            hipSize: hipSize !== undefined ? Number(hipSize) : undefined,
            shoulderWidth: shoulderWidth !== undefined ? Number(shoulderWidth) : undefined,
            waistLength: waistLength !== undefined ? Number(waistLength) : undefined,
            armLength: armLength !== undefined ? Number(armLength) : undefined,
            armCircumference: armCircumference !== undefined ? Number(armCircumference) : undefined,
            pantLength: pantLength !== undefined ? Number(pantLength) : undefined,
            calfCircumference: calfCircumference !== undefined ? Number(calfCircumference) : undefined,
            headCircumference: headCircumference !== undefined ? Number(headCircumference) : undefined,
          },
        });
        return res.status(200).json(updatedMeasurement);
      } catch (error) {
        console.error('Error updating customer measurement:', error);
        return res.status(500).json({ error: 'Error updating customer measurement' });
      }

    case 'DELETE':
      try {
        await prisma.customerMeasurement.delete({
          where: { id },
        });
        return res.status(204).end();
      } catch (error) {
        console.error('Error deleting customer measurement:', error);
        return res.status(500).json({ error: 'Error deleting customer measurement' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
