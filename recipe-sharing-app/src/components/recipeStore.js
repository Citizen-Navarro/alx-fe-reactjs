import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  setRecipes: (recipes) =>
    set({ recipes, recommendations: [] }), // clear recs on bulk update

  searchTerm: '',
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filteredRecipes: [],
  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredRecipes: filtered });
  },

  favorites: [],
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  recommendations: [],
  generateRecommendations: () => {
    const state = get();
    if (state.recommendations.length > 0) return;

    const recommended = state.recipes.filter(
      (recipe) => !state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    set({ recommendations: recommended });
  },

  resetRecommendations: () => set({ recommendations: [] }),
}));
