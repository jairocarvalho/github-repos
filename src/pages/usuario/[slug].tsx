import RepoList from "@/components/RepoList";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { UserDetailsCard } from "@/components/UserDetailsCard/UserDetailsCard";
import { useAppContext } from "@/hooks/useAppContext";
import { useFetchGitHubUser } from "@/hooks/useFetchGitHubUser";
import { useFetchRepos } from "@/hooks/useFetchRepos";
import { Github } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UserPageProps {
  slug: string;
}

export default function UserPage({ slug }: UserPageProps) {
  const router = useRouter();
  const { state } = useAppContext();
  const { searchError, fetchRepos } = useFetchRepos();
  const { fetchGitHubUser } = useFetchGitHubUser();
  const [username, setUsername] = useState("");
  const { user } = state;

  useEffect(() => {
    if (!slug) return;

    const handleFetchUserData = async () => {
      try {
        if (!state.user || state.user.login !== slug) {
          // Busca os dados do usuário apenas se não existirem ou se o slug for diferente
          await fetchGitHubUser(slug);
        }
        if (!state.repos || state.user?.login !== slug) {
          // Busca os repositórios apenas se não existirem ou se o usuário mudou
          await fetchRepos(slug);
        }
      } catch (err: unknown) {
        console.error("Erro ao buscar dados do GitHub", err);
      }
    };

    handleFetchUserData();
  }, [slug, state.user, state.repos]);

  const handleSearch = async () => {
    setUsername("");
    router.push(`/usuario/${username}`);
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
        />

        {searchError && <p className="text-red-500 mt-3">{searchError}</p>}

        {user && (
          <UserDetailsCard
            name={user.name}
            login={user.login}
            avatar={user.avatar}
            username={username}
            bio={user.bio}
            followers={user.followers}
            following={user.following}
            email={user.email}
          />
        )}

        <div className="mt-8 w-full max-w-2xl">
          <RepoList repos={state.repos} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: {
  params: { slug: string };
}) {
  const { slug } = context.params;
  return {
    props: { slug },
  };
}
