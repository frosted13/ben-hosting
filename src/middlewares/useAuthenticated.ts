import {Request, Response, NextFunction} from "express"

export function useAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization !== process.env.API_KEY) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }

    next()
}