export type SampleCutOffScore = {
    "Cocaína": number,
    "Anfetamina": number,
    "Metanfetamina": number,
    "MDA": number,
    "MDMA": number,
    "THC": number,
    "Morfina": number,
    "Codeína": number,
    "Heroína": number    
};

export interface LoadSampleCutOffScoreRepository {
    loadSampleCutOffScore (): Promise<SampleCutOffScore>;
}