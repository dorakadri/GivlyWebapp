import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const store = useSelector((state) => state?.users);
    const id = store.userAuth._id;
    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        setSavedRecipes(savedRecipes);
    }, []);


    return (
        <div>

            {savedRecipes.map((recipe,i) => {
                return (
                    <div>{
                        recipe.id===id &&   (
                <div key={i}>
                <h3>{recipe.recipe.title}</h3>
                <img src={recipe.recipe.image} alt={recipe.recipe.title} />
                </div> )
                    }
                    </div>
                )

            })}
        </div>
    );
}


export default SavedRecipes;
