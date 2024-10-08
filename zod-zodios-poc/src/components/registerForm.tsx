import { makeApi, Zodios } from "@zodios/core";
import { useState } from "react";
import { z, ZodIssue } from "zod";
import Input from "./input";
import User from "./user";

const schema = z
	.object({
		name: z
			.string()
			.min(3, { message: "Name must be at least 3 characters long" }),
		email: z
			.string()
			.email({ message: "Invalid email" })
			.min(6, { message: "Email must be at least 6 characters long" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters long" }),
		confirmPassword: z.string().min(6),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		// This is the path to the field that will be highlighted
		path: ["confirmPassword"],
	});

const apiSchema = makeApi([
	{
		method: "post",
		path: "/register",
		requestFormat: "json",
		parameters: [
			{
				name: "name",
				type: "Body",
				schema: schema,
			},
		],
		response: z.object({
			message: z.string(),
			user: z.object({
				id: z.number(),
				name: z.string(),
				email: z.string(),
			}),
		}),
	},
]);

const apiClient = new Zodios("/api", apiSchema);

type user = { name: string; email: string; id: number; };

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<ZodIssue[]>();
	const [user, setUser] = useState<user>();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			// This will throw an error if the data is invalid
			const validatedData = schema.parse(formData);
			const response = await apiClient.post("/register", validatedData);
			console.log("Validated data:", validatedData);
			console.log("User registered:", response.user);
			setUser(response.user);
			setErrors([]);
		} catch (error) {
			// If the error is a ZodError, we can get the errors from it
			if (error instanceof z.ZodError) {
				console.log("Error:", error);
				setErrors(error.errors);
			} else {
				console.error("An unexpected error occurred:", error);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-8 w-full justify-center items-center"
		>
			<h1 className="flex justify-center font-bold text-3xl pb-2">Register</h1>
			<div className="flex gap-4 justify-center">
				<Input
					placeholder="Name"
					type="text"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
				{errors &&
					errors.find((error: ZodIssue) => error.path.includes("name"))?.message}
			</div>
			<div className="flex gap-4 justify-center">
				<Input
					placeholder="Email"
					type="email"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				{errors &&
					errors.find((error: ZodIssue) => error.path.includes("email"))?.message}
			</div>
			<div className="flex gap-4 justify-center">
				<Input
					placeholder="Password"
					type="password"
					value={formData.password}
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				/>
				{errors &&
					errors.find((error: ZodIssue) => error.path.includes("password"))?.message}
			</div>
			<div className="flex gap-4 justify-center">
				<Input
					placeholder="Confirm Password"
					type="password"
					value={formData.confirmPassword}
					onChange={(e) =>
						setFormData({ ...formData, confirmPassword: e.target.value })
					}
				/>
				{errors &&
					errors.find((error: ZodIssue) => error.path.includes("confirmPassword"))
						?.message}
			</div>
			<button
				type="submit"
				className="bg-purple text-black p-1 pl-4 pr-4 rounded-3xl hover:bg-darkerPurple hover:text-white"
			>
				Register
			</button>
			{user && (
				<div className="flex flex-col items-center gap-2">
					<h1 className="font-bold">Profile:</h1>
					<User name={user.name} email={user.email} />
				</div>
			)}
		</form>
	);
}
