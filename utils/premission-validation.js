require('dotenv').config();

const jwt = require('jsonwebtoken');

const {
    env: {
        TOKEN_SECRET
    }
} = process;

const permitValidator = (validRole) =>
    (req, res, next) => {
        const auth = req.get('authorization');

        if (!auth) {
            res.status(403).json({
                status: 'Error',
                error: "You don't have permissions."
            });
        }

        const token = auth.split(' ')[1];

        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    status: 'Error',
                    error: "Invalid token"
                });
            }

            const {
                role
            } = decoded;

            if (validRole === role) return next();

            return res.status(403).json({
                status: 'Error',
                error: "You don't have permissions."
            });
        });
    };

module.exports = permitValidator;