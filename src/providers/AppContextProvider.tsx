import { UserDetailsCardProps } from "@/components/UserDetailsCard/UserDetailsCard";
import { Repo } from "@/types/repos.types";
import { createContext, useEffect, useReducer } from "react";

interface State {
  loading: boolean;
  user: UserDetailsCardProps | null;
  repos: Repo[];
  repoDetails: object;
}

type Action =
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_USER"; value: UserDetailsCardProps | null }
  | { type: "SET_USER_REPOS"; value: Repo[] }
  | { type: "SET_USER_REPO_DETAILS"; value: object };

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Estado inicial
const initialState: State = {
  loading: false,
  user: null,
  repos: [],
  repoDetails: {},
};

// O contexto inicial
const store = createContext<ContextType | undefined>(undefined); // Permite undefined
const { Provider } = store;

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    (currentState: State, action: Action): State => {
      switch (action.type) {
        case "SET_LOADING":
          return { ...currentState, loading: action.value };
        case "SET_USER":
          return { ...currentState, user: action.value };
        case "SET_USER_REPOS":
          return { ...currentState, repos: action.value };
        case "SET_USER_REPO_DETAILS":
          return { ...currentState, repoDetails: action.value };
        default:
          return currentState;
      }
    },
    initialState
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("gitHubRepoUserData");
    if (storedUser) {
      dispatch({ type: "SET_USER", value: JSON.parse(storedUser) });
    }
  }, []);

  useEffect(() => {
    const storedUserRepos = localStorage.getItem("gitHubRepoUserReposData");
    if (storedUserRepos) {
      dispatch({ type: "SET_USER_REPOS", value: JSON.parse(storedUserRepos) });
    }
  }, []);

  useEffect(() => {
    const storedUserRepoDetails = localStorage.getItem(
      "gitHubRepoUserRepoDetailsData"
    );
    if (storedUserRepoDetails) {
      dispatch({
        type: "SET_USER_REPO_DETAILS",
        value: JSON.parse(storedUserRepoDetails),
      });
    }
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppContextProvider };
