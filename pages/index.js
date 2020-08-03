import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { getContol } from "./../helpers/helpers";
import axios from "axios";
import Loading from "../components/Loading";
import Ticket from "../components/Ticket";

export default function Home() {
	const [searchText, setSearchText] = useState("");
	const [helper, setHelper] = useState(false);
	const [control, setControl] = useState("");
	const [error, setError] = useState(false);
	const [queryRun, setQueryRun] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({ status: null, data: null, id: null });

	useEffect(() => {
		if (queryRun && searchText) {
			setLoading(true);
			axios
				.post(`http://localhost:3000/api/getremote`, {
					id: searchText,
				})
				.then((response) => {
					setData({ status: response.status, data: response.data, id: searchText });
				})
				.catch((reject) => {
					setData({ status: reject.response.status, data: null, id: searchText });
				})
				.finally(() => {
					setQueryRun(false);
					setSearchText("");
					setLoading(false);
				});
		}
	}, [queryRun, searchText]);

	const sendForm = (e) => {
		e.preventDefault();
		setData({ status: null, data: null, id: null });
		if (searchText.length === 25 || searchText.length === 20) {
			setQueryRun(true);
			setError(false);
		} else {
			setError(true);
		}
	};

	const checkControl = (key) => {
		setSearchText(key);
		if (key.length === 19 || key.length === 24) {
			setControl(getContol(key));
			setHelper(true);
		} else {
			setHelper(false);
		}
	};

	const addControl = () => {
		setSearchText(searchText + control);
		setHelper(false);
		setError(false);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Получение информации о штрафе по УИН</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.main}>
				<img src="/shtrafov.svg" alt="shtrafovnet Logo" className={styles.logo} />
				<h1 className={styles.h1}>Получение информации о штрафе по УИН</h1>
				<form className={styles.findform} onSubmit={sendForm}>
					<input
						type="number"
						className={styles.findinput}
						placeholder="Введите УИН"
						value={searchText}
						onChange={(e) => checkControl(e.currentTarget.value)}
					/>
					<button className={styles.findbutton}>Найти</button>
					{helper ? (
						<div className={styles.helper} onClick={addControl}>
							{searchText + control}
						</div>
					) : null}
				</form>
				{error ? <div className={styles.error}>количество цыфр должно быть 20 или 25</div> : null}
				{loading === true ? <Loading /> : null}
				{data.status ? <Ticket id={data.id} status={data.status} data={data.data} /> : null}
			</div>
		</div>
	);
}
