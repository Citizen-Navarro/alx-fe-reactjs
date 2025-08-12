import { useState } from "react";

export default function AddRecipeForm() {
  // State to track form inputs
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({});

  // Simple validation on submit
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim() || ingredients.split(",").length < 2)
      newErrors.ingredients = "Please enter at least two ingredients, separated by commas";
    if (!instructions.trim()) newErrors.instructions = "Instructions are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // For now just log the data (later you can add to state or send to backend)
    console.log({
      title,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
    });

    // Clear form
    setTitle("");
    setIngredients("");
    setInstructions("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 md:p-6 bg-white rounded shadow">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Add New Recipe</h2>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">Recipe Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mt-1 block w-full rounded border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } p-2 md:p-3`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold">Ingredients (comma separated)</span>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows="3"
          className={`mt-1 block w-full rounded border ${
            errors.ingredients ? "border-red-500" : "border-gray-300"
          } p-2 md:p-3`}
          placeholder="e.g. 200g flour, 2 eggs, 100ml milk"
        />
        {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 font-semibold">Preparation Steps</span>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows="5"
          className={`mt-1 block w-full rounded border ${
            errors.instructions ? "border-red-500" : "border-gray-300"
          } p-2 md:p-3`}
          placeholder="Describe the cooking steps here..."
        />
        {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 md:py-3 rounded hover:bg-blue-700 transition"
      >
        Submit Recipe
      </button>
    </form>
  );
}
