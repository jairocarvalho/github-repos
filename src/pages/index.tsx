import RepoList from "@/components/RepoList";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { UserDetailsCard } from "@/components/UserDetailsCard/UserDetailsCard";
import { useFetchGitHubUser } from "@/hooks/useFetchGitHubUser";
import { useFetchRepos } from "@/hooks/useFetchRepos";
import { Github } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const { repos, searchError, isSearchLoading, fetchRepos } = useFetchRepos();
  const { userData, error, fetchGitHubUser } = useFetchGitHubUser();
  const [username, setUsername] = useState("");

  const handleSearch = async (searchUsername: string) => {
    setUsername("");
    await fetchGitHubUser(searchUsername);

    if (!error) {
      setUsername(searchUsername);
      await fetchRepos(searchUsername);
    }
  };

  return (
    <>
      <Head>
        <title>GitHub Repositórios</title>
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
        <header className="flex items-center gap-2 text-3xl font-bold mb-5">
          <Github />
          GitHub Repositórios
        </header>

        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={handleSearch}
          isLoading={isSearchLoading}
        />

        {searchError && <p className="text-red-500 mt-3">{searchError}</p>}

        {userData && (
          <UserDetailsCard
            avatar={userData.avatar}
            username={username}
            bio={userData.bio}
            followers={userData.followers}
            following={userData.following}
            email={userData.email}
          />
        )}

        <div className="mt-8 w-full max-w-2xl">
          <RepoList repos={repos} />
        </div>
      </div>
    </>
  );
}
