import jwt from 'jsonwebtoken';

export function verifcacionjwt(token){
    try {
        //Intenta verificar el token y regresar JSON de contenido
        return jwt.verify(token, process.env.JWT_KEY);

    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}