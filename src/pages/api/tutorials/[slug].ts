import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Tutorial from '../../../models/Tutorial';
import { ITutorial } from '../../../models/Tutorial';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITutorial | { message: string }>
) {
  await dbConnect();
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    return res.status(400).json({ message: 'Invalid slug format' });
  }

  try {
    const tutorial = await Tutorial.findOne({ slug });

    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }

    res.status(200).json(tutorial);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
