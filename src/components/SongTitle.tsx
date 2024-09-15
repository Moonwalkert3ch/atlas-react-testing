// Define the type for props
interface SongTitleProps {
  title: string;
  artist: string;
}

// Define the functional component with typed props
export function SongTitle({ title, artist }: SongTitleProps) {
  return (
    <div className="flex flex-col justify-center p-4">
      <h2 className="text-4xl font-bold">{title}</h2>
      <h3 className="text-lg font-bold text-gray-500">{artist}</h3>
    </div>
  );
}