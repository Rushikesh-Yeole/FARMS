
exports.validatePassword = (password) => {
    const errors = [];

    if (!password) {
        errors.push("Password is required.");
    } else {
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must include at least one lowercase letter.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must include at least one uppercase letter.");
        }
        if (!/\d/.test(password)) {
            errors.push("Password must include at least one number.");
        }
        if (!/[@$!%*?&]/.test(password)) {
            errors.push("Password must include at least one special character (@, $, !, %, *, ?, &).");
        }
    }

    return errors;

};
