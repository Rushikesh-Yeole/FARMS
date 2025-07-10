exports.validateInput = (req, res, next) => {
    const { firstName, lastName, contactNumber, email } = req.body;

    // Validation patterns
    const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
    const contactRegex = /^\+?[0-9]{10,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate first name if provided
    if (firstName !== undefined) {
        const sanitizedFirstName = firstName.trim();
        if (!nameRegex.test(sanitizedFirstName)) {
            return res.status(400).json({
                success: false,
                message: "Invalid first name. It must only contain letters, spaces, or hyphens, and be between 2 to 50 characters.",
            });
        }
    }

    // Validate last name if provided
    if (lastName !== undefined) {
        const sanitizedLastName = lastName.trim();
        if (!nameRegex.test(sanitizedLastName)) {
            return res.status(400).json({
                success: false,
                message: "Invalid last name. It must only contain letters, spaces, or hyphens, and be between 2 to 50 characters.",
            });
        }
    }

    // Validate contact number if provided
    // if (contactNumber !== undefined) {
    //     const sanitizedContactNumber = contactNumber.trim();
    //     if (!contactRegex.test(sanitizedContactNumber)) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Invalid contact number. It must only contain 10 to 15 digits.",
    //         });
    //     }
    // }

    // Validate email if provided
    if (email !== undefined) {
        const sanitizedEmail = email.trim().toLowerCase();
        if (!emailRegex.test(sanitizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address.",
            });
        }
    }

    // Proceed to the next middleware if all validations pass
    next();
};
