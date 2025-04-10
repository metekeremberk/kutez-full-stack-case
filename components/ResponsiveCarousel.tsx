"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ResponsiveCarouselProps {
	children: React.ReactNode;
}

export default function ResponsiveCarousel({ children }: ResponsiveCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [itemsPerView, setItemsPerView] = useState(4);
	const totalItems = React.Children.count(children);
	const [maxIndex, setMaxIndex] = useState(Math.max(0, totalItems - itemsPerView));
	const carouselRef = useRef<HTMLDivElement>(null);

	const [startX, setStartX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [dragDistance, setDragDistance] = useState(0);
	const itemWidthPercentage = 100 / itemsPerView;

	useEffect(() => {
		function handleResize() {
			let newItemsPerView;
			if (window.innerWidth < 640) {
				newItemsPerView = 1;
			} else if (window.innerWidth < 1024) {
				newItemsPerView = 2;
			} else if (window.innerWidth < 1280) {
				newItemsPerView = 3;
			} else {
				newItemsPerView = 4;
			}

			setItemsPerView(newItemsPerView);
			setMaxIndex(Math.max(0, totalItems - newItemsPerView));

			if (currentIndex > Math.max(0, totalItems - newItemsPerView)) {
				setCurrentIndex(Math.max(0, totalItems - newItemsPerView));
			}
		}

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [totalItems, currentIndex]);

	const navigateTo = (index: number) => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
	};

	const handlePrev = () => {
		navigateTo(currentIndex - 1);
	};

	const handleNext = () => {
		navigateTo(currentIndex + 1);
	};

	const handleTransitionEnd = () => {
		setIsAnimating(false);
	};

	useEffect(() => {
		const carousel = carouselRef.current;
		if (carousel) {
			carousel.addEventListener("transitionend", handleTransitionEnd);
			return () => {
				carousel.removeEventListener("transitionend", handleTransitionEnd);
			};
		}
	}, []);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		setStartX(clientX);
		setIsDragging(true);
		setDragDistance(0);
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;

		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const diff = clientX - startX;
		setDragDistance(diff);

		if (Math.abs(diff) > 5) {
			e.preventDefault();
		}
	};

	const handleTouchEnd = () => {
		if (!isDragging) return;

		setIsDragging(false);

		const swipeThreshold = 80;

		if (dragDistance > swipeThreshold && currentIndex > 0) {
			handlePrev();
		} else if (dragDistance < -swipeThreshold && currentIndex < maxIndex) {
			handleNext();
		}

		setDragDistance(0);
	};

	const getTransformValue = () => {
		const baseTransform = currentIndex * itemWidthPercentage;

		if (isDragging && carouselRef.current) {
			const containerWidth = carouselRef.current.offsetWidth;
			const dragPercentage = (dragDistance / containerWidth) * 100;

			const newTransform = baseTransform - dragPercentage;
			if (newTransform < 0) return 0;
			if (newTransform > maxIndex * itemWidthPercentage) return maxIndex * itemWidthPercentage;

			return newTransform;
		}

		return baseTransform;
	};

	return (
		<div className="flex w-full items-center">
			<button
				onClick={handlePrev}
				disabled={currentIndex === 0}
				className={`z-10 flex p-2 items-center justify-center rounded-full bg-white shadow-md transition-opacity ${
					currentIndex === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100"
				}`}
				aria-label="Previous items"
			>
				<ChevronLeft size={24} />
			</button>

			<div
				className="overflow-hidden"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseDown={handleTouchStart}
				onMouseMove={handleTouchMove}
				onMouseUp={handleTouchEnd}
				onMouseLeave={handleTouchEnd}
			>
				<div
					ref={carouselRef}
					className={`flex justify-between ${!isDragging ? "transition-transform duration-300 ease-in-out" : ""}`}
					style={{
						transform: `translateX(-${getTransformValue()}%)`,
						cursor: isDragging ? "grabbing" : "grab",
					}}
				>
					{React.Children.map(children, (child, index) => (
						<div
							style={{ width: `${itemWidthPercentage}%` }}
							className="flex-shrink-0 px-2 flex items-center justify-center"
							key={index}
						>
							{child}
						</div>
					))}
				</div>
			</div>

			<button
				onClick={handleNext}
				disabled={currentIndex >= maxIndex}
				className={`z-10 flex p-2 items-center justify-center rounded-full bg-white shadow-md transition-opacity ${
					currentIndex >= maxIndex ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100"
				}`}
				aria-label="Next items"
			>
				<ChevronRight size={24} />
			</button>
		</div>
	);
}
