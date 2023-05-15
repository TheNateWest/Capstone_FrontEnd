import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "cookie";

export default function RecipeCard({ recipe, loggedIn }) {
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

  return (
    <div>
      <h4>{recipe.label}</h4>
      <Link to={recipe.url}>
        <img src={recipe.image} alt="recipe.label" />
      </Link>
      {loggedIn && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => saveRecipe()}
        >
          Save Recipe
        </Button>
      )}
    </div>
  );
}
