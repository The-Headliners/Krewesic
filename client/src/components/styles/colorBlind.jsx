import { createGlobalStyle } from 'styled-components';


//background

const ColorBlind = createGlobalStyle`


  body {
    background-color: #40B0A6;
    color: #f5ebd0; 
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
    
  }
  h1 {
    
  }
  nav {
    background-color: #FFCCD2; 
    padding: 15px;
  }
  a {
    margin-left: 15px;
    margin-right: 15px;
    text-decoration: none;
  }

  .backgroundColorLight {
    background-color:  #D5D5D5;
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
 

  .inputBackground {
    background-color: white;
    border-radius: 3px;
  }

  .btn1 {
    background-color: #b8a959; 
  }
  
`;

export default ColorBlind;
