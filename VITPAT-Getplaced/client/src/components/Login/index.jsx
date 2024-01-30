// Import necessary dependencies and styles
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

// Create the Login component
const Login = () => {
  // State for form data and error
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Event handler for form input changes
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Render the component
  return (
    
    <div className={styles.login_container}>
     
    
      <div className={styles.login_form_container}>
      
        <div className={styles.left}>
        <div className={styles.pic}>
      <img
            src="vit.jpg"
            alt="VIT Logo"
            className={styles.vit_image}
            style={{ width: "120px", height: "120px" }}
          />
      </div>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
			<Link to="/planner">

            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
			</Link>
      <div className={styles.signup_below_login}>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
          </div>
          </form>
        </div>
        <div className={styles.right}>
          {/* Specify width and height for the image */}
          <img
            src="vit.jpg"
            alt="VIT Logo"
            className={styles.vit_image}
            style={{ width: "200px", height: "200px" }}
          />
          <h1>New Here ?</h1>
         
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
          </div>
        
      </div>
    </div>
  );
};

export default Login;
