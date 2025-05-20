export const handleMenuOpen = (event, setAnchorEl, setSelectedRow, row) => {
  setAnchorEl(event.currentTarget);
  setSelectedRow(row);
};

export const handleMenuClose = (setAnchorEl, setSelectedRow) => {
  setAnchorEl(null);
  setSelectedRow(null);
};

export const handleMenuClick = (action, selectedRow, handleMenuClose) => {
  console.log(`Selected action: ${action} for row:`, selectedRow);
  handleMenuClose();
};

export const handlePrevPage = (page, setPage) => {
  if (page > 1) {
    setPage(page - 1);
  }
};

export const handleNextPage = (page, setPage, totalPages) => {
  if (page < totalPages) {
    setPage(page + 1);
  }
};

export const getDisplayedRows = (rows, page, itemsPerPage) => {
  return rows.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};
