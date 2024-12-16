import RepoList from "@/components/RepoList";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useFetchRepos } from "@/hooks/useFetchRepos";
import { Github } from "lucide-react";
import Head from "next/head";

export default function Home() {
  const { repos, error, isLoading, fetchRepos } = useFetchRepos();

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

        <SearchBar onSearch={fetchRepos} isLoading={isLoading} />

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <div className="mt-8 w-full max-w-2xl">
          <RepoList repos={repos} />
        </div>
      </div>
    </>
  );
}
