import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Loader from "../../component/Loader/Loader";
import MealCard from "../../component/MealCard/MealCard";
import './home.css'
export default function Home() {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("all");
    const [meals, setMeals] = useState([]);
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
        <div className="home-page">
            <Navbar
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            <Loader
                loading={loading}
                error={error} />

            <MealCard
                meals={meals}
                loading={loading}
                error={error} />
        </div>
    );
}

