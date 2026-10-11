
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>🍽️ FoodRecipe</h2>
          <p>
            Discover delicious recipes and learn how to
            prepare your favourite dishes at home.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <a href="#top">Back to Top ↑</a>
        </div>

        <div className="footer-about">
          <h3>Explore & Cook</h3>
          <p>
            Find inspiration for your next meal and enjoy
            cooking something delicious every day.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} FoodRecipe.
          All rights reserved.
        </p>
        <p>Made with ❤️ for food lovers</p>
      </div>
    </footer>
  );
}
