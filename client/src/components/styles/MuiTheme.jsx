import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {

      }
    },
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: 'white'
        },
        '&:hover $notchedOutline': {
          borderColor: 'red'
        },
        '&$focused $notchedOutline': {
          borderColor: 'purple'
        }
      }
    }
  }
});

export default muiTheme;