import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import { styles } from "./styles";
import {
  handlePrevPage,
  handleNextPage,
  getDisplayedRows,
} from "../../utility/User History/functions";
import { format } from "date-fns";

const itemsPerPage = 20;

const DarkTable = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const displayedRows = getDisplayedRows(rows, page, itemsPerPage);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        setLoading(true); // Start loading
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/user/history`,
          {
            withCredentials: true,
          }
        );
        const history = res.data.history;
        setRows(history.reverse()); // Show most recent first
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserHistory();
  }, []);

 const handleDelete = async (historyId) => {
  try {
    setLoading(true); // Show loader while deleting
    await axios.delete(
      `${import.meta.env.VITE_REACT_APP_HOST}/api/user/history/${historyId}`,
      {
        withCredentials: true,
      }
    );
    // Update the rows after successful deletion
    setRows((prevRows) => prevRows.filter((row) => row._id !== historyId));
    console.log("Deleted");
  } catch (err) {
    console.error("Error deleting record:", err);
  } finally {
    setLoading(false); // Stop the loader after the update
  }
};

  return (
    <Box sx={styles.container}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", // Adjust as necessary
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table>
              <TableHead sx={styles.tableHead}>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" sx={styles.tableCellHeader}>
                      Search Date/Time
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={styles.tableCellHeader}>
                      Country
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={styles.tableCellHeader}>
                      Year
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={styles.tableCellHeader}>
                      Sector
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={styles.tableCellHeader}>
                      Gas
                    </Typography>
                  </TableCell>
                  <TableCell sx={styles.tableCellActions}>
                    <Typography variant="h6" sx={styles.tableCellHeader}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {displayedRows.map((row, index) => (
                  <TableRow key={index} sx={styles.tableRow}>
                    <TableCell sx={styles.tableCellBody}>
                      {format(new Date(row.timestamp), "PPpp")}
                    </TableCell>
                    <TableCell sx={styles.tableCellBody}>{row.country}</TableCell>
                    <TableCell sx={styles.tableCellBody}>{row.year}</TableCell>
                    <TableCell sx={styles.tableCellBody}>{row.sector}</TableCell>
                    <TableCell sx={styles.tableCellBody}>{row.gas}</TableCell>
                    <TableCell sx={styles.tableCellActions}>
                      <IconButton
                        onClick={() => handleDelete(row._id)}
                        aria-label="delete"
                      >
                        <DeleteIcon sx={styles.tableCellHeader} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={styles.paginationContainer}>
            <IconButton
              onClick={() => handlePrevPage(page, setPage)}
              disabled={page === 1}
              sx={styles.paginationButton(page === 1)}
            >
              <ArrowBackIosNewIcon
                fontSize="small"
                sx={styles.paginationIcon(page === 1)}
              />
            </IconButton>

            <Typography variant="h6" sx={styles.tableCellHeader}>
              {page} of {totalPages}
            </Typography>

            <IconButton
              onClick={() => handleNextPage(page, setPage, totalPages)}
              disabled={page === totalPages}
              sx={styles.paginationButton(page === totalPages)}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={styles.paginationIcon(page === totalPages)}
              />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DarkTable;
