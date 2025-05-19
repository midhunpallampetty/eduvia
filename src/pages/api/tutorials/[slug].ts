import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Tutorial, { ITutorial } from '../../../models/Tutorial';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITutorial | { message: string }>
) {
  // ✅ Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();

  const { slug } = req.query;
  const newSlug = slug?.toString();

  if (!newSlug) {
    return res.status(400).json({ message: 'Missing slug parameter' });
  }

  try {
    const tutorial = await Tutorial.findOne({ slug: newSlug });

    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }

    return res.status(200).json(tutorial);
  } catch (error) {
    console.error('Error fetching tutorial by slug:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
