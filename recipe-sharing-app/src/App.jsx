import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>Recipe Sharing App</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <hr />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
