import React, { createContext, useState } from 'react';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  const addBookmark = (movie) => {
    setBookmarkedMovies((prev) => [...prev, movie]);
  };

  const removeBookmark = (movieId) => {
    setBookmarkedMovies((prev) => prev.filter(movie => movie.id !== movieId));
  };

  return (
    <BookmarksContext.Provider value={{ bookmarkedMovies, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
};
