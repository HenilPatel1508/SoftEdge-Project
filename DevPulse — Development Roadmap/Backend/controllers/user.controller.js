import  supabase  from "../config/supabaseClient.js";

/**
 * 🔥 GET LOGGED IN USER PROFILE
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, avatar, created_at, updated_at")
      .eq("id", userId)
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      user: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * 🔥 UPDATE USER PROFILE
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, avatar } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        name,
        avatar,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};