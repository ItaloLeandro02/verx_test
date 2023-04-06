import { Knex } from "knex";
import { LoadSampleCutOffScoreRepository, SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { SaveSampleParams, SaveSampleRepository } from "@/data/protocols/db/sample/SaveSampleRepository";
import { LoadHistoricalsSampleRepository, LoadHistoricalsSampleRepositoryParams } from "@/data/protocols/db/sample/LoadHistoricalsSampleRepository";
import { HistoricalSample } from "@/domain/usercases/sample/GetHistoricalSamples";

export class SampleKnexRepository implements LoadSampleCutOffScoreRepository, SaveSampleRepository, LoadHistoricalsSampleRepository {
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

    async saveSample(saveSample: SaveSampleParams, result: "positivo" | "negativo"): Promise<void> {
        await this.connection('samples').insert({ ...saveSample, result });
    }

    async loadHistoricals(params: LoadHistoricalsSampleRepositoryParams): Promise<HistoricalSample[]> {
        const historicalsData = await this.connection('samples').limit(params.limit).offset(params.offset);
        return historicalsData.map(historicalData => ({
            id: parseInt(historicalData.id),
            codigoAmostra: historicalData.codigoAmostra,
            cocaina: parseFloat(historicalData.cocaina),
            anfetamina: parseFloat(historicalData.anfetamina),
            metanfetamina: parseFloat(historicalData.metanfetamina),
            mda: parseFloat(historicalData.mda),
            mdma: parseFloat(historicalData.mdma),
            thc: parseFloat(historicalData.thc),
            morfina: parseFloat(historicalData.morfina),
            codeina: parseFloat(historicalData.codeina),
            heroina: parseFloat(historicalData.heroina),
            benzoilecgonina: parseFloat(historicalData.benzoilecgonina),
            cocaetileno: parseFloat(historicalData.cocaetileno),
            norcocaina: parseFloat(historicalData.norcocaina),
            result: historicalData.result
        }));
    }
}