import React, { useState, useEffect } from 'react';

function App() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => setComments(data.slice(0, 100)));
  }, []);

  useEffect(() => {
    if (filter === '') {
      setFilteredComments(comments);
    } else {
      setFilteredComments(
        comments.filter((comment) =>
          comment.postId.toString().includes(filter)
        )
      );
    }
  }, [filter, comments]);

  const handlePostClick = (postId) => {
    setSelectedPost(postId);
  };

  return (
    <div className="App">
      <div className="left-panel">
        <input
          type="text"
          placeholder="Filter by postId"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className={`post ${comment.postId === selectedPost ? 'active' : ''}`}
            onClick={() => handlePostClick(comment.postId)}
          >
            <p>{comment.name}</p>
          </div>
        ))}
      </div>
      <div className="right-panel">
        {selectedPost && (
          <div className="comments">
            {comments
              .filter((comment) => comment.postId === selectedPost)
              .map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.body}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
