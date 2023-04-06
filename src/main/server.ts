import "module-alias/register";
import env from "@/main/config/env";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";

KnexHelper.connect()
.then(async () => {
    const app = (await import("@/main/config/app")).default;
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
})
.catch(console.error);