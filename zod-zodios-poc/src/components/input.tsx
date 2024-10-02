interface InputProps {
	placeholder: string;
	type: "text" | "email" | "password";
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
	return (
		<input
			className="w-full border border-purple focus:border-2 focus:border-white active:border-2 active:border-white rounded-3xl p-1 pl-2 bg-transparent placeholder-standard outline-none transition duration-200"
			placeholder={props.placeholder}
			type={props.type}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}
