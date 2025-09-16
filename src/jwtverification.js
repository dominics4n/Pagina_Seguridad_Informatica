import jwt from 'jsonwebtoken';

export function verifcacionjwt(token){
    try {
        console.log("me llamaron a verificar");
        return jwt.verify(token, process.env.JWT_KEY);

    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}