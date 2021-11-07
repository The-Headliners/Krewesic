import React from 'react';
import styled from 'styled-components';

const StyledComment = styled.div`
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: 14px;
    width: 600px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 2px; 
      :hover {
        cursor: pointer;
        background-color: ${props => props.theme.colorMed};
      }
  }
  .commentText {
    font-size: 15px;
    margin-right: 20px;
  }
  .posterName {
    font-size: 12px;

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
