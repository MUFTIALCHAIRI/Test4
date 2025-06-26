import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './layouts/navbar/header';
import Footer from './layouts/navbar/footer';
import { Homepage } from './pages/Homepage';
import Dashboard from './components/dashboard/Dashboard';
import { AUTH_TOKEN_KEY } from '@/constant';

// Protected Route Component
const ProtectedRoute = ({ token, children }: { token: string; children: React.ReactNode }) => {
	if (!token) {
		return <Navigate to='/' replace />;
	}
	return <>{children}</>;
};

function App() {
	const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY) || '');

	// Update token when it changes
	useEffect(() => {
		if (token) {
			localStorage.setItem(AUTH_TOKEN_KEY, token);
		} else {
			localStorage.removeItem(AUTH_TOKEN_KEY);
		}
	}, [token]);

	return (
		<Router>
			<div className='min-h-screen flex flex-col'>
				<Header setToken={setToken} />
				<main className='flex-1'>
					<Routes>
						<Route path='/' element={<Homepage />} />
						<Route
							path='/dashboard'
							element={
								<ProtectedRoute token={token}>
									<Dashboard token={token} />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
