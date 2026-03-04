import { app } from "./app.js";
import { env } from "./env/index.js";

const PORT = env.PORT || 3333

app.listen({
    port: PORT
}).then(() => { console.log(`Server running on PORT: ${PORT}`); })