import { createGlobalStyle } from 'styled-components';



const GlobalStyle = createGlobalStyle`


  body {
    background-color: black;
    color: #f5ebd0; 
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
    
  }
  h1 {
    
  }
  nav {
    background-color: #fdf0a6; 
    padding: 15px;
  }

  .backgroundColorLight {
    background-color: #caa8f7;
  }

  .clickable {
    :hover {
      cursor: pointer;

    }
  }
  .clickableDark {
    :hover {
      cursor: pointer;
      background-color: #18191a;
    }
  }
  .clickableLight {
    padding: 15px;
    :hover {
      cursor: pointer;
      background-color: #9c9c6e;

    }
  }
  a {
    margin-left: 15px;
    margin-right: 15px;
    text-decoration: none;
  }

  .btn1 {
    background-color: #b8a959; 
  }
  
`;

export default GlobalStyle;

//@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); 'Roboto'
//font-family: 'Roboto', sans-serif;