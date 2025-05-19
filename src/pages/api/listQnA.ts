import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import QnA from "@/models/QnA";
import Tutorial from "@/models/Tutorial";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Missing or invalid slug" });
  }

  try {
    await dbConnect();
console.log(slug,'hhhh');
let slugId=await Tutorial.find({slug:slug})
const topicId=slugId[0]._id;



    const qnas = await QnA.find({tutorialSlug:topicId});
console.log(qnas,'hai')
    return res.status(200).json({ qnas });
  } catch (error) {
    console.error("Error fetching QnAs:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
