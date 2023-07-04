import React, { useState, useEffect } from "react";
import DataContext from "./DataContext";
import { auth } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "@firebase/auth";
import { ActivityIndicator } from "react-native";

function DataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  const [currentClass, _setCurrentClass] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    return await signInWithPopup(auth, new GoogleAuthProvider())
      .then((userCred) => {
        setUser(userCred.user);
      })
      .catch((error) => {
        return {
          error: error.message,
        };
      });
  };

  const logout = async () => {
    await signOut(auth).finally(() => {
      setUser(null);
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setCurrentClass = (key) => {
    _setCurrentClass(key);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <DataContext.Provider
      value={{
        user,
        theme,
        currentClass,
        loginWithGoogle,
        logout,
        toggleTheme,
        setCurrentClass,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
