import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Tutorial from '../../../models/Tutorial';
import { ITutorial } from '../../../models/Tutorial';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ tutorial: ITutorial[] } | { message: string }>
) {
  await dbConnect();

  try {
    const tutorial = await Tutorial.find();

    if (!tutorial || tutorial.length === 0) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }

    res.status(200).json({ tutorial });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
