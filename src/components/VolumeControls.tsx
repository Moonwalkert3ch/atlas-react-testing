import { useState } from "react";
import Slider from "@mui/material/Slider";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export function VolumeControl() {
  const [volume, setVolume] = useState<number>(50);

  const handleVolumeChange = (newValue: number | number[]) => {
    // Ensure newValue is a number
    if (typeof newValue === 'number') {
      setVolume(newValue);
    }
  };

  return (
    <div className="flex items-center p-2 w-full">
      {/* Volume Icon */}
      <VolumeUpIcon className="mr-2 text-black" />

      {/* Slider Control */}
      <Slider
        value={volume}
        onChange={(event, newValue) => handleVolumeChange(newValue)}
        aria-labelledby="volume-slider"
        min={0}
        max={100} // Set range from 0 to 100
        sx={{
          width: 575,
          color: "#6B7280",
          '& .MuiSlider-thumb': {
            backgroundColor: "#374151",
          },
          '& .MuiSlider-rail': {
            backgroundColor: "#E5E7EB",
          },
          '& .MuiSlider-track': {
            backgroundColor: "#6B7280",
          },
        }}
      />
    </div>
  );
}
