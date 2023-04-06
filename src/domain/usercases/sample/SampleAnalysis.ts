export type SampleAnalyzeParams = {
    codigoAmostra: string,
    cocaina: string,
    anfetamina: string,
    metanfetamina: string,
    mda: string,
    mdma: string,
    thc: string,
    morfina: string,
    codeina: string,
    heroina: string,
    benzoilecgonina: string,
    cocaetileno: string,
    norcocaina: string
};
export type SampleAnalyzeResult = {
    codigoAmostra: string,
    result: "positivo" | "negativo"
};

export interface SampleAnalysis {
    analyze (sampleAnalyzeParams: SampleAnalyzeParams): Promise<SampleAnalyzeResult>
}