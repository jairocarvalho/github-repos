import { Repo } from "@/types/repos.types";
import { useState } from "react";

export interface UseFetchReposReturn {
  repos: Repo[];
  searchError: string;
  isSearchLoading: boolean;
  fetchRepos: (username: string) => Promise<void>;
}

export function useFetchRepos(): UseFetchReposReturn {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [searchError, setSearchError] = useState<string>("");
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  const fetchRepos = async (username: string): Promise<void> => {
    setSearchError("");
    setRepos([]);
    if (!username) {
      setSearchError("Please enter a GitHub username.");
      return;
    }

    try {
      setIsSearchLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!response.ok) throw new Error("User not found.");

      const data: Repo[] = await response.json();

      const sortedRepos = data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      setRepos(sortedRepos);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSearchError(err.message);
      } else {
        setSearchError("An unexpected error occurred.");
      }
    } finally {
      setIsSearchLoading(false);
    }
  };

  return { repos, searchError, isSearchLoading, fetchRepos };
}
