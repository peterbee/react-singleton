const config = require('../webpack.config.js');

module.exports = (storybookBaseConfig, configType) => {
	storybookBaseConfig.module.rules = config.module.rules;
	return storybookBaseConfig;
};
