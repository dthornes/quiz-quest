import Image from "next/image";

type RibbonProps = {
	podiumImage: "first-place" | "second-place" | "third-place";
};

const Ribbon = ({ podiumImage }: RibbonProps) => {
	return (
		<div className="relative w-[415px] h-[200px]">
			<svg
				className="absolute"
				width="415"
				height="131"
				viewBox="0 0 240 76"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_2702_31773)">
					<path
						d="M164.118 -6.63381e-06C189.766 2.26403 215.159 6.72437 240 13.3291C233.65 19.2084 227.515 25.2094 221.595 31.3323C223.972 39.5474 226.104 47.77 227.991 56C205.732 50.087 182.98 46.0957 160 44.0724L164.118 -6.63381e-06Z"
						fill="#bd5c0d"
					></path>
					<path
						d="M160 40C160 40 175.844 27.6083 200 20L164.088 -6.47739e-06L160 40Z"
						fill="#8b440b"
					></path>
					<path
						d="M75.8819 6.63381e-06C50.2338 2.26404 24.8413 6.72437 3.73041e-06 13.3291C6.3497 19.2084 12.4847 25.2094 18.4049 31.3323C16.0276 39.5474 13.8957 47.77 12.0092 56C34.2676 50.0871 57.0195 46.0957 80 44.0724L75.8819 6.63381e-06Z"
						fill="#bd5c0d"
					></path>
					<path
						d="M80 40C80 40 64.1565 27.6083 40 20L75.9121 6.71581e-06L80 40Z"
						fill="#8b440b"
					></path>
				</g>
				<defs>
					<clipPath id="clip0_2702_31773">
						<rect
							width="415"
							height="131"
							fill="white"
							transform="translate(240 56) rotate(-180)"
						></rect>
					</clipPath>
					<filter id="darker">
						<feComponentTransfer>
							<feFuncR type="linear" slope="0.7"></feFuncR>
							<feFuncG type="linear" slope="0.7"></feFuncG>
							<feFuncB type="linear" slope="0.7"></feFuncB>
						</feComponentTransfer>
					</filter>
				</defs>
			</svg>
			<svg
				className="absolute"
				width="415"
				height="131"
				viewBox="0 0 240 76"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip1_2702_31773)">
					<path
						d="M208 67.4871C149.851 78.8376 90.1489 78.8376 32 67.4871L40 20C92.3729 30.2264 147.627 30.2264 200 20C202.943 35.8399 205.089 51.6635 208 67.4871Z"
						fill="#bd5c0d"
					></path>
				</g>
				<defs>
					<clipPath id="clip1_2702_31773">
						<rect
							width="176"
							height="56"
							fill="white"
							transform="translate(32 20)"
						></rect>
					</clipPath>
					<filter id="brighter">
						<feComponentTransfer>
							<feFuncR type="linear" slope="1.2"></feFuncR>
							<feFuncG type="linear" slope="1.2"></feFuncG>
							<feFuncB type="linear" slope="1.2"></feFuncB>
						</feComponentTransfer>
					</filter>
				</defs>
			</svg>
			<div className="absolute top-6 left-[50%] translate-x-[-50%]">
				<Image
					src={`/assets/icons/${podiumImage}.svg`}
					alt="Ranking Icon"
					width={162}
					height={162}
				/>
			</div>
		</div>
	);
};

export default Ribbon;
