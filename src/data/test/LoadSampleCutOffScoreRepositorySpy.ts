import { LoadSampleCutOffScoreRepository, SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";

export class LoadSampleCutOffScoreRepositorySpy implements LoadSampleCutOffScoreRepository {
    mockSampleCutOffResult: SampleCutOffScore = {
        "Cocaína": 0.5,
        "Anfetamina": 0.2,
        "Metanfetamina": 0.2,
        "MDA": 0.2,
        "MDMA": 0.2,
        "THC": 0.05,
        "Morfina": 0.2,
        "Codeína": 0.2,
        "Heroína": 0.2            
    }; 
    
    async loadSampleCutOffScore(): Promise<SampleCutOffScore> {
        return Promise.resolve(this.mockSampleCutOffResult);
    }
}