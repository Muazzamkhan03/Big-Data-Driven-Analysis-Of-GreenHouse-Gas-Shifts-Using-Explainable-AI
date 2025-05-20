export const styles = {
  container: {
    p: 2,
    backgroundColor: "var(--secondary-background)",
    borderRadius: "10px",
  },
  tableContainer: {
    backgroundColor: "var(--background)",
    borderRadius: "10px",
  },
  tableHead: {
    borderBottom: "1.5em solid var(--secondary-background)",
    borderRadius: "10px",
  },
  tableCellHeader: {
    color: "var(--primary)",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  tableRow: {
    "&:hover": { backgroundColor: "var(--secondary-background)" },
    borderBottom: "none",
  },
  tableCellBody: {
    color: "var(--primary)",
    fontFamily: "Poppins",
    fontWeight: "bold",
    borderBottom: "none",
  },
  tableCellActions: {
    textAlign: "right",
    borderBottom: "none",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    mt: 2,
    p: 1,
    borderRadius: "10px",
    backgroundColor: "var(--background)",
  },
  paginationButton: (disabled) => ({
    color: disabled ? "var(--secondary-background)" : "var(--primary)",
    border: "3px solid",
    borderColor: disabled ? "var(--secondary-background)" : "var(--primary)",
    borderRadius: "5px",
    mx: 1,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      borderColor: disabled
        ? "var(--secondary-background)"
        : "var(--hover-color)",
      backgroundColor: "transparent",
    },
  }),
  paginationIcon: (disabled) => ({
    color: disabled ? "var(--secondary-background)" : "var(--primary)",
  }),
};
