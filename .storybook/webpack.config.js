const config = require('../webpack.config.js').shift();

module.exports = (storybookBaseConfig, configType) => {
	storybookBaseConfig.module.rules = config.module.rules;
	return storybookBaseConfig;
};
