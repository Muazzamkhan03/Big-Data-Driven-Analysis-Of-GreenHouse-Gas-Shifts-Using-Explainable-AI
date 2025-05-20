import React, { useState } from "react";
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import { FaBell, FaUserCircle, FaDownload } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { isLoggedIn } from '../../../utility/common/auth';
import logo from '../../../assets/logo.jpeg';
import DownloadModal from "../DownloadModal";

const DashboardHeader = ({ countries, gases }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userLoggedIn = isLoggedIn();
  const isPredictionPage = location.pathname === "/dashboard/prediction";
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1F2E2C", boxShadow: "none", px: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* ✅ Logo */}
          <IconButton onClick={() => navigate("/home")} sx={{ p: 0 }}>
            <img src={logo} alt="Logo" style={{ width: 50, height: 50, borderRadius: "50%" }} />
          </IconButton>

          {/* ✅ Header Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            
            {/* Dashboard Icon (only on prediction page) */}
            {isPredictionPage && (
              <IconButton onClick={() => navigate("/dashboard")} sx={{ color: "#A6C700" }}>
                <SpaceDashboardOutlinedIcon fontSize="large" />
                <p style={{ fontSize: "15px", marginLeft: 4 }}>Dashboard</p>
              </IconButton>
            )}

            {/* Download Button */}
            <Button
              variant="contained"
              onClick={() => setShowDownloadModal(true)}
              sx={{
                backgroundColor: "#A6C700",
                color: "#000",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "20px",
                px: 2,
                "&:hover": { backgroundColor: "#8FAF00" }
              }}
              startIcon={<FaDownload />}
            >
              Download Data
            </Button>

           

            {/* Auth Actions */}
            {userLoggedIn ? (
              <IconButton onClick={() => navigate("/userDashboard")} sx={{ color: "#A6C700" }}>
                <FaUserCircle size={30} />
              </IconButton>
            ) : (
              <Button
                onClick={() => navigate("/login", { state: { from: location.pathname } })}
                variant="outlined"
                sx={{
                  borderColor: "#A6C700",
                  color: "#A6C700",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#A6C700",
                    color: "#000",
                  },
                }}
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/*  Download Modal */}
      {showDownloadModal && (
  <DownloadModal
    onClose={() => setShowDownloadModal(false)}
    countries={countries}
    gases={gases}
  />
)}

    </>
  );
};

DashboardHeader.propTypes = {
  countries: PropTypes.array.isRequired,
  gases: PropTypes.array.isRequired,
};

export default DashboardHeader;
