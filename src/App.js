import React from 'react';
import { useLazyQuery } from '@apollo/client';
import PostsForChannel from './queries/PostsForChannel';
import Channels from './queries/Channels';

function App() {
  const [loadPosts, { called: postsCalled, loading: postsLoading, data: postsData }] = useLazyQuery(
    PostsForChannel,
    {
      variables: { channel: 'Main' },
    }
  );

  const [loadChannels, { called: channelsCalled, loading: channelsLoading, data: channelsData }] = useLazyQuery(
    Channels
  );

  if (postsCalled && postsLoading) {
    return <div>Loading posts...</div>;
  }

  if (!postsCalled) {
    return (
      <div className="App">
        <button onClick={() => loadPosts()}>Load Posts</button>
      </div>
    );
  }

  console.log(postsData);

  if (postsData && postsData.posts) {
    console.log(postsData); 
    return (
      <div className="App">
        <h2>Posts:</h2>
        {postsData.posts.map((post, index) => (
          <p key={`${post.date}-${index}`}>{post.message} {post.date}</p>
        ))}
        <h2>Channels:</h2>
        {channelsData && channelsData.channels ? (
          <ul>
            {channelsData.channels.map(channel => (
              <li key={channel.id}>{channel.name}</li>
            ))}
          </ul>
        ) : (
          <div>No channels available</div>
        )}
        <button onClick={() => loadPosts()}>Load Posts</button>
        <button onClick={() => loadChannels()}>Load Channels</button>
      </div>
    );
  }
}

export default App;