import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { Action, User, userReducer } from "./user";
interface UserContextType {
  state: User;
  dispatch: Dispatch<Action>;
}

// יצירת ה-Context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// יצירת ה-Provider
export function UserProvider({ children }: { children: ReactNode }) {
  const initialState: User = {};
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
      <UserContext.Provider value={{ state, dispatch }}>
          {children}
      </UserContext.Provider>
  );
}
