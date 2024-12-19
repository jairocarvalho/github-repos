import { useState } from "react";
import { useAppContext } from "./useAppContext";
import { UserDetailsCardProps } from "@/components/UserDetailsCard/UserDetailsCard";

type UseFetchGitHubUserReturn = {
  userData: UserDetailsCardProps | null;
  error: string;
  isLoading: boolean;
  fetchGitHubUser: (username: string) => Promise<void>;
};

export function useFetchGitHubUser(): UseFetchGitHubUserReturn {
  const [userData, setUserData] = useState<UserDetailsCardProps | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context = useAppContext();
  const { dispatch } = context;

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

      const userDetails: UserDetailsCardProps = {
        name: data.name,
        login: data.login,
        avatar: data.avatar_url,
        followers: data.followers,
        following: data.following,
        email: data.email || "Not provided",
        bio: data.bio || "No bio available",
      };

      // Salva no localStorage
      localStorage.setItem("gitHubRepoUserData", JSON.stringify(userDetails));

      dispatch({ type: "SET_USER", value: userDetails });

      setUserData(userDetails);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { userData, error, isLoading, fetchGitHubUser };
}
