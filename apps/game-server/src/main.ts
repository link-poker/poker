import { createApp } from './app';
import { APP_CONFIG } from './config/app';

const main = async () => {
  const app = await createApp();
  try {
    await app.listen({ port: APP_CONFIG.port, host: APP_CONFIG.host });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
