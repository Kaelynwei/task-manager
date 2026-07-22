import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Used for registration
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');

    // Dynamic port switching: fallback to 4000 on local dev, use 8000 inside Docker
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    const url = isRegister 
      ? `${baseURL}/api/v1/auth/register` 
      : `${baseURL}/api/v1/auth/login`;

    const bodyData = isRegister 
      ? { email, username, password } 
      : { email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Authentication failed');
      }

      if (isRegister) {
        alert('Registration successful! Please log in.');
        setIsRegister(false);
      } else {
        // 💡 Fully verified token assignment from your backend response
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          onLoginSuccess(); // Smoothly transition to HomePage
        } else {
          setError('Invalid token received from server.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h2>{isRegister ? 'Create an Account' : 'Sign In'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email: </label>
          <input type="email" value={email} onChange={e => setEmail((e.target as HTMLInputElement).value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        {isRegister && (
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username: </label>
            <input type="text" value={username} onChange={e => setUsername((e.target as HTMLInputElement).value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
        )}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password: </label>
          <input type="password" value={password} onChange={e => setPassword((e.target as HTMLInputElement).value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#007bff' }} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
      </p>
    </div>
  );
};