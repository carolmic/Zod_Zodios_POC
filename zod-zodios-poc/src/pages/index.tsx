import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email' }).min(6, { message: 'Email must be at least 6 characters long' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  // This is the path to the field that will be highlighted
  path: ['confirmPassword'],
})
export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // This will throw an error if the data is invalid
      const validatedData = schema.parse(formData);
      console.log('Validated data:', validatedData);
      setErrors(null);
    } catch (error) {
      // If the error is a ZodError, we can get the errors from it
      if (error instanceof z.ZodError) {
        console.log('Error:', error);
        setErrors(error.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        /> 
        {errors && errors.find((error: any) => error.path.includes('name'))?.message}
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors && errors.find((error: any) => error.path.includes('email'))?.message}
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors && errors.find((error: any) => error.path.includes('password'))?.message}
      </div>
      <div>
        <label>Confirm password: </label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
        {errors && errors.find((error: any) => error.path.includes('confirmPassword'))?.message}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
