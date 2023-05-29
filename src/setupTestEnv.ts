import { GetEnvVars } from "env-cmd";

export default async () => {
  Object.entries(await GetEnvVars()).forEach(([key, value]) => (process.env[key] = value));
};
