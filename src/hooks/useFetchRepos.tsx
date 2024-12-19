import { Repo } from "@/types/repos.types";
import { useState } from "react";
import { useAppContext } from "./useAppContext";

export interface UseFetchReposReturn {
  searchError: string;
  fetchRepos: (username: string) => Promise<void>;
}

export function useFetchRepos(): UseFetchReposReturn {
  const [searchError, setSearchError] = useState<string>("");

  const context = useAppContext();
  const { dispatch } = context;

  const fetchRepos = async (username: string): Promise<void> => {
    setSearchError("");
    if (!username) {
      setSearchError("Insira um nome de usuário do GitHub.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );

      if (!response.ok) throw new Error("User not found.");

      const data: Repo[] = await response.json();

      const sortedRepos = data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );

      // Salva no localStorage
      localStorage.setItem(
        "gitHubRepoUserReposData",
        JSON.stringify(sortedRepos)
      );

      dispatch({ type: "SET_USER_REPOS", value: sortedRepos });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSearchError(err.message);
      } else {
        setSearchError("An unexpected error occurred.");
      }
    }
  };

  return { searchError, fetchRepos };
}
