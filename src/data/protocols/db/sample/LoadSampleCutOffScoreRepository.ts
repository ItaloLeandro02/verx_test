export type SampleCutOffScore = {
    id: number,
    cocaina: number,
    anfetamina: number,
    metanfetamina: number,
    mda: number,
    mdma: number,
    thc: number,
    morfina: number,
    codeina: number,
    heroina: number    
};

export interface LoadSampleCutOffScoreRepository {
    loadSampleCutOffScore (): Promise<SampleCutOffScore>;
}