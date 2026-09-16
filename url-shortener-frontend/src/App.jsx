import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/shorten', {
        originalUrl
      });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      if (err.response && err.response.status === 429) {
        setError('Rate limit exceeded: You are making too many requests. Please wait a minute.');
      } else {
        setError('Failed to shorten URL. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <p>Enter a long URL to generate a fast, cached, and rate-limited short link.</p>
      
      <form onSubmit={handleSubmit} className="form">
        <input
          type="url"
          placeholder="https://example.com"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          className="input"
        />
        <button type="submit" disabled={loading} className="button">
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {shortUrl && (
        <div className="result">
          <p>Your short URL is ready:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;