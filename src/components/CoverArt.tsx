
// Define types for the CoverArt props
interface CoverArtProps {
  cover: string;
}

export function CoverArt({ cover }: CoverArtProps) {
  return (
    <div className="flex flex-col">
      <img src={cover} alt="Cover Art" className="w-96 h-96 object-cover" />
    </div>
  );
}
