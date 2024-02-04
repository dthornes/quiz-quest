const Loader = () => {
	return (
		<div className="flex-1 flex flex-col justify-center items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="84"
				height="84"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="animate-spin text-white"
			>
				<path d="M21 12a9 9 0 1 1-6.219-8.56" />
			</svg>
			<p className="text-white p-bold-20">Loading...</p>
		</div>
	);
};

export default Loader;
