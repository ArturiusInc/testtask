import React from "react";
import styles from "../styles/Ticket.module.css";

export default function Ticket({ id, status, data }) {
	return (
		<div>
			{status === 500 || status === 404 ? (
				<div className={styles.notfound}>
					<img src="/search.svg" alt="search" />
					<p className={styles.p}>Штраф {id} не найден</p>
				</div>
			) : null}
			{status === 200 ? (
				<div className={styles.bord}>
					<h2 className={styles.h2}>Постановление #{id}</h2>
					<table className={styles.tabledata}>
						<tbody>
							<tr>
								<td>Свидетельство о регистрации:</td>
								<td>{data.doc_number}</td>
							</tr>
							<tr>
								<td>Дата постановления:</td>
								<td>{data.violation_at ? data.violation_at.slice(0, 10) : null}</td>
							</tr>
							<tr>
								<td>Нарушение:</td>
								<td>{data.koap_code}</td>
							</tr>
							<tr>
								<td>Получатель платежа:</td>
								<td>{data.payee_username}</td>
							</tr>
							<tr>
								<td>ИНН:</td>
								<td>{data.payee_inn}</td>
							</tr>
							<tr>
								<td>КПП:</td>
								<td>{data.payee_kpp}</td>
							</tr>
							<tr>
								<td>Расчетный счет:</td>
								<td>{data.payee_bank_account}</td>
							</tr>
							<tr>
								<td>Банк получателя:</td>
								<td>{data.payee_bank_name}</td>
							</tr>
							<tr>
								<td>БИК:</td>
								<td>{data.payee_bank_bik}</td>
							</tr>
							<tr>
								<td>ОКТМО(ОКАТО):</td>
								<td>{data.payee_oktmo}</td>
							</tr>
							<tr>
								<td>КБК:</td>
								<td>{data.kbk}</td>
							</tr>
							<tr>
								<td>Сумма штафа:</td>
								<td>{data.amount}</td>
							</tr>
							<tr>
								<td>Скидка:</td>
								<td>активна до {data.bill_at ? data.bill_at.slice(0, 10) : null}</td>
							</tr>
							<tr>
								<td>К оплате:</td>
								<td>{data.amount_to_pay}</td>
							</tr>
						</tbody>
					</table>
				</div>
			) : null}
		</div>
	);
}
