import Image from "next/image";

interface UserDetailsCardProps {
  avatar: string;
  username: string;
  bio: string | null;
  followers: number;
  following: number;
  email: string | null;
}

export function UserDetailsCard({
  avatar,
  username,
  bio,
  followers,
  following,
  email,
}: UserDetailsCardProps) {
  return (
    <div className="mt-8 w-full max-w-md bg-white p-5 rounded shadow">
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt={`Avatar of ${username}`}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <p className="text-xl font-bold">{username || "Unknown User"}</p>
          <p className="text-gray-600">{bio || "No bio available"}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>
          <strong>Followers:</strong> {followers}
        </p>
        <p>
          <strong>Following:</strong> {following}
        </p>
        <p>
          <strong>Email:</strong> {email || "Not provided"}
        </p>
      </div>
    </div>
  );
}
