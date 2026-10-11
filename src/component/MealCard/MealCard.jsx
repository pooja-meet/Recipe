
import { Link } from "react-router-dom";
import './mealcard.css'
export default function MealCard({ meals = [], loading, error }) {
    if (loading || error) {
        return null;
    }

    if (meals.length === 0) {
        return (
            <h2 className="message">
                No recipes found. Try another name!
            </h2>
        );
    }

    return (
        <div className="meal-container">
            {meals.map((meal) => (
                <div className="meal-card" key={meal.idMeal}>
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                    />

                    <div className="meal-info">
                        <h2>{meal.strMeal}</h2>

                        <p>
                            <strong>Category:</strong>{" "}
                            {meal.strCategory || "N/A"}
                        </p>

                        <p>
                            <strong>Area:</strong>{" "}
                            {meal.strArea || "N/A"}
                        </p>

                        <Link to={`/recipe/${meal.idMeal}`} className="recipe-button">
                            View Instructions →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
