import { Router } from "express";
import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { auth } from "@/main/middlewares";
import { makeSampleAnalysisController } from "@/main/factories/controllers/sample/SampleAnalysisControllerFactory";
import { makeGetSamplesController } from "@/main/factories/controllers/sample/makeGetSamplesControllerFactory";

export default (router: Router): void => {
    router.post('/sample-analysis', auth, adaptRoute(makeSampleAnalysisController()));
    router.get('/sample-historicals', auth, adaptRoute(makeGetSamplesController()));
}