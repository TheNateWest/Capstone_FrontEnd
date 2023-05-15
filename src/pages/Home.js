import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeCard from "../Components/RecipeCard";

export default function Home({loggedIn}) {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${process.env.REACT_APP_APIID}&app_key=${process.env.REACT_APP_APIKEY}`
      )
      .then((response) => {
        // console.log(response);
        setRecipes(response.data);
      });
  }, []);

  useEffect(() => {
    console.log(recipes, "in effect");
  }, [recipes]);

  return (
    <div>
      {recipes?.hits.map(({ recipe }) => (
        <RecipeCard recipe={recipe} loggedIn={loggedIn}/>
      ))}
    </div>
  );
}
