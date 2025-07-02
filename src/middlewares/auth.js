import jwt from "jsonwebtoken"

const senha = 'senha'

export function gerarToken(payload){
    return jwt.sign(payload,senha,{expiresIn: '5s'})
}

export function verificarJWT(req,res,next){
    const authHeader = req.headers['authorization']

    if(!authHeader)
        res.status(401).json({erro:'Acesso não autorizado'})

    const token = authHeader.split(' ')[1]
    if(!token)
        res.status(403).json({erro: 'token inválido ou expirado'})

    jwt.verify(token,senha,(err)=>{
        if(err){
            return res.status(403).json({erro: 'token inválido ou expirado'})
        }

        next()
    })
}