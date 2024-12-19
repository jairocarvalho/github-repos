import RepoCardDetail from "@/components/RepoCardDetail";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { UserDetailsCard } from "@/components/UserDetailsCard/UserDetailsCard";
import { useAppContext } from "@/hooks/useAppContext";
import { useFetchRepoDetail } from "@/hooks/useFetchRepoDetail";
import { ArrowLeft, Github } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface RepoDetailPageProps {
  slug: string;
}

export default function RepoDetailPage({ slug }: RepoDetailPageProps) {
  const [username, setUsername] = useState("");
  const { error, repoData, fetchRepoDetail } = useFetchRepoDetail();
  const router = useRouter();

  const { state, dispatch } = useAppContext();
  const { user } = state;

  useEffect(() => {
    if (!slug) return;
    if (!user) {
      router.back();
    }
    const handlefetchRepoDetail = async () => {
      try {
        await fetchRepoDetail(slug);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message || "Erro ao buscar dados do GitHub");
        } else {
          console.error("Erro desconhecido", err);
        }
      }
    };
    handlefetchRepoDetail();
  }, [slug]);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("gitHubRepoUserData");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch({ type: "SET_USER", value: parsedUser });
      } else {
        router.back();
      }
    }
  }, [user]);

  const handleSearch = async () => {
    setUsername("");
    router.push(`/usuario/${username}`);
  };

  const goBack = () => {
    router.back();
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

        {error && <p className="text-red-500 mt-3">{error}</p>}

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

        <div className="flex flex-col mt-8 w-full max-w-2xl items-center">
          <Button onClick={goBack} variant="ghost" className="mb-1">
            <ArrowLeft /> Voltar
          </Button>
          {repoData && <RepoCardDetail repo={repoData} />}
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
