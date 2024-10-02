import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  user?: {
    id: number;
    name: string;
    email: string;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    const user = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
    };

    res.status(200).json({
      message: 'User registered successfully',
      user,
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}