

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
      cache: 'no-store'
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

// ============================================
// USER RECIPE CRUD
// ============================================

// Get recipe count for limit check
export const getRecipeCount = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipe-count/${email}`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error getting recipe count:", error);
    return { count: 0 };
  }
};

// Get user's own recipes
export const getMyRecipes = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/my-recipes/${email}`, {
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    return [];
  }
};

// Add new recipe
export const addRecipe = async (recipeData) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData),
    });
    const result = await res.json();
    if (!res.ok) {
      return { error: true, ...result };
    }
    return result;
  } catch (error) {
    console.error("Error adding recipe:", error);
    return { error: true, message: "Failed to add recipe" };
  }
};

// Update recipe
export const updateRecipe = async (id, recipeData) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipe/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error updating recipe:", error);
    return null;
  }
};

// Delete recipe
export const deleteRecipe = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipe/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return null;
  }
};

// ============================================
// FAVORITES
// ============================================

// Get user favorites
export const getUserFavorites = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/favorites/${email}`, {
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

// Add to favorites
export const addToFavorites = async (userEmail, recipeId) => {
  try {
    const res = await fetch(`${baseUrl}/api/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail, recipeId }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return null;
  }
};

// Remove from favorites
export const removeFromFavorites = async (userEmail, recipeId) => {
  try {
    const res = await fetch(`${baseUrl}/api/favorites`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail, recipeId }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return null;
  }
};

// ============================================
// USER STATS
// ============================================

export const getUserStats = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/user-stats/${email}`, {
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return { totalRecipes: 0, totalFavorites: 0, totalLikes: 0, isPremium: false };
  }
};

// ============================================
// ADMIN ENDPOINTS
// ============================================

// Get all users (admin)
export const getAllUsers = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/users`, {
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Update user (admin)
export const updateUser = async (id, data) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

// Delete user (admin)
export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

// Get all recipes (admin)
export const getAdminRecipes = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/recipes`, {
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching admin recipes:", error);
    return [];
  }
};

// Delete recipe (admin)
export const adminDeleteRecipe = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/recipes/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return null;
  }
};

// Get admin stats
export const getAdminStats = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/stats`, {
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return { totalUsers: 0, totalRecipes: 0, premiumMembers: 0, totalFavorites: 0 };
  }
};

// Get admin reports
export const getAdminReports = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/reports`, {
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return { recipesByCategory: [], topRecipes: [], totalUsers: 0, totalRecipes: 0 };
  }
};