import React from "react";
import { fetchGIF, fetchPhotos, fetchVideos } from "./api/mediaApi";
const App = () => {
  return (
    <div className="h-screen w-full bg-gray-900">
      <button
        className="bg-green-400 px-4 py-2 m-5"
        onClick={async () => {
          const data = await fetchPhotos("cats");
          console.log(data.results);
        }}
      >
        Get Photos
      </button>

      <button
        className="bg-blue-400 px-4 py-2 m-5"
        onClick={async () => {
          const data = await fetchVideos("cats");
          console.log(data.videos);
        }}
      >
        Get Videos
      </button>

      <button
        className="bg-green-100 px-4 py-2 m-5"
        onClick={async () => {
          const data = await fetchGIF("cats");
          console.log(data.results);
        }}
      >
        Get GIFS
      </button>
    </div>
  );
};

export default App;
