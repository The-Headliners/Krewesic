import { createGlobalStyle } from 'styled-components';

//color pallete:
/**
 * 
 #000000 
 #150050
 #3F0071
 #610094

 #c3c2c5
 */

const GlobalStyle = createGlobalStyle`


  body {
    background-color: black;
    color: #c3c2c5; 
    font-family: 'Hind Madurai', sans-serif;
    line-height: 1.5;
    
  }
  h1 {
    
  }
  nav {
    background-color: #3F0071; 
    padding: 15px;
  }
  a {
    margin-left: 15px;
    margin-right: 15px;
    text-decoration: none;
    color: #c3c2c5;
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
      background-color:  #150050;
    }
  }
  .clickableLight {
    padding: 15px;
    :hover {
      cursor: pointer;
      background-color: #610094;

    }
  }
 

  .inputBackground {
    background-color: white;
    border-radius: 3px;
  }

  .btn1 {
    background-color: #3F0071; 
  }
  
`;

export default GlobalStyle;

//@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); 'Roboto'
//font-family: 'Roboto', sans-serif;