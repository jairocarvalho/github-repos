import { useState } from "react";
import { useAppContext } from "./useAppContext";

type RepoDetail = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  forks_count: number;
};

type UseFetchGitHubRepoReturn = {
  repoData: RepoDetail | null;
  error: string;
  isLoading: boolean;
  fetchRepoDetail: (username: string) => Promise<void>;
};

export function useFetchRepoDetail(): UseFetchGitHubRepoReturn {
  const [repoData, setRepoData] = useState<RepoDetail | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context = useAppContext();
  const { dispatch } = context;

  const fetchRepoDetail = async (repo: string): Promise<void> => {
    setError("");
    setRepoData(null);

    if (!repo) {
      setError("Please provide a GitHub repository.");
      return;
    }

    const user = localStorage.getItem("gitHubRepoUserData") ?? "";
    const userStored = JSON.parse(user);

    try {
      setIsLoading(true);

      const response = await fetch(
        `https://api.github.com/repos/${userStored.login}/${repo}`
      );

      if (!response.ok) throw new Error("User not found.");

      const data = await response.json();

      const repoDetails: RepoDetail = {
        id: data.id,
        name: data.name,
        description: data.description,
        stargazers_count: data.stargazers_count,
        language: data.language,
        html_url: data.html_url,
        forks_count: data.forks_count,
      };

      // Salva no localStorage
      localStorage.setItem(
        "gitHubRepoUserRepoDetailsData",
        JSON.stringify(repoDetails)
      );

      dispatch({ type: "SET_USER_REPO_DETAILS", value: repoDetails });

      setRepoData(repoDetails);
    } catch (err: unknown) {
      // Verifica se o erro é uma instância de Error
      if (err instanceof Error) {
        console.error(err.message || "Erro ao buscar dados do GitHub");
      } else {
        console.error("Erro desconhecido", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { repoData, error, isLoading, fetchRepoDetail };
}
