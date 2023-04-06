export type GetHistoricalSamplesParams = {
    limit?: string;
    offset?: string;
};
export type HistoricalSample = {
    id: number,
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
    norcocaina: number,
    result: string
};

export interface GetHistoricalSamples {
    getHistorical (params: GetHistoricalSamplesParams): Promise<HistoricalSample[]>;
}