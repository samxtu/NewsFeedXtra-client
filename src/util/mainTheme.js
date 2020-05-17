export default  {
    palette: {
      common: { black: "#000", white: "#fff", fontFamily: "Playfair Display" },
      background: {
          paper: "rgba(245, 239, 239, 1)",
          default: "rgba(229, 226, 226, 1)"
      },
      primary: {
          light: "rgba(121, 203, 160, 1)",
          fontFamily: "Playfair Display",
          // main: "#31708E",
          // main: "#B39B68",
          // main: "#59253A",
          // main: "#F4976C",
          main: "#2D283E",
          // main: "#2D5F5D",
          // main: "#265077",

          // main: "#116466",
          // main: "#AC3B61",
          // main: "#BC4639",
          // main: "rgba(74, 226, 184, 0.98)",
          dark: "#8B572A",
          contrastText: "#fff"
      },
      secondary: {
        fontFamily: "Playfair Display",
        light: "rgba(64, 148, 255, 1)",
        main: "rgba(80, 201, 227, 1)",
        dark: "rgba(17, 109, 197, 1)",
        contrastText: "#fff"
      },
      error: {
        fontFamily: "Playfair Display",
        light: "#e57373",
        main: "rgba(238, 77, 118, 1)",
        dark: "#d32f2f",
        contrastText: "#fff"
      },
      text: {
        fontFamily: "Playfair Display",
          primary: "rgba(37, 30, 30, 1)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)"
      }
      },
      typography: {
        fontFamily: "Playfair Display",
        useNextVariants: true
      },
      common: {
        card: {
          fontFamily: "Playfair Display",
            maxWidth: 345,
            margin: "auto",
            textAlign: "center"
          },
          button: {
            fontFamily: "Playfair Display",
            margin: "20px auto 20px auto",
            float: "right"
          },
          title: {
            fontFamily: "Playfair Display",
            textAlign: "center",
            fontSize: 45,
            color: "#00bcd4"
          },
          caption: {
            fontFamily: "Playfair Display",
            color: "red",
            margin: 20
          },
          btnLink: {
            fontFamily: "Playfair Display",
              margin: "30px auto 10px 0",
              float: "left"
          },
          closeButton: {
            fontFamily: "Playfair Display",
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