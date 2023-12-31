import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
const inter = Inter({ subsets: ['latin'] });
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import clientConfig from './client-config';
import Cookies from 'js-cookie';

/** generateToken Function */
async function generateToken(username: string, password: string) {
	try {
		const response = await axios.post('/api/generateToken', { username, password });
		return response.data.jwt_token;
	} catch (error) {
		console.error('Error generating token:', error);
		return null;
	}
}

/** validateToken Function */
async function validateToken(token: string) {
	try {
		// Replace with your actual URL
		const wordPressSiteURL = clientConfig.siteUrl;
		const validateUrl = `${wordPressSiteURL}/wp-json/api/v1/token-validate`;
		const response = await axios.get(validateUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error validating token:', error);
		return null;
	}
}

export default function Home() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState(null);
	const [validationResult, setValidationResult] = useState(null);

	const handleGenerateToken = async () => {
		const generatedToken = await generateToken(username, password);
		if (generatedToken) {
			// Store the generated token in the session
			// sessionStorage.setItem('jwt_token', generatedToken);
			// localStorage.setItem('jwt_token', generatedToken);
			Cookies.set('jwt_token', generatedToken, { expires: 7 });
			setToken(generatedToken);
		} else {
			setToken(null);
			console.error('Token not generated.');
		}
		setUsername('');
		setPassword('');
	};
	const handleValidateToken = async () => {
		// const storedToken = localStorage.getItem('jwt_token') || Cookies.get('jwt_token') || sessionStorage.getItem('jwt_token');
		const storedToken = Cookies.get('jwt_token');
		if (storedToken) {
			// Validate the token
			const validationResponse = await validateToken(storedToken);
			setValidationResult(validationResponse);
		} else {
			console.error('Token not found in localStorage or cookie.');
		}
	};

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleGenerateToken}>Generate Token</button>
				<button onClick={handleValidateToken}>Validate Token</button>

				{token && <div>Your generated token: {token}</div>}
				<Link href="/blog">Go to Blog</Link>
				{validationResult && (
					<div>Token validation result: {JSON.stringify(validationResult)}</div>
				)}
			</main>
		</>
	);
}
