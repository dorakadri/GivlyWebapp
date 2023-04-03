
export const themeSettingsall = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
            //dark
            primary: {
                main: '#5d483f',
                contrastText: '#fff',
              },
              secondary: {
                main: '#c95d3d',
              },
              background: {
                default: '#fafafa',
                paper: '#fff',
              },
              text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.54)',
                disabled: 'rgba(0, 0, 0, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
              },
              divider: 'rgba(0, 0, 0, 0.12)',
              action: {
                disabled: '#757575', 
              },
            }
          : {
            primary: {
                main: '#2dbcaa',
                contrastText:'#757575',
              },
              secondary: {
           main: '#329c9c',
             
              
              },
              background: {
                default: '#fafafa',
                paper: '#fff',
              },
            
              text: {
                primary: 'rgba(0, 0, 0, 0.87)',
              }
            
            }),
      },
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '& fieldset': {
                borderColor: '#757575',
              },
              '&:hover fieldset': {
                borderColor: '#c95d3d',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5d483f',
              },
            },
          },
        },
        MuiStandardInput: {
          styleOverrides: {
            root: {
              '& fieldset': {
                borderColor: '#757575',
              },
              '&:hover fieldset': {
                borderColor: '#c95d3d',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5d483f',
              },
            },
          },
        },
      },
      
   
      typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 12,
        
        h1: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 40,
     
        },
        h2: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 32,
      
        },
        h3: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 40,
      
        },
        h4: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 20,
          fontWeight: 700
          
        },
        h5: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 16,
       
        },
        h6: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 14,
          
        },
      },
      
    };
  };