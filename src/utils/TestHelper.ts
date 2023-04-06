import { faker } from "@faker-js/faker";
import { sign } from "jsonwebtoken";
import { SampleAnalyzeParams } from "@/domain/usercases/sample";
import { SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { SaveSampleParams } from "@/data/protocols/db/sample/SaveSampleRepository";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import { AuthenticationParams } from "@/domain/usercases/account";
import { GetHistoricalSamplesParams } from "@/domain/usercases/sample/GetHistoricalSamples";
import env from "@/main/config/env";

export const mockSampleAnalyzeParams = (): SampleAnalyzeParams => ({
    codigoAmostra: "02383322",
    cocaina: "0.678",
    anfetamina: "0.1",
    metanfetamina: "0.1",
    mda: "0.1",
    mdma: "0",
    thc: "0.01",
    morfina: "0.01",
    codeina: "0.01",
    heroina: "0.01",
    benzoilecgonina: "0",
    cocaetileno: "0",
    norcocaina: "0"
});
export const mockSampleCutOffData = (): SampleCutOffScore => ({
    id: 1,
    cocaina: 0.5,
    anfetamina: 0.1,
    metanfetamina: 0.1,
    mda: 0.1,
    mdma: 0.02,
    thc: 0.05,
    morfina: 0.05,
    codeina: 0.02,
    heroina: 0.02
}); 
export const mockDefaultSampleCuttOffScore = (): SampleCutOffScore => ({
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
});
export const mockSampleInsert = (): SaveSampleParams & { result: "positivo" | "negativo" } => ({
    codigoAmostra: "02383322",
    cocaina: 0.678,
    anfetamina: 0.1,
    metanfetamina: 0.1,
    mda: 0.1,
    mdma: 0,
    thc: 0.1,
    morfina: 0.1,
    codeina: 0.1,
    heroina: 0.1,
    benzoilecgonina: 0,
    cocaetileno: 0,
    norcocaina: 0,
    result: "positivo"
});
export const mockuthenticationParams = (): AuthenticationParams => ({
    email: faker.internet.email(),
    password: faker.internet.password()
});
export const mockGetHistoricalSamplesParams = (): GetHistoricalSamplesParams => ({
    limit: "10",
    offset: "0"
});

export const insertSample = async (): Promise<void> => {
    await KnexHelper.connection('samples')
    .insert(mockSampleInsert());
};

export const makeAccessToken = async (): Promise<string> => {
    const saveParams = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    await KnexHelper.connection('accounts').insert(saveParams);
    const account = await KnexHelper.connection('accounts').where('email', saveParams.email).first();
    const accessToken = sign({ id: account.id }, env.jwtSecret);
    await KnexHelper.connection('accounts').update({ accessToken: accessToken }).where('id', account.id);
    return accessToken;
}
