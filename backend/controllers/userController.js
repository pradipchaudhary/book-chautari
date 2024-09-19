// @desc    Create a new user
// @route   GET /api/user
// @access  Public

export const createUser = (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role);
};
