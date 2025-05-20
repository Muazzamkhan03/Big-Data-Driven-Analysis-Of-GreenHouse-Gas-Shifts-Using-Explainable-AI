import { Box, Typography, Card, Skeleton, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { typographyStyles } from "../../../constants/FontConstants";

const QuickStatsSection = ({ quickStats, loadingPredictions }) => {
  const totalEmissions = quickStats?.totalEmissions ?? 0;
  const since2024 = quickStats?.since2024 ?? 0;

  const isLoading = loadingPredictions || !quickStats || Object.keys(quickStats).length === 0;

  const StatCard = ({ title, value, color }) => (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--background)",
        padding: "1.5em",
        borderRadius: "10px",
        color: "#fff",
        textAlign: "center",
        minWidth: "150px",
      }}
    >
      <Typography
        variant={typographyStyles.para}
        sx={{ fontWeight: "bold", color: "var(--black10)" }}
      >
        {title}
      </Typography>

      {isLoading ? (
        <Skeleton
          width={80}
          height={30}
          sx={{ marginTop: "0.5em", bgcolor: "grey.800" }}
        />
      ) : (
        <Typography
          variant={typographyStyles.h6}
          sx={{
            color,
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginTop: "0.3em",
          }}
        >
          {value}
        </Typography>
      )}
    </Card>
  );

  return (
    <Box
      sx={{
        backgroundColor: "var(--secondary-background)",
        borderRadius: "15px",
        paddingBottom: "3em !important", 
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        width: "100%",
        // marginBottom:"6em",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: "Poppins", fontWeight: "bold", mb: 1 }}
      >
        Quick Stats
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        {isLoading ? (
          <Box sx={{ width: "90%", display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress sx={{ color: "var(--secondary)" }} />
          </Box>
        ) : (
          <>
            <StatCard
              title="Total Emissions"
              value={`${totalEmissions.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} M tons`}
              color="var(--success)"
            />

            <StatCard
              title="YoY Change"
              value={
                since2024 > 0
                  ? `+${since2024.toFixed(2)}%`
                  : `${since2024.toFixed(2)}%`
              }
              color={since2024 > 0 ? "var(--error)" : "var(--success)"}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

QuickStatsSection.propTypes = {
  quickStats: PropTypes.shape({
    totalEmissions: PropTypes.number,
    since2024: PropTypes.number,
  }),
  loadingPredictions: PropTypes.bool,
};

export default QuickStatsSection;
