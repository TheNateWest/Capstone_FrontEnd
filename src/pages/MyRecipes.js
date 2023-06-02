import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "cookie";
import RecipeCard from "../Components/RecipeCard";

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState(null);

  const token = cookie.parse(document.cookie).token;

  useEffect(() => {
    axios
      .get(
        "https://capstone-back-end-self.vercel.app/recipes/all-user-recipes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMyRecipes(response.data)
    });
}, [token]);

if (!myRecipes) {
  return (
    <div className="home-page-container">
      <p className="loading" style={{ color: "smoke" }}>Loading...</p>
      <img className="App-logo" src="/logo512.png" alt={'loading'} />
    </div>
  );
}

if(myRecipes.length === 0){
  return(
    <div className="home-page-container" style={{color:'whitesmoke'}}>
      You have no Recipes Saved
    </div>
  )
}

return <div className="recipes-container">
    {myRecipes.map((recipe) => {
      recipe.image = recipe.image_url
      console.log(recipe)
        return <RecipeCard recipe={recipe} myRecipes={myRecipes} setMyRecipes={setMyRecipes}/>
    })}
  </div>;
}

export default MyRecipes;
