import { SaveSampleParams } from "@/data/protocols/db/sample/SaveSampleRepository";
import { SampleAnalyzeParams } from "@/domain/usercases/sample";

export const convertSampleParamsToSaveDatabase = (params: SampleAnalyzeParams): SaveSampleParams => ({
    codigoAmostra: params.codigoAmostra,
    cocaina: parseFloat(params.cocaina),
    anfetamina: parseFloat(params.anfetamina),
    metanfetamina: parseFloat(params.metanfetamina),
    mda: parseFloat(params.mda),
    mdma: parseFloat(params.mdma),
    thc: parseFloat(params.thc),
    morfina: parseFloat(params.morfina),
    codeina: parseFloat(params.codeina),
    heroina: parseFloat(params.heroina),
    benzoilecgonina: parseFloat(params.benzoilecgonina),
    cocaetileno: parseFloat(params.cocaetileno),
    norcocaina: parseFloat(params.norcocaina)
});