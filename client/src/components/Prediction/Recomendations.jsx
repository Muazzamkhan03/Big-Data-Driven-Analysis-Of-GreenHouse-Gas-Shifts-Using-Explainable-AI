import { Box, Typography } from "@mui/material";
import { AccountCircle, Policy, Groups } from "@mui/icons-material";

const Recommendations = () => {
  const recommendations = [
    {
      title: "Industry Actions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: <AccountCircle fontSize="large" sx={{ color: "#2ECC71" }} />,
    },
    {
      title: "Policy Changes",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: <Policy fontSize="large" sx={{ color: "#3498DB" }} />,
    },
    {
      title: "Public Awareness",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: <Groups fontSize="large" sx={{ color: "#F39C12" }} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        padding: "1.5em",
        backgroundColor: "#1E272E",
        color: "#fff",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Poppins",
          fontWeight: "bold",
          marginBottom: "1em",
        }}
      >
        Recommendations
      </Typography>
      {recommendations.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1em",
            backgroundColor: "#2C3E50",
            padding: "1em",
            borderRadius: "15px",
          }}
        >
          <Box>{item.icon}</Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Poppins", fontWeight: "bold", color: "#fff" }}
            >
              {item.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "0.9em",
                color: "#BDC3C7",
              }}
            >
              {item.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Recommendations;
