import RegisterForm from "@/components/registerForm";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Zodios</h1>
      <p>
        This is a proof of concept for using Zod to validate forms in a Next.js app.
      </p>
      <RegisterForm />
    </div>
  );
}