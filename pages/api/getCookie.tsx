import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Parse cookies from the request
  const cookies = cookie.parse(req.headers.cookie || '');

  // Retrieve the specific cookie you need
  const myCookieValue = cookies.myCookieName || '';

  res.status(200).json({ myCookieValue });
};