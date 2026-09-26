export default RecipeList = ({setMode, recipes, setRecipes, setFormData}) => {
	const isNoRecipes =  recipes.length === 0
	return(
		<article id='recipes' className="container-card large-width auto-height top">
      <h2 id = 'all-recipes' className='padding'>All Recipes</h2>
      {isNoRecipes ? (
				<p className='center-align middle-align'>No recipes yet...</p> 
			) : (
				recipes.map((recipe) =>
					<Recipe key= {recipe.id} recipe={recipe} setRecipes={setRecipes}
            setMode={setMode} setFormData={setFormData}/>
				)
			)}
    </article>
	)
}

const Recipe = ({setMode, recipe, setRecipes, setFormData}) =>{
  const handleDelete = async (idToDelete) =>{
    setRecipes(recipes.filter(recipe => recipe.id !== idToDelete))
    const response = await fetch('/remove', 
      {headers:  {'Content-Type' : 'application/json'},
        method :'POST', 
        body : JSON.stringify({_id : idToDelete})} )
  }
  const handleEdit = () =>{
    setMode('edit')
    setFormData(recipe)
  }
  return (
    <article className='secondary margin padding'>
      <h3 className="top-padding">{recipe.recipeName}</h3>
      <hr/>
      <div className="row top-padding">
        <span> Cook time: {recipe.cookTime}</span>
        <span> Difficulty: {recipe.difficulty}</span>
      </div>
      <hr/>
      <div className="grid top-align top-padding">
        <div className='l4'>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li className='no-padding'>{ingredient}</li>
            )}
          </ul>
        </div>
        <div className="l8">
          <ol>
            {recipe.instructions.map(step =>
              <li className='no-padding'>{step}</li>
            )}
          </ol>
        </div>
      </div>
      <div>
        <button type='button' className='secondary-container' onClick={handleEdit}>Edit Recipe</button>
        <button type='button' className="error" onClick={() => handleDelete(recipe.id)}>
          X
        </button>
      </div>
    </article>
  )
}