import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const login = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(null);
      }
      setLoading(false);
    });
    return () => login();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        usuario,
        loading,
        search,
        setSearch,
        query,
        setQuery,
        page,
        setPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
