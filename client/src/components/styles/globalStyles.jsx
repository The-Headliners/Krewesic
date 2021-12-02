import { createGlobalStyle } from 'styled-components';

//color pallete:
/**
 *
 #000000
 #150050
 #3F0071
 #610094
#a2a1a7
 #c3c2c5
 */

const GlobalStyle = createGlobalStyle`


  body {
    background-color: black;
    color: #a2a1a7;
    font-family: 'Hind Madurai', sans-serif;
    line-height: 1.5;

  }
  h1 {
    color: #c3c2c5;
  }
  nav {
    background-color: #3F0071;
    padding: 15px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
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

  .clickableNav {
    padding: 3px;
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