interface UserProps {
  name: string;
  email: string;
}
export default function User(props: UserProps) {
  return (
    <div className="w-auto flex flex-col gap-2 justify-center items-start border-purple border-2 rounded-3xl p-4">
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  )
}