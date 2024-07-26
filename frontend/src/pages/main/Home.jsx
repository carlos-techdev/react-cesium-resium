import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import Typography from "@mui/material/Typography";

import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Plans from "../../components/home/Plans";

// TODO remove, this demo shouldn't need to reset the theme.

export const Home = () => {
  const landingText =
    "Implement your Creation with Geo Map";
  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Geo Map
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          {landingText}
        </Typography>
      </Container>
      <Plans />
      {/* End hero unit */}
    </div>
  );
};

export default Home;
