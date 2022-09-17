import fp from "fastify-plugin";

export const HealthcheckPlugin = fp(async (app) => {
  app.get("/health", async (req, res) => {
    void res.send({ status: "Good" });
  });
});
