import { LineMdLoadingLoop } from "@/components/icons/LineMdLoadingLoop";
import { Avatar, Chip, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Iconify } from "@/components/iconify";

export const MainLoading = () => {
  const [loading, setLoading] = useState(true);
  const [currentWord, setCurrentWord] = useState("Traeon");
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out effect
  const words = ["Travel", "Explore", "Web3", "Journey", "Adventure"]; // Words to animate

  const animationDuration = 300; // Change word every second

  // Simulate loading for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade-out effect
      setTimeout(() => setLoading(false), 500); // Wait for fade-out animation to finish
    }, 3000); // Change to your desired duration

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Change words in intervals
  useEffect(() => {
    const wordChangeInterval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, animationDuration);

    return () => clearInterval(wordChangeInterval); // Cleanup on unmount
  }, []);

  if (!loading) {
    return null; // Remove or hide the loading component
  }

  return (
    <div style={{ opacity: fadeOut ? 0 : 1, transition: "opacity 0.5s" }}>
      <Grid2
        container
        spacing={1}
        sx={{
          height: "100vh",
          zIndex: 3,
          position: "fixed",
          width: "100vw",
          textAlign: "center",
          backgroundColor: "white", // Optional: background color
        }}
      >
        <Grid2
          size={12}
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 60px)",
          }}
        >
          <Typography variant="body1" sx={{ mt: 4 }}>
            Welcome to <strong style={{ }}>Traeon</strong>!
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            {currentWord}
          </Typography>
          {/* <Avatar src="/logo-traeon.png" sx={{borderRadius: '10px', height: '200px', width: '200px'}}/> */}

          <LineMdLoadingLoop
            width={64}
            height={64}
            style={{ margin: "auto", animation: "spin 1s linear infinite" }}
          />
          <Typography variant="body1" sx={{ mb: 4 }}>
            Powered by
            <br />
            <Chip
              label={<Typography variant="body1" sx={{ color: 'black' }}>AEON Payment</Typography>}
              color="default"
              variant="outlined"
              sx={{ border: "none", mx: 0 }}
              icon={
                <Avatar
                  alt="Aeon logo"
                  src="/logo-aeon.png"
                  sx={{ width: 28, height: 28, p: 0.5, marginLeft: 1, marginRight: 1 }}
                />
              }
            />
            |
            <Chip
              label={<Typography variant="body1" sx={{}}>TON Network</Typography>}
              color="default"
              variant="outlined"
              sx={{ border: "none", color: 'black', mx: 0 }}
              icon={
                <Iconify
                  icon="token:ton"
                  style={{
                    color: 'black',
                    marginLeft: 8,
                    width: 28,
                    height: 28,
                  }}
                />
              }
            />
          </Typography>
        </Grid2>
      </Grid2>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};
