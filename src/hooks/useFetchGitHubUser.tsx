import { useState } from "react";

type GitHubUser = {
  avatar: string;
  followers: number;
  following: number;
  email: string;
  bio: string;
};

type UseFetchGitHubUserReturn = {
  userData: GitHubUser | null;
  error: string;
  isLoading: boolean;
  fetchGitHubUser: (username: string) => Promise<void>;
};

export function useFetchGitHubUser(): UseFetchGitHubUserReturn {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGitHubUser = async (username: string): Promise<void> => {
    setError("");
    setUserData(null);

    if (!username) {
      setError("Please provide a GitHub username.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found.");

      const data = await response.json();

      // Extrair apenas os campos relevantes
      const userDetails: GitHubUser = {
        avatar: data.avatar_url,
        followers: data.followers,
        following: data.following,
        email: data.email || "Not provided",
        bio: data.bio || "No bio available",
      };

      setUserData(userDetails);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { userData, error, isLoading, fetchGitHubUser };
}
