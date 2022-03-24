import jwt from 'jsonwebtoken';

function jwtTokens(id: number, email: string, name: string): any {
    const user = {id, email, name};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1d'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '365d'});
    return { accessToken, refreshToken };
}

// export { jwtTokens }
export default jwtTokens;

