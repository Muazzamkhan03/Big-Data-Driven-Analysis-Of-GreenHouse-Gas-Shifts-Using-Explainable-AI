import { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_HOST}/api/user/`, {
          withCredentials: true,
        });
        const user = res.data.user;

        setFormData({
          fullName: user.fullName,
          email: user.email,
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load user info", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/user/`,
        {
          name: formData.fullName,
          email: formData.email,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("User info updated successfully!", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        toast.error("Failed to update user info.", {
          position: "top-center",
          autoClose: 5000,
        });
      }

      setIsEditing(false);
    } catch (err) {
      toast.error("Error updating user info: " + err.message, {
        position: "top-center",
        autoClose: 5000,
      });
      setIsEditing(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading user info...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "auto", borderRadius: "8px", overflow: "hidden", padding: "20px" }}>
      <ToastContainer />

      <div
        style={{
          backgroundColor: "#1F2E2C",
          color: "white",
          textAlign: "center",
          padding: "20px 1px",
          fontSize: "18px",
          fontWeight: "bold",
          borderRadius: "8px",
          margin: "1px 40px",
          width: "94%",
        }}
      >
        Dashboard
      </div>

      <div style={{ textAlign: "left", width: "94%", margin: "20px 40px" }}>
        <div style={{ padding: "15px", backgroundColor: "#1F2E2C", borderRadius: "10px" }}>
          {Object.keys(formData).map((field) => (
            <div key={field} style={{ marginTop: "14px" }}>
              <label
                style={{
                  color: "#ccc",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  padding: "10px",
                }}
              >
                {field.replace(/([A-Z])/g, " $1")}
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#171F12",
                  borderRadius: "8px",
                  padding: "10px",
                  marginTop: "6px",
                }}
              >
                <input
                  type="text"
                  value={formData[field]}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(field, e.target.value)}
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "none",
                    width: "100%",
                    fontSize: "16px",
                    outline: "none",
                  }}
                />
                {!isEditing && (
                  <PencilSquareIcon
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "gray",
                      cursor: "pointer",
                      transition: "color 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "gray")}
                    onClick={handleEditClick}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#8FAF00")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#A6C700")}
            style={{
              marginTop: "20px",
              backgroundColor: "#A6C700",
              color: "black",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              display: "block",
              width: "100px",
              fontWeight: "bold",
            }}
          >
            SAVE
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
