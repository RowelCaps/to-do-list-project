import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { redirect } from 'react-router-dom';

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
    user:"postgres",
    host: "localhost",
    database: "To_Do_List_Database",
    password: "tcoM4y0/9]rF",
    port:5432,
})

db.connect();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/login", async(req,res) => {

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({success: false, message:'Username and password is requred'});
    }

    try{
        const user = {email: email};
        
        const accessToken = generatedAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '90d'});
        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
        const result = await db.query('SELECT * from user_account WHERE email=$1 AND password =$2', [email, password]);

        if(result.rows.length > 0){
            res.status(200).json({success: true, message:'Login successfully', accessToken: accessToken, refreshToken: refreshToken});
        } else {
            res.status(401).json({success: false, message: 'Invalid Username or Password'})
        }

    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
});

app.get("api/schedule/:id/:date", cookieJwAuth, async(req,res) => {

    const dateString = req.params.date;
    const dateObject = new Date(dateString);
});``

app.post("/api/schedule", async (req, res) => {
    const date = req.body.date;
    const userId = req.body.id;
    const time = req.body.time;
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;

    try{
        const result = await db.query('\
        INSERT INTO user_task (user_id, task_date, task_time, task_name, task_description) \
        VALUES ($1, $2, $3, $4, $5)',
         [userId, date, time, taskName, taskDescription]);
         
         console.log(result);
         res.status(200).json({success: true, message: 'Successfully posted new task!'});
    } catch(err){
        res.status(401).json({success: false, message: "Internal Server Error"});
    }
});

function cookieJwAuth(req, res, next) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    try{
        const decodedToken = jwt.verify(accessToken, env.process.ACCESS_TOKEN_SECRET);

        const isTokenExpired = decodedToken.exp < Date.now() / 1000;

        if(isTokenExpired){

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.redirect("/login");
    
                const newAccessToken = generatedAccessToken({email: user.email});

                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                });
                
                next();
            });
        } else {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            redirect("/login");
        }
    } catch(err){
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        redirect("/login");
    }
}

function generatedAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
}

app.listen(port, () => {
    console.log(`Listening to PORT ${port}` );
})