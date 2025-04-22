
import { Request, Response, Router } from "express";
import { signIn, signUp, logOut, refreshToken } from "../controllers/app";
import { verifyingToken, } from "../middleware/auth";


const router: Router = Router();
router.post("/register", signUp);
router.post("/login", signIn);
router.post('/refreshToken', refreshToken)
router.post('/logout', logOut)
router.get('/hidden',verifyingToken,function(req:any,res:Response) {
    if(!req.user){
        res.status(403).send({message:"invalid jsonwebtoken"})
    }
    if(req.user.role==='admin'){
        res.status(200).send({message:'congratulation!'})
    }else{
        res.status(403).send({
            message:'unauthorised access'
        })
    }
})

export default router