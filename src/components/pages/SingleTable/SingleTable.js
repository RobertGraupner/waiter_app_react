import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getTableId } from "../../../Redux/tablesRedux";


const SingleTable = () => {
	const { id } = useParams();
	const table = useSelector(state => getTableId(state, parseInt(id)));

	return <h1>{table.id}</h1>;
};

export default SingleTable;
