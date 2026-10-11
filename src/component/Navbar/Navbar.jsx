
import "./navbar.css";

export default function Navbar({
  search,
  setSearch,
  handleSearch,
}) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-icon">🍽️</span>
        <h1>FoodRecipe</h1>
      </div>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search pasta, chicken..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>
    </nav>
  );
}
