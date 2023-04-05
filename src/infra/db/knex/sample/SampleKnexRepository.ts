import { Knex } from "knex";
import { LoadSampleCutOffScoreRepository, SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { SaveSampleRepository } from "@/data/protocols/db/sample/SaveSampleRepository";
import { SampleAnalyzeParams } from "@/domain/usercases/sample";

export class SampleKnexRepository implements LoadSampleCutOffScoreRepository, SaveSampleRepository {
    constructor(
        private readonly connection: Knex
    ) {}
    
    async loadSampleCutOffScore(): Promise<SampleCutOffScore> {
        const sampleCutOffScoreData = await this.connection('sample_cut_off_scores').first();
        const sampleCutOffScore: SampleCutOffScore = {
            id: parseInt(sampleCutOffScoreData.id),
            cocaina: parseFloat(sampleCutOffScoreData.cocaina),
            anfetamina: parseFloat(sampleCutOffScoreData.anfetamina),
            metanfetamina: parseFloat(sampleCutOffScoreData.metanfetamina),
            mda: parseFloat(sampleCutOffScoreData.mda),
            mdma: parseFloat(sampleCutOffScoreData.mdma),
            thc: parseFloat(sampleCutOffScoreData.thc),
            morfina: parseFloat(sampleCutOffScoreData.morfina),
            codeina: parseFloat(sampleCutOffScoreData.codeina),
            heroina: parseFloat(sampleCutOffScoreData.heroina)
        };
        return sampleCutOffScore;
    }

    async saveSample(saveSample: SampleAnalyzeParams, result: "positivo" | "negativo"): Promise<void> {
        await this.connection('samples').insert({ ...saveSample, result });
    }
}