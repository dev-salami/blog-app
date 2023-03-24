import Mainpost from "@/components/Mainpost";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

import React from "react";
export async function getStaticPaths() {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const res = await axios.get(
		`http://localhost:5000/api/v1/posts/${router.query.post}`
	);
	const posts = await res.data;

	const paths = posts.map((item) => ({
		params: { id: item._id },
	}));

	return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
	const res = await axios(`http://localhost:5000/api/v1/posts/${params.id}`);
	const data = await res.json();

	return { props: { data } };
}
function post({ data }) {
	const router = useRouter();
	const { category } = router.query;
	// console.log(router.query.post);
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>BLOG</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<div>
				<Mainpost data={data} />
			</div>
		</>
	);
}

export default post;
