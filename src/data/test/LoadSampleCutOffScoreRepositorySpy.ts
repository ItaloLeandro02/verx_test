import { LoadSampleCutOffScoreRepository, SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";

export class LoadSampleCutOffScoreRepositorySpy implements LoadSampleCutOffScoreRepository {
    async loadSampleCutOffScore(): Promise<SampleCutOffScore> {
        return Promise.resolve({
            "Cocaína": 0.5,
            "Anfetamina": 0.2,
            "Metanfetamina": 0.2,
            "MDA": 0.2,
            "MDMA": 0.2,
            "THC": 0.05,
            "Morfina": 0.2,
            "Codeína": 0.2,
            "Heroína": 0.2            
        });
    }
}