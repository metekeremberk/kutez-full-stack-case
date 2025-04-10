import { Product } from "@/types/product";
import { useState } from "react";
import StarRating from "./StarRating";

export default function ProductItem({ product }: { product: Product }) {
	const [selectedColor, setSelectedColor] = useState<"yellow" | "rose" | "white">("yellow");

	const colors = {
		"yellow": "Yellow Gold",
		"rose": "Rose Gold",
		"white": "White Gold",
	};

	return (
		<div className="p-5 w-[290px]">
			<div className="">
				<img
					src={product.images[selectedColor]}
					alt={`${product.name} in ${selectedColor} gold`}
					className="w-[250px] h-[250px] object-cover rounded-xl"
				/>
			</div>

			<div className="py-4 space-y-1">
				<p className="font-montserrat font-semibold text-[15px]">{product.name}</p>
				<p className="font-montserrat font-normal text-[15px]">${product.price} USD</p>
			</div>

			<div className="space-y-2">
				<div className="grid grid-cols-3 w-fit gap-1">
					<div
						className={`${
							selectedColor === "yellow" ? "outline rounded-full" : ""
						} rounded-full aspect-square w-7 p-1 flex justify-center items-center`}
					>
						<button
							onClick={() => setSelectedColor("yellow")}
							className="rounded-full aspect-square w-full bg-[#e6ca97] hover:cursor-pointer"
						/>
					</div>

					<div
						className={`${
							selectedColor === "white" ? "outline rounded-full" : ""
						} rounded-full aspect-square w-7 p-1 flex justify-center items-center`}
					>
						<button
							onClick={() => setSelectedColor("white")}
							className="rounded-full aspect-square w-5 bg-[#d9d9d9] hover:cursor-pointer"
						/>
					</div>

					<div
						className={`${
							selectedColor === "rose" ? "outline rounded-full" : ""
						} rounded-full aspect-square w-7 p-1 flex justify-center items-center`}
					>
						<button
							onClick={() => setSelectedColor("rose")}
							className="rounded-full aspect-square w-5 bg-[#e1a1a9] hover:cursor-pointer"
						/>
					</div>
				</div>
				<p className="font-avenir text-[12px]">{colors[selectedColor]}</p>
			</div>

			<div className="pt-2">
				<StarRating rating={product.popularityScore * 5} />
			</div>
		</div>
	);
}
