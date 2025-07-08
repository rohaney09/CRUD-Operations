import React, { useState } from 'react';

const Form = () => {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    setError('');

    const res = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    setUsername('');
    setPassword('');

    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Form submitted');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          Enter your name:
          <input
            type="text"
            value={username}
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />

          Enter Password:
          <input
            type="password"
            value={password}
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Form;
