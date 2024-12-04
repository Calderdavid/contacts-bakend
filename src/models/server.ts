import express from "express";
import cors from "cors";
import dbConnection from "../database/config";
import bodyParser from "body-parser";


class Server {

    private app: express.Application;
    public port: number;
    public authPath: string;

    constructor(){
        this.app = express();
        this.port = Number(process.env.PORT);
        this.authPath = "/api/auth";

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConnection.sync();
    }

    middlewares(){

        this.app.use(cors()); 

        this.app.use(express.json()); 
        this.app.use(bodyParser.json());

        this.app.use(express.static("public"));
    }

    routes(){

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log("Server is running on port", this.port);
        })
    }
}

export default Server;