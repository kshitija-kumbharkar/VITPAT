import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Planner from "./components/Planner/planner";
import Leaderboard from "./components/Leaderboard/leaderboard";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/planner" exact element={<Planner />} />
			<Route path="/leader" exact element={<Leaderboard />} />

			<Route path="/" element={<Navigate replace to="/login" />} 
			/>
		</Routes>
	);
}

export default App;
