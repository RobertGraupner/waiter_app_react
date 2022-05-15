import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { fetchTables } from "./Redux/tablesRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleTable from "./components/pages/SingleTable/SingleTable";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";

const App = () => {

	const dispatch = useDispatch();
	useEffect(() => dispatch(fetchTables()), [dispatch]);

	return (
		<Container>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/table/:id" element={<SingleTable />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</Container>
	);
};

export default App;
