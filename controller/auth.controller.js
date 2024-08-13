export const register = async (req, res) => {
  try {
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const login = async (req, res) => {
  try {
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};
