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
			purpleDark: '#3700B3',
		},
		extend: {},
	},
	plugins: [],
};
export default config;
