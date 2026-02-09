import React, { useState, useEffect } from 'react';
import './App.css';
import loaderGif from './spinning-cat-ethel-cat-ezgif.com-gif-maker.gif';
import Valentine from './components/Valentine';

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const t = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(t);
	}, []);

	return (
		<div className="App">
			{loading ? (
				<div className="loader-screen">
					<img src={loaderGif} alt="loading" className="loader-gif" />
				</div>
			) : (
				<Valentine />
			)}
		</div>
	);
}

export default App;
