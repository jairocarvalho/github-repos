import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchBarProps {
  username: string;
  setUsername: (value: string) => void;
  onSearch: (searchUsername: string) => void;
  isLoading: boolean;
}

export function SearchBar({
  username,
  setUsername,
  onSearch,
  isLoading,
}: SearchBarProps) {
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
