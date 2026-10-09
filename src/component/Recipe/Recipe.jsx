import { useEffect, useState } from "react";
import './recipe.css'
export default function Recipe() {
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            setError("");

            try {
                const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }

                const data = await response.json();

                setMeals(data.meals || []);
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();

        const value = search.trim();

        if (value) {
            setQuery(value);
        }
    };

    return (
        <div className="app">
            <h1>🍽️ Food Recipe App</h1>
            <p className="subtitle">
                Find your favourite recipes
            </p>

            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search pasta, salad..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button type="submit">Search</button>
            </form>

            {loading && <h2 className="message">Loading recipes...</h2>}

            {!loading && error && (
                <h2 className="message">{error}</h2>
            )}

            {!loading && !error && meals.length === 0 && (
                <h2 className="message">No recipes found. Try another name!</h2>
            )}

            {!loading && !error && meals.length > 0 && (
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

                                {/* <details>
                                    <summary>View Instructions</summary>
                                    <p>{meal.strInstructions}</p>
                                </details> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

