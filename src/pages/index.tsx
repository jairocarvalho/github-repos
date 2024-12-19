import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Github } from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/usuario/${username}`);
  };

  return (
    <>
      <Head>
        <title>GitHub busca de Repositórios</title>
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
      </div>
    </>
  );
}
