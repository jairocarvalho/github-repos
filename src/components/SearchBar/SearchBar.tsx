import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void; // Função que busca repositórios
  isLoading: boolean; // Estado de carregamento
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    onSearch(username);
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-lg">
      <Input
        type="text"
        placeholder="Digite o usuário GitHub"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-white"
        disabled={isLoading}
      />
      <Button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Buscando..." : "Buscar"}
      </Button>
    </div>
  );
}
