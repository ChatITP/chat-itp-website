"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('/api/instagram');
        const data = await response.json();
        setMedia(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div>
      <h1>Instagram Media</h1>
      <ul>
        {media.map((item) => (
          <li key={item.id}>
            <p>{item.caption}</p>
            <Image
              src={item.media_url}
              alt={item.caption}
              width={500}  // Adjust width as necessary
              height={500} // Adjust height as necessary
            />
            <p>{new Date(item.timestamp).toLocaleString()}</p>
            <a href={item.permalink} target="_blank" rel="noopener noreferrer">View on Instagram</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
