import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "cookie";

export default function RecipeCard({ recipe, loggedIn, myRecipes, setMyRecipes }) {
  const saveRecipe = () => {
    const token = cookie.parse(document.cookie).token;
    console.log(token, "save recipe token");
    axios
      .post(
        "https://capstone-back-end-self.vercel.app/recipes/save-recipe",
        {
          label: recipe.label,
          url: recipe.url,
          image_url: recipe.image,
          source: recipe.source,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((err) => console.log("this be ther err:", err));
  };
  const deleteRecipe = (recipeId) => {
    console.log(recipeId)
    const token = cookie.parse(document.cookie).token;
    console.log(token, "save recipe token");
    axios
      .delete(
        `https://capstone-back-end-self.vercel.app/recipes/delete-recipe/${recipeId}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response)
      const newRecipes=myRecipes.filter((recipe) => {
        return recipeId !== recipe.id
      })
      setMyRecipes(newRecipes)
      })
      .catch((err) => console.log("this be ther err:", err));
  }

  return (
    <div className="recipe-card-container">
      <div className="recipe-image">
      <Link to={recipe.url}>
        <img src={recipe.image} alt={recipe.label} />
      </Link>
      </div>
      <Link to={recipe.url}><h4>{recipe.label}</h4></Link>
      <Link to={recipe.url}>Source: {recipe.source}</Link>
      {loggedIn && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => saveRecipe()}
        >
          Save Recipe
        </Button>
        
      )}
    {myRecipes && (
      <Button
      variant="contained"
      color="secondary"
      onClick={() => deleteRecipe(recipe.id)}
    >
      Delete Recipe
    </Button>
    )}
    </div>
  );
}
