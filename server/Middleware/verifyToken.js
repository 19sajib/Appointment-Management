import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secret, (err, user) => {
            if(err) return res.status(403).json('Token is not valid.')
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json('You are not authticated.')
    }
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!')
        }
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!')
        }
    })
}

