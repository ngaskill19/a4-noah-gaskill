export default RecipeForm = ({mode, setMode, formData, setFormData, setRecipes, recipes}) =>{
	const [ingredientList, setIngredientList] = useState([])
	const [instructionList, setInstructionList] = useState([])

	//prefill list fields if 
	if(formData){
		setIngredientList(formData.ingredients)
		setInstructionList(formData.instructions)
	}

	const handleSubmit = async (event) =>{
		const nameInput = document.querySelector( '#recipe-name' )
  	const timeInput = document.querySelector('#cook-time')
		const listOfIngredients = ingredientList.map(item => item.name)
		const listOfInstructions = instructionList.map(item => item.name)
		
		const json = { recipeName: nameInput.value, 
    	ingredients : listOfIngredients,
    	instructions : listOfInstructions,  
    	cookTime : parseInt(timeInput.value)}
		
		let route = '/add'
		if(formData){
			json._id = formData.id
			route = '/update'
		}

		const body = JSON.stringify( json )
  	console.log(`Sending ${body}`)
  	const response = await fetch( route, {
    	headers:  {'Content-Type' : 'application/json'},
    	method:'POST',
    	body : body
  	})

		const recipe = await response.json()
  	console.log(recipe)
		setIngredientList([])
		setInstructionList([])
		//if add mode, add recipe to top
		if(mode === 'add'){
			setRecipes([recipe, ...recipes])
		}
		//else in edit mode, find the recipe index and replace it with the updated recipe
		else{
			const index = recipes.findIndex(recipe => recipe.id === formData.id)
			setRecipes(oldRecipes =>{
				newRecipes = [...oldRecipes]
				newRecipes[index] = recipe
				return newRecipes
			})
			setFormData(null)
			setMode('add')
		}
	}

	return (
		<article className="padding auto-height container-card medium-width">
      <form id='form' onSubmit = {handleSubmit}>
        <h2>
					{mode === 'add' ? 'Add Recipe' : `Editing Recipe for ${formData.recipeName}` }
				</h2>
        <div className="field label">
          <input type='text' id='recipe-name' defaultValue={formData ? formData.recipeName : ''} minLength = {1}/>
          <label for='recipe-name'><strong>Recipe Name:</strong></label>
        </div>
        <div className="field label">
          <input type='number' id='cook-time' defaultValue={formData ? formData.cookTime : 0} min = {1} />
          <label for='cook-time'><strong>Cook time:</strong> </label>
        </div>
				<ListInputField type = 'ingredient' list = {ingredientList} setList={setIngredientList}/>
				<ListInputField type = 'instruction' list = {instructionList} setList={setInstructionList}/>
        <div className="right-align">
          <button id="submit" class = 'submit' data-action="submit">
					{mode === 'add' ? 'Submit Recipe' : 'Save Changes' }
		    </button>
        </div>
      </form>
    </article>
	)
}

const ListInputField = ({type, list, setList}) =>{
	const [text, setText] = useState('')
	
	const handleAdd = (itemText) =>{
		const input = document.querySelector(`#${type}`)

		const newItem = {
			id : crypto.randomUUID(),
			name : itemText
		}
		setList([...list, newItem] )
		setText('')
		input.focus()
		input.select()
	}
	const handleDelete = (itemId) =>{
		setList(list.filter(item => item.id !==itemId))
	}

	return(
		<>
			<div className="field padding">
      	<label for={type}><strong>Ingredients:</strong></label>
        <textarea id={type} minlength = {1} placeholder={`Enter an ${type}`} 
					onChange={(e) => setText(e.target.value)}>
				</textarea>
        <output>Enter ingredients one by one</output>
      </div>
      <div>
        <button type='button' className='tertiary add' 
					onClick = {e => handleAdd(text)}>Add {type}</button>
      </div>
      <div className="padding">
        <ul id={`${type}-list`} className="list border">
					{list.map((listitem) =>{
						<li key={listitem.id}>
							<div className='row'>
								<span className='max'>listitem.name</span>
								<button className='error' type='button' 
									onClick={(e => handleDelete(listitem.id))}>X</button>
							</div>
						</li>
					})}
				</ul>
      </div>
		</>	
	)
}