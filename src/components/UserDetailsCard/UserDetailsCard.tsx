import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export interface UserDetailsCardProps {
  name: string;
  login: string;
  avatar: string;
  username?: string;
  bio: string | null;
  followers: number;
  following: number;
  email: string | null;
}

export function UserDetailsCard({
  name,
  login,
  avatar,
  username,
  bio,
  followers,
  following,
  email,
}: UserDetailsCardProps) {
  return (
    <>
      <Card className="mt-8 w-full max-w-lg">
        <CardHeader>
          <div className="flex">
            <Image
              src={avatar}
              alt={`Avatar of ${username}`}
              width={80}
              height={80}
              className="rounded-full"
            />
            <CardTitle className="flex flex-col items-start ml-3 mt-2">
              {name}
              <CardDescription className="flex flex-col items-start gap-1 font-light">
                <p>{`@${login}` || "Unknown User"}</p>
                <p>{bio || "No bio available"}</p>
              </CardDescription>
            </CardTitle>
          </div>

          <CardDescription className="mt-2">
            <p>
              <strong className="text-slate-900">Followers:</strong> {followers}
            </p>
            <p>
              <strong className="text-slate-900">Following:</strong> {following}
            </p>
            <p>
              <strong className="text-slate-900">Email:</strong>{" "}
              {email || "Not provided"}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
