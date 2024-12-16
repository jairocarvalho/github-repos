import { Repo } from "@/types/repos.types";
import RepoCard from "../RepoCard";

export interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  if (repos.length === 0) return null;

  return (
    <ul className="space-y-4">
      {repos.map((repo) => (
        <li key={repo.id}>
          <RepoCard repo={repo} />
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
