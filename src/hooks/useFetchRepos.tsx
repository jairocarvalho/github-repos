import { Repo } from "@/types/repos.types";
import { useState } from "react";

// Formato do objeto retornado pelo hook
export interface UseFetchReposReturn {
  repos: Repo[];
  error: string;
  isLoading: boolean;
  fetchRepos: (username: string) => Promise<void>;
}

export function useFetchRepos(): UseFetchReposReturn {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRepos = async (username: string): Promise<void> => {
    setError("");
    setRepos([]);
    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!response.ok) throw new Error("User not found.");

      const data: Repo[] = await response.json();

      // Ordenar por número de estrelas (decrescente)
      const sortedRepos = data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      setRepos(sortedRepos);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { repos, error, isLoading, fetchRepos };
}
