export type SampleAnalyzeParams = {
    "codigo_amostra": string,
    "Cocaína": number,
    "Anfetamina": number,
    "Metanfetamina": number,
    "MDA": number,
    "MDMA": number,
    "THC": number,
    "Morfina": number,
    "Codeína": number,
    "Heroína": number,
    "Benzoilecgonina": number,
    "Cocaetileno": number,
    "Norcocaína": number
};
export type SampleAnalyzeResult = {
    "codigo_amostra": string,
    "result": "positivo" | "negativo"
};

export interface SampleAnalysis {
    analyze (sampleAnalyzeParams: SampleAnalyzeParams): Promise<SampleAnalyzeResult>
}