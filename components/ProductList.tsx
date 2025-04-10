"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductItem from "./ProductItem";
import ResponsiveCarousel from "./ResponsiveCarousel";

export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch("/api/products");

				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}

				const data = await response.json();
				setProducts(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, []);

	if (loading) return <div className="flex h-64 items-center justify-center">Loading...</div>;
	if (error) return <div className="flex h-64 items-center justify-center text-red-500">Error: {error}</div>;
	if (!products.length) return <div className="flex h-64 items-center justify-center">No products found</div>;

	return (
		<div className="container mx-auto px-4">
			<div className="flex items-center justify-center pt-10 pb-8 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16">
				<h1 className="font-avenir text-3xl sm:text-4xl md:text-[45px]">Products List</h1>
			</div>

			<div className="">
				<ResponsiveCarousel>
					{products.map((product, i) => (
						<div key={i} className="h-full">
							<ProductItem product={product} />
						</div>
					))}
				</ResponsiveCarousel>
			</div>
		</div>
	);
}
