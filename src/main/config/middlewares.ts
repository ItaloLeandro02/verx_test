import { Express } from "express";
import { bodyParser, contentType } from "@/main/middlewares";

export default (app: Express): void => {
    app.use(bodyParser);
    app.use(contentType);
}