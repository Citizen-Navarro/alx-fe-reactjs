import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import EditRecipeForm from './components/EditRecipeForm'; // If you support editing

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1>🍲 Recipe Sharing App</h1>
          <nav style={{ marginBottom: '1rem' }}>
            <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AddRecipeForm />
                <hr />
                <RecipeList />
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <>
                <h2>❤️ Favorite Recipes</h2>
                <FavoritesList />
              </>
            }
          />

          <Route path="/recipes/:id" element={<RecipeDetails />} />
          
          {/* Optional: Route for editing */}
          <Route path="/edit/:id" element={<EditRecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
