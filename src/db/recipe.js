


const baseUrl = process.env.NEXT_PULIC_SERVER_URL;

export const getPupolarRecipe = async () => {

  try {

    const respons = await fetch(`${baseUrl}/api/recipe`)

    const result = await respons.json()
    return result


  } catch (error) {
    console.log(error)
  }

}


export const gerFeaturedRecipe = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/featured-recipe`)

    const result = await res.json()
    return result

  } catch (error) {

    console.log(error)

  }
}

