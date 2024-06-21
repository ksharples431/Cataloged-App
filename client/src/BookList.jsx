import { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/books');
        if (!response.ok) {
          throw new Error(`Error fetching books: ${response.statusText}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading books...</p>}
      {error && <p>Error: {error}</p>}
      {books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
      {books.length === 0 && !isLoading && <p>No books found.</p>}
    </div>
  );
};

export default BookList;
