import { Router } from "express";
import { makeLoginController } from "@/main/factories/controllers/login/LoginControllerFactory";
import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";

export default (router: Router): void => {
    router.post('/login', adaptRoute(makeLoginController()));
}