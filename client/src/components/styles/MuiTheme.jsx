

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