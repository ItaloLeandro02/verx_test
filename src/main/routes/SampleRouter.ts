import { Router } from "express";
import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeSampleAnalysisController } from "@/main/factories/controllers/sample/SampleAnalysisControllerFactory";

export default (router: Router): void => {
    router.post('/sample-analysis', adaptRoute(makeSampleAnalysisController()));
}