import React, { useState, useEffect } from "react"; 
import { TextField, Button, IconButton, Typography, Box, Alert, FormHelperText } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPasswordUpdate = () => {
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
  };

  useEffect(() => {
    if (passwords.confirmPassword) {
      setPasswordMatchError(passwords.newPassword !== passwords.confirmPassword ? "Passwords do not match" : "");
    } else {
      setPasswordMatchError(""); 
    }
  }, [passwords.newPassword, passwords.confirmPassword]);

  const handleUpdatePassword = async () => {
    setError("");
    setSuccess("");
    setPasswordMatchError("");
    setLoading(true);

    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatchError("New password and confirm password do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/user/password/`,
        { oldPassword, newPassword, matchPassword: confirmPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!", { position: "top-center", autoClose: 5000 });
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(response.data?.error || "Failed to update password.", { position: "top-center", autoClose: 5000 });
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "An unexpected error occurred.", { position: "top-center", autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ width: "100%", maxWidth: "500px", margin: "auto", borderRadius: "8px", overflow: "hidden", padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <ToastContainer position="top-center" autoClose={5000} />
      <Box sx={{ backgroundColor: "#1F2E2C", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="white" fontSize="18px" padding="5px">
          Update Password
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", padding: "25px", borderRadius: "8px", backgroundColor: "#1F2E2C", gap: "10px", fontSize: "13px", color: "white" }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          fullWidth variant="outlined" type={showPassword.old ? "text" : "password"} label="Old Password" name="oldPassword" value={passwords.oldPassword} onChange={handleInputChange}
          InputProps={{ endAdornment: (<IconButton onClick={() => togglePasswordVisibility("old")} edge="end">{showPassword.old ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}</IconButton>), }}
          sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#171F12", color: "white", "& fieldset": { borderColor: "transparent" }, "&:hover fieldset": { borderColor: "white" }, "&.Mui-focused fieldset": { borderColor: "white" }, }, "& .MuiInputLabel-root": { color: "white" }, }}
        />
        <TextField
          fullWidth variant="outlined" type={showPassword.new ? "text" : "password"} label="New Password" name="newPassword" value={passwords.newPassword} onChange={handleInputChange}
          InputProps={{ endAdornment: (<IconButton onClick={() => togglePasswordVisibility("new")} edge="end">{showPassword.new ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}</IconButton>), }}
          sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#171F12", color: "white", "& fieldset": { borderColor: "transparent" }, "&:hover fieldset": { borderColor: "white" }, "&.Mui-focused fieldset": { borderColor: "white" }, }, "& .MuiInputLabel-root": { color: "white" }, }}
        />
        <TextField
          fullWidth variant="outlined" type={showPassword.confirm ? "text" : "password"} label="Confirm New Password" name="confirmPassword" value={passwords.confirmPassword} onChange={handleInputChange}
          InputProps={{ endAdornment: (<IconButton onClick={() => togglePasswordVisibility("confirm")} edge="end">{showPassword.confirm ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}</IconButton>), }}
          sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#171F12", color: "white", "& fieldset": { borderColor: "transparent" }, "&:hover fieldset": { borderColor: "white" }, "&.Mui-focused fieldset": { borderColor: "white" }, }, "& .MuiInputLabel-root": { color: "white" }, }}
          error={!!passwordMatchError}
          helperText={passwordMatchError}
        />

        <Button
          fullWidth variant="contained" onClick={handleUpdatePassword} disabled={loading}
          sx={{ backgroundColor: "#A6C700", color: "black", fontWeight: "bold", "&:hover": { backgroundColor: "#8FAF00" }, padding: "10px", marginTop: "15px", borderRadius: "8px" }}
        >
          {loading ? "Updating..." : "UPDATE PASSWORD"}
        </Button>

        <Box textAlign="center">
          <Link to="/forgot-password" style={{ color: "#A6C700", textDecoration: "none" }}>
            Forgot password?
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPasswordUpdate;