const app = require('./app'); // the actual Express application
const config = require('./config/config');
const logger = require('./config/logger');

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
