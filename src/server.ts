import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import Pool from "./dbconfig/dbconnector";
import employeeRouters from './routers/employeeRouters';
import departmentRouters from "./routers/departmentRouters";
import log from './logHandler';
class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
  }

  private dbConnect() {
    Pool.connect(function (err, client, done) {
      if (err) {
        throw new Error(err.message);
      }
      // console.log("Connected");
      log.debug("Connected to db");
    });
  }

  private routerConfig() {
    this.app.use('/employee', employeeRouters);
    this.app.use('/departments', departmentRouters);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

export default Server;
