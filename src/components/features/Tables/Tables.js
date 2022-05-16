import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllTables } from "../../../Redux/tablesRedux";
import { Link } from "react-router-dom";
import SpinnerAnimation from "../../common/SpinnerAnimation";

const Tables = () => {
  const tables = useSelector(getAllTables);

	return (
		<>
			<div className="d-flex justify-content-between">
				<h2>All tables</h2>
				{/*jesli nie będzie wczytanych stolików z serwera to włączy się spinner  */}
				{tables.length === 0 && <SpinnerAnimation />}
			</div>
			{tables.map(table => (
				<div key={table.id} className="d-flex border-bottom align-items-center">
					<h3 className="m-0">Table {table.id}</h3>
					<p className="ps-4 m-0"><span className="fw-bold">Status: </span>{table.status}</p>
					<Link className="ms-auto p-2" to={`/table/${table.id}`}>
						<Button variant="primary">Show more</Button>
					</Link>
				</div>
			))}
		</>
	);
};

export default Tables;
