import React, { useState, useEffect } from "react";
import { Repo } from "@/types/repos.types";
import RepoCard from "../RepoCard";
import { Button } from "../ui/button";
import { ArrowDownUp } from "lucide-react";

export interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  const [displayedRepos, setDisplayedRepos] = useState<Repo[]>([]);

  useEffect(() => {
    setDisplayedRepos(repos);
  }, [repos]);

  const reverseArray = () => {
    setDisplayedRepos((prevRepos) => [...prevRepos].reverse());
  };

  if (repos.length === 0) return null;

  return (
    <div className="flex flex-1 flex-col items-center">
      <Button onClick={reverseArray} variant="ghost" className="mb-1">
        <ArrowDownUp /> Alterar ordem da lista
      </Button>
      <ul className="w-full space-y-4">
        {displayedRepos.map((repo) => (
          <li key={repo.id}>
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
