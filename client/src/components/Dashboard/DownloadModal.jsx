import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Box,
  Typography,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

const countryNames = {
  PAK: 'Pakistan',
  IND: 'India',
  NPL: 'Nepal',
  BGD: 'Bangladesh',
  AFG: 'Afghanistan',
  MDV: 'Maldives',
  LKA: 'Sri Lanka',
  BTN: 'Bhutan',
  // Add more as needed
};

const formatGasLabel = (gas) => {
  if (gas === 'co2e_20yr') return 'CO2e20';
  if (gas === 'pm2_5') return 'PM2.5';
  return gas.toUpperCase();
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: 400,
  bgcolor: '#1f2e2c',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
  color: 'white',
};

const DownloadModal = ({ onClose, countries, gases }) => {
  const [country, setCountry] = useState('');
  const [emission, setEmission] = useState('');

  const handleDownload = async () => {
    if (!country || !emission) {
      alert('Please select both country and emission type');
      return;
    }

    const apiUrl = `${import.meta.env.VITE_REACT_APP_HOST}/api/download/?gas=${emission}&country=${country}`;
    console.log(apiUrl);

    try {
      const response = await axios.get(apiUrl);
      const downloadUrl = response.data?.url;

      if (!downloadUrl) {
        throw new Error('Download URL not found in response');
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${country}_${emission}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert('Error downloading data');
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16, color: 'limegreen' }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          sx={{ textAlign: 'center', color: 'white', fontWeight: 'bold', mb: 4 }}
        >
          Download Data
        </Typography>

        {/* Country Selection */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ color: '#ccc' }}>Select Country</InputLabel>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: '#2C3A38',
                  color: 'white',
                },
              },
            }}
            sx={{
              color: 'white',
              bgcolor: '#2C3A38',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'limegreen',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'limegreen',
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            }}
          >
            {countries.map((countryCode) => (
              <MenuItem key={countryCode} value={countryCode}>
                {countryNames[countryCode] || countryCode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Emission Type Selection */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel sx={{ color: '#ccc' }}>Select Emission Type</InputLabel>
          <Select
            value={emission}
            onChange={(e) => setEmission(e.target.value)}
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: '#2C3A38',
                  color: 'white',
                },
              },
            }}
            sx={{
              color: 'white',
              bgcolor: '#2C3A38',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'limegreen',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'limegreen',
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            }}
          >
            {gases.map((gas) => (
              <MenuItem key={gas} value={gas}>
                {formatGasLabel(gas)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: '#A6C700',
              color: 'white',
              borderRadius: 4,
              '&:hover': {
                backgroundColor: '#2E3E3C',
                borderColor: '#A6C700',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            sx={{
              backgroundColor: '#A6C700',
              color: 'black',
              fontWeight: 'bold',
              borderRadius: 4,
              '&:hover': { backgroundColor: '#8FAF00' },
            }}
          >
            Download
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

DownloadModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  gases: PropTypes.array.isRequired,
};

DownloadModal.defaultProps = {
  countries: [],
  gases: [],
};

export default DownloadModal;
