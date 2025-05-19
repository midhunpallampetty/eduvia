import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import QnA from "@/models/QnA";
import Tutorial from "@/models/Tutorial";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // or use "https://www.eduvia.space" for tighter security
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle CORS preflight
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Missing or invalid slug" });
  }

  try {
    await dbConnect();
    const tutorial = await Tutorial.findOne({ slug });

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    const qnas = await QnA.find({ tutorialSlug: tutorial._id });
    return res.status(200).json({ qnas });
  } catch (error) {
    console.error("Error fetching QnAs:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
