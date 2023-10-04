import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
const inter = Inter({ subsets: ['latin'] });
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const blog = ({ posts }) => {
	return (
		<>
			<Head>
				<title>Blogs</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				<h1>Blog</h1>
				<ul>
					{posts.map((post) => (
						<li key={post.id}>{post.title.rendered}</li>
					))}
				</ul>
			</main>
		</>
	)
}
export async function getStaticProps() {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJ2cmEiLCJpYXQiOjE2OTYzMjc1MzUsImV4cCI6MTg1NDAwNzUzNX0.9utgGF6IturHr83ADtIDEDPS5pfWSmjLO_4AaVsSTMU';
	try {
		const response = await axios.get('http://vra.local/wp-json/wp/v2/posts', {
			headers: {
				Authorization:`Bearer ${token}`
			},
		});
		const posts = response.data;
		return {
			props: {
				posts,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				posts: [],
			},
		};
	}
}

export default blog