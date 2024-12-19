import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchBarProps {
  username: string;
  setUsername: (value: string) => void;
  onSearch: (searchUsername: string) => void;
}

export function SearchBar({ username, setUsername, onSearch }: SearchBarProps) {
  const handleSearch = () => {
    onSearch(username);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-lg">
      <Input
        type="text"
        placeholder="Digite o usuário GitHub"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-white"
      />
      <Button onClick={handleSearch}>{"Buscar"}</Button>
    </div>
  );
}
