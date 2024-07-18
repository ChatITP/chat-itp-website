"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('/api/instagram');
        const result = await response.json();
        console.log('Client Response:', result); // Log the client-side response

        if (result.data && Array.isArray(result.data)) {
          setMedia(result.data.slice(0, 9)); // Get the latest 9 posts
        } else {
          setError('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchMedia();
  }, []);

  if (error) {
    return <div className="flex items-center justify-center h-screen"><p>{error}</p></div>;
  }

  return (
    <div className="flex flex-col items-center px-40 pt-[370px]">
      <h1 className="text-3xl font-bold mb-[66px] ">Follow Our Digital Journal!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {media.length > 0 ? media.map((item) => (
          <div key={item.id} className="bg-black rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="relative">
              <Image
                src={item.media_url}
                alt={item.caption}
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold">{item.caption}</p>
              <p className="text-sm text-gray-600">{new Date(item.timestamp).toLocaleString()}</p>
              <a
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View on Instagram
              </a>
            </div>
          </div>
        )) : <p>Loading...</p>}
      </div>
    </div>
  );
}
