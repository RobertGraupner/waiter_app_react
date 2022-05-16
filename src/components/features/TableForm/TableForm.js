import styles from "./TableForm.module.scss";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import shortid from "shortid";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSingleTable } from "../../../Redux/tablesRedux";
import SpinnerAnimation from "../../common/SpinnerAnimation";

const TableForm = ({ table, action, actionText }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();
	// stan potrzebny do włączania spinnera
	const [isLoading, setIsLoading] = useState(false);

	const [status, setStatus] = useState(table.status);
	const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
	const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
	const [bill, setBill] = useState(table.bill);

	const statusNames = ["Busy", "Cleaning", "Free", "Reserved"];
	const unselectedStatuses = statusNames.filter(statusName => statusName !== status);

	const handleSubmit = e => {
		setIsLoading(true);
		dispatch(updateSingleTable({ status, peopleAmount, maxPeopleAmount, bill, id }));
		navigate("/");
	};

	// określone warunki dla stolików
	const handleStatus = status => {
		if (status === "Busy") {
			setBill(0);
			setStatus(status);
		} else if (status === "Cleaning" || status === "Free") {
			setPeopleAmount(0);
			setStatus(status);
		} else {
			setStatus(status);
		}
	};

	const handlePeopleAmount = amount => {
		if (amount > maxPeopleAmount) {
			setPeopleAmount(maxPeopleAmount);
		} else if (amount <= 0) {
			setPeopleAmount(0);
		} else {
			setPeopleAmount(amount);
		}
	};

	const handleMaxPeopleAmount = amount => {
		if (amount >= 10) {
			setMaxPeopleAmount(10);
		} else if (peopleAmount >= amount) {
			setMaxPeopleAmount(amount);
			setPeopleAmount(amount);
		} else {
			setMaxPeopleAmount(amount);
		}
	};

	return (
		<>
			<h1>Table {table.id}</h1>
			{isLoading && <SpinnerAnimation />}
			<Form onSubmit={handleSubmit}>
				<Form.Group className="d-flex justify-content-start align-items-center mt-3" controlId="status">
					<Form.Label className="fw-bold mx-2">Status: </Form.Label>
					<Form.Select className="w-auto" onChange={e => handleStatus(e.target.value)}>
						<option value={status}>{status}</option>
						{unselectedStatuses.map(statusName => (<option key={shortid()} value={statusName}>{statusName}</option>))}
					</Form.Select>
				</Form.Group>
				<Form.Group className="d-flex justify-content-start align-items-center mt-3" controlId="peopleAmount">
					<Form.Label className="fw-bold mx-2">People: </Form.Label>
					<div className={styles.numberInput}>
						<Form.Control type="text" value={peopleAmount} onChange={e => handlePeopleAmount(parseInt(e.target.value))} />
					</div>
					<p className="mx-2 mt-3">/</p>
					<div className={styles.numberInput}>
						<Form.Control type="text" value={maxPeopleAmount} onChange={e => handleMaxPeopleAmount(parseInt(e.target.value))} />
					</div>
				</Form.Group>
				{status === "Busy" && (
					<Form.Group controlId="bill" className="d-flex justify-content-start align-items-center mt-2">
						<Form.Label className="fw-bold mx-2">Bill: </Form.Label>
						<p className="mt-2 mx-2">$</p>
						<div className={styles.numberInput}>
							<Form.Control type="text" value={bill} onChange={e => setBill(e.target.value)} />
						</div>
					</Form.Group> 
				)}
				<Button variant="primary" type="submit" className="mt-4">Update</Button>
			</Form>
		</>
	);
};

export default TableForm;
