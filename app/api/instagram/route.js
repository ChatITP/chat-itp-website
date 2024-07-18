import axios from 'axios';

export const GET = async (req) => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${accessToken}`;

  try {
    const response = await axios.get(apiUrl);
    const latestPosts = response.data.data.slice(0, 9); // Get the latest 9 posts
    return new Response(JSON.stringify({ data: latestPosts }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching data from Instagram API' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
