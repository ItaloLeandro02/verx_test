export type SampleAnalyzeParams = {
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
};
export type SampleAnalyzeResult = {
    codigoAmostra: string,
    result: "positivo" | "negativo"
};

export interface SampleAnalysis {
    analyze (sampleAnalyzeParams: SampleAnalyzeParams): Promise<SampleAnalyzeResult>
}