import React, { useState } from "react";
import { Box, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Stars = ({ value, onChange }) => {
  const [hover, setHover] = useState(-1);

  const labels = {
    0.5: "Insuportável",
    1: "Muito Ruim",
    1.5: "Ruim",
    2: "Regular",
    2.5: "Ok",
    3: "Bom",
    3.5: "Muito Bom",
    4: "Excelente",
    4.5: "Incrível",
    5: "Perfeito!",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        py: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#2d2d2d", textAlign: "center" }}
      >
        Como foi sua experiência?
      </Typography>

      <Rating
        name="feedback-stars"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => onChange(newValue)}
        onChangeActive={(event, newHover) => setHover(newHover)}
        emptyIcon={<StarIcon style={{ opacity: 0.25 }} fontSize="inherit" />}
        sx={{
          fontSize: "3.5rem",
          "& .MuiRating-iconFilled": {
            color: "#FFD700",
            filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))",
          },
          "& .MuiRating-iconHover": {
            color: "#FFC107",
            transform: "scale(1.1)",
          },
          "& .MuiRating-icon": {
            transition: "transform 0.2s ease",
          },
        }}
      />

      {value !== null && (
        <Typography
          sx={{
            mt: 1,
            color: "#666",
            fontWeight: 500,
            fontSize: "1rem",
            backgroundColor: "#f8f9fa",
            px: 2,
            py: 0.5,
            borderRadius: "20px",
          }}
        >
          {labels[hover !== -1 ? hover : value] || "Selecione uma nota"}
        </Typography>
      )}
    </Box>
  );
};

export default Stars;
