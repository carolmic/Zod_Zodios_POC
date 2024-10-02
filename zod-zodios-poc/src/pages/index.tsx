export default function Home() {
  return (
    <form>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={''}
          onChange={() => {}}
        /> 
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={''}
          onChange={() => {}}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={''}
          onChange={() => {}}
        />
      </div>
      <div>
        <label>Confirm password: </label>
        <input
          type="password"
          value={''}
          onChange={() => {}}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
