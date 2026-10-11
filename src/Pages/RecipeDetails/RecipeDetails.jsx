
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./recipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");
      setMeal(null);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const data = await response.json();

        if (!data.meals || data.meals.length === 0) {
          throw new Error("Recipe not found");
        }

        setMeal(data.meals[0]);
      } catch (err) {
        setError("Unable to load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <h2 className="message">Loading recipe...</h2>;
  }

  if (error || !meal) {
    return (
      <div className="message">
        <h2>{error || "Recipe not found"}</h2>
        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;

    return {
      name: meal[`strIngredient${number}`]?.trim(),
      measure: meal[`strMeasure${number}`]?.trim(),
    };
  }).filter((item) => item.name);

  return (
    <div className="recipe-details">
      <Link to="/" className="back-btn">
        ← Back to Recipes
      </Link>

      <h1>{meal.strMeal}</h1>

      <img
        className="details-image"
        src={meal.strMealThumb}
        alt={meal.strMeal}
      />

      <section>
        <h2>🥗 Ingredients</h2>

        <ul className="ingredients-list">
          {ingredients.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <span>{item.measure || "As needed"}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>👨‍🍳 Cooking Instructions</h2>
        <p className="instructions">{meal.strInstructions}</p>
      </section>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noreferrer"
          className="video-btn"
        >
          ▶ Watch Recipe Video
        </a>
      )}
    </div>
  );
}
