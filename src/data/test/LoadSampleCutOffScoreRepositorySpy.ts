import { LoadSampleCutOffScoreRepository, SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";

export class LoadSampleCutOffScoreRepositorySpy implements LoadSampleCutOffScoreRepository {
    mockSampleCutOffResult: SampleCutOffScore = {
        id: 1,
        cocaina: 0.5,
        anfetamina: 0.2,
        metanfetamina: 0.2,
        mda: 0.2,
        mdma: 0.2,
        thc: 0.05,
        morfina: 0.2,
        codeina: 0.2,
        heroina: 0.2            
    }; 
    
    async loadSampleCutOffScore(): Promise<SampleCutOffScore> {
        return Promise.resolve(this.mockSampleCutOffResult);
    }
}