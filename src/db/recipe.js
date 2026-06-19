


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

// all data

export const getAllRecipeData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/all-recipe`)
    const result = await res.json()
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

// get single data for details page

export const getDetailsRecipeData = async (id) => {
  try {

    const res = await fetch(`${baseUrl}/api/details/${id}`, {
      cache: 'no-store' //  
    });

    if (!res.ok) {
      throw new Error("Failed to fetch recipe details");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error in getDetailsRecipeData:", error);
    return null;
  }
};