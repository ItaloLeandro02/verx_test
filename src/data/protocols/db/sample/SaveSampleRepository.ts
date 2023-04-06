export type SaveSampleParams = {
    codigoAmostra: string,
    cocaina: number,
    anfetamina: number,
    metanfetamina: number,
    mda: number,
    mdma: number,
    thc: number,
    morfina: number,
    codeina: number,
    heroina: number,
    benzoilecgonina: number,
    cocaetileno: number,
    norcocaina: number
}

export interface SaveSampleRepository {
    saveSample (saveSample: SaveSampleParams, sampleResult: "positivo" | "negativo"): Promise<void>;
}