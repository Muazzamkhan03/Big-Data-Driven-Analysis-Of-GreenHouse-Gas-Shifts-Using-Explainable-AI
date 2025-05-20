import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * A reusable hook to determine a style property value based on screen size.
 *
 * @param {string} smallValue - Value for small screens.
 * @param {string} mediumValue - Value for medium screens.
 * @param {string} largeValue - Value for large screens.
 * @returns {string} - The appropriate value based on screen size.
 */
export const useResponsiveValue = (smallValue, mediumValue, largeValue) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  if (isSmallScreen) {
    return smallValue;
  } else if (isMediumScreen) {
    return mediumValue;
  } else if (isLargeScreen) {
    return largeValue;
  }
  return largeValue; // Fallback for large screens
};