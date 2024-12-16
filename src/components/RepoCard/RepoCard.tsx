import { Star } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { RepoCardProps } from "@/types/repos.types";

function RepoCard({ repo }: RepoCardProps) {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            {repo.name}
            <CardDescription className="flex items-center gap-1 font-light">
              <Star className="h-4 w-4 mt-[1px]" />
              {repo.stargazers_count}
            </CardDescription>
          </CardTitle>
          <CardDescription className="mt-2">
            <p>{repo.description || "No description available."}</p>
            <p className="text-sm text-gray-600">
              Language: {repo.language || "Not specified"}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
}

export default RepoCard;
