
'use server'

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

