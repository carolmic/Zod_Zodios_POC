import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			standard: '#ededed',
			transparent: 'transparent',
			white: '#FFFFFF',
			purple: '#BB86FC',
			black: '#000000',
			darkerPurple: '#9c51f8',
		},
		extend: {},
	},
	plugins: [],
};
export default config;
