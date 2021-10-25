import React from 'react';
import styled from 'styled-components';

const StyledComment = styled.div`
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #2e1e4b;
    width: 600px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 2px; 
  }
  .commentText {

  }
  .posterName {
    font-size: 10px;

  }
`;

const CommentComponent = ({comment}) => {

  return (
    <StyledComment>
      <div className='wrapper'>
        <div className='commentText' >{comment.text}</div>
        <div className='posterName'>by  {comment.User.name}</div>
      </div>
    </StyledComment>
  );
};

export default CommentComponent;
