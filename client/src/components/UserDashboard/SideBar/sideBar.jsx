import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HistoryIcon from '@mui/icons-material/History';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../../assets/logo.jpeg';
import './style.css';
import axios from 'axios';
import { logout } from '../../../utility/auth';

const Item = ({ title, to, icon, selected, setSelected }) => (
  <MenuItem
    active={selected === title}
    onClick={() => setSelected(title)}
    icon={icon}
    component={<Link to={to} />}
    sx={{
      paddingLeft: '20px',
      '&:hover': { backgroundColor: '#0D1B18' },
      color: selected === title ? '#FACC15' : 'white !important',
      fontWeight: selected === title ? 'bold' : 'normal',
    }}
  >
    <Typography fontSize="16px">{title}</Typography>
  </MenuItem>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Dashboard");
  const [userName, setUserName] = useState("");
  const isMobile = useMediaQuery("(max-width:426px)");

  const handleLogout = () => {
    logout();
    console.log("Logging out...");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_HOST}/api/user/`, { withCredentials: true });
        const user = res.data.user;

        setUserName(user.fullName); // Correctly setting the user's full name

      } catch (err) {
        console.error("Failed to load user info:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <Sidebar
      collapsed={isCollapsed}
      width={isMobile ? "70px" : "250px"}
      style={{
        backgroundColor: "var(--background)",
        color: "white",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <Menu iconShape="square">
        {/* Logo Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            padding: isCollapsed ? '10px 0' : '10px 20px',
            marginTop: '10px',
            cursor: 'pointer',
          }}
        >
          <img
            src={logo}
            alt="GHGXPLAIN Logo"
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
            onClick={() => navigate('/home')}
          />
          {!isCollapsed && (
            <Typography
              fontSize="20px"
              fontWeight="bold"
              color="white"
              marginLeft="10px"
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{ cursor: 'pointer' }}
            >
              GHGXPLAIN
            </Typography>
          )}
        </div>

        {/* Profile Section */}
        {!isCollapsed && (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <img
              src="https://p7.hiclipart.com/preview/481/915/760/computer-icons-user-avatar-woman-avatar.jpg"
              alt="User Avatar"
              width={60}
              height={60}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
              }}
            />
            <Typography fontSize="18px" fontWeight="bold" mt="10px" color="white">
              {userName}
            </Typography>
          </div>
        )}

        {/* Menu Items */}
        <Item title="GHG Dashboard" to="/dashboard" icon={<GridViewIcon />} selected={selected} setSelected={setSelected} />
        <Item title="UserInfo" to="/userDashboard/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="User History" to="/userDashboard/userhistory" icon={<HistoryIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Update Password" to="/userDashboard/updatePassword" icon={<KeyOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <MenuItem
          onClick={handleLogout}
          icon={<LogoutIcon />}
          style={{ textAlign: 'center', paddingLeft: '20px' }}
        >
          <Typography fontSize="16px">Logout</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

SideBar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
};

export default SideBar;
