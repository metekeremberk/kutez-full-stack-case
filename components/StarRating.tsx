import { MdOutlineStarPurple500 } from "react-icons/md";

export default function StarRating({ rating = 0 }: { rating: number }) {
	const normalizedRating = Math.max(0, Math.min(5, rating));

	const renderStars = () => {
		return Array.from({ length: 5 }, (_, index) => {
			let fillPercent = 0;
			if (index + 1 <= normalizedRating) {
				fillPercent = 100;
			} else if (index < normalizedRating) {
				fillPercent = (normalizedRating - index) * 100;
			}

			return (
				<div key={index} className="relative">
					<MdOutlineStarPurple500 className="text-gray-300" size={24} fill="currentColor" />
					<div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
						<MdOutlineStarPurple500 className="text-[#e6ca97]" size={24} fill="currentColor" />
					</div>
				</div>
			);
		});
	};

	return (
		<div className="flex items-center">
			{renderStars()}
			<span className="ml-2 text-[14px] font-avenir font-medium text-gray-600">{normalizedRating.toFixed(1)}/5</span>
		</div>
	);
}
