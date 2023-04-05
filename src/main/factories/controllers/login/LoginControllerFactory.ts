import { LoginController } from "@/presentation/controllers/LoginController";
import { Controller } from "@/presentation/protocols";
import { makeValidation } from "./LoginValidationFactory";
import { makeAuthentication } from "@/main/factories/usecases/account/DbAuthenticationFactory";

export const makeLoginController = (): Controller => {
    return new LoginController(makeValidation(), makeAuthentication());
};