import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";
import { Button, TextField } from "@mui/material";

export default function Home({ loggedIn }) {
  const [recipes, setRecipes] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_APIID}&app_key=${process.env.REACT_APP_APIKEY}&dishType=Main%20course&random=true`
      )
      .then((response) => {
        console.log(response);
        setRecipes(response.data);
      });
  }, []);

  useEffect(() => {
    console.log(!!recipes && recipes._links, "in effect");
  }, [recipes]);

  const handleSearch = () => {
    const fetchRecipes = async () => {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${process.env.REACT_APP_APIID}&app_key=${process.env.REACT_APP_APIKEY}`
      );

      setRecipes(response.data);
    };
    fetchRecipes();
  };
  const nextPage = () => {
    const fetchRecipes = async () => {
      const response = await axios.get(recipes._links.next.href);
      console.log(response);
      setRecipes(response.data);
    };
    fetchRecipes();
  };

  const handleRandomSearch = () => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_APIID}&app_key=${process.env.REACT_APP_APIKEY}&dishType=Main%20course&random=true`
      )
      .then((response) => {
        console.log(response);
        setRecipes(response.data);
      });
  };
  if (!recipes) {
    return (
      <div className="home-page-container">
        <p className="loading" style={{ color: "smoke" }}>Loading...</p>
        <img className="App-logo" src="/logo512.png" alt={'loading'} />
      </div>
    );
  }

  return (
    <div className="home-page-container">
      <div className="search-input-container">
        <TextField
          label="Search Recipe"
          variant="filled"
   
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch()}
        >
          Search Recipes!
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleRandomSearch()}
        >
          More Random Recipes
        </Button>
      </div>
      <div className="recipes-container">
        {recipes?.hits.map(({ recipe }) => (
          <RecipeCard recipe={recipe} loggedIn={loggedIn} />
        ))}
        {recipes && recipes._links && recipes._links.next && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => nextPage()}
          >
            Next Page
          </Button>
        )}
        {recipes && recipes._links && !recipes._links.next && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRandomSearch()}
          >
            More Random Recipes
          </Button>
        )}
      </div>
    </div>
  );
}
