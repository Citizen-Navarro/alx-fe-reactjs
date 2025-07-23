import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],

  // ✅ ADD
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // ✅ EDIT
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  // ✅ DELETE
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  // ✅ Replace all recipes at once (optional bulk update)
  setRecipes: (recipes) => set({ recipes }),
}));
