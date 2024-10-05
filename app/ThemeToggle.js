// app/ThemeToggle.js
"use client";

import { useState, useEffect } from "react";

const ThemeToggle = () => {
	const [theme, setTheme] = useState("light");

	// 테마 로컬 스토리지에서 불러오기
	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme) {
			setTheme(storedTheme);
			document.documentElement.classList.toggle("dark", storedTheme === "dark");
		}
	}, []);

	// 테마 토글 함수
	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<button onClick={toggleTheme} className="p-2 bg-gray-700 text-white rounded">
			{theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
		</button>
	);
};

export default ThemeToggle;
