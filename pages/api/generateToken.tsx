import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import clientConfig from '../client-config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const wordPressSiteURL = clientConfig.siteUrl;
	const { username, password } = req.body;
	const tokenEndpoint = `${wordPressSiteURL}/wp-json/api/v1/token`;
	try {
		const response = await axios.post(tokenEndpoint, { username, password });
		if (response.data && response.data.jwt_token) {
		  res.status(200).json({ jwt_token: response.data.jwt_token });
		} else {
		  res.status(401).json({ message: 'Token generation failed' });
		}
	} catch (error) {
		console.error('Error generating token:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};