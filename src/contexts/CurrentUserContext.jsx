import { useState, createContext } from 'react';

const CurrentUserContext = createContext();

function CurrentUserProvider({ children }) {
  const [currentUserState, setCurrentUserState] = useState('null');

  return (
    <CurrentUserContext.Provider
      value={{ currentUserState, setCurrentUserState }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserContext;
export { CurrentUserProvider };
