export default  {
    palette: {
      common: { black: "#000", white: "#fff" },
      background: {
          paper: "rgba(245, 239, 239, 1)",
          default: "rgba(229, 226, 226, 1)"
      },
      primary: {
          light: "rgba(121, 203, 160, 1)",
          main: "rgba(74, 226, 184, 0.98)",
          dark: "rgba(48, 140, 159, 1)",
          contrastText: "#fff"
      },
      secondary: {
        light: "rgba(64, 148, 255, 1)",
        main: "rgba(80, 201, 227, 1)",
        dark: "rgba(17, 109, 197, 1)",
        contrastText: "#fff"
      },
      error: {
        light: "#e57373",
        main: "rgba(238, 77, 118, 1)",
        dark: "#d32f2f",
        contrastText: "#fff"
      },
      text: {
          primary: "rgba(37, 30, 30, 1)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)"
      }
      },
      typography: {
        useNextVariants: true
      },
      common: {
        card: {
            maxWidth: 345,
            margin: "auto",
            textAlign: "center"
          },
          button: {
            margin: "20px auto 20px auto",
            float: "right"
          },
          title: {
            textAlign: "center",
            fontSize: 45,
            color: "#00bcd4"
          },
          caption: {
            color: "red",
            margin: 20
          },
          btnLink: {
              margin: "30px auto 10px 0",
              float: "left"
          },
          closeButton: {
              position: 'absolute',
              top: '1%',
              left: '91%'
          },
          invisibleSeparator: {
            border: 'none',
            margin: '0 0 10px 0'
        },
        visibleSeparator: {
          width: '100%',
          // borderBottom: '1px solid rgba(0 0 0 0.1)'
      }
      }
      
}