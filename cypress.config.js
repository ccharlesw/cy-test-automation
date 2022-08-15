const { defineConfig } = require("cypress");
const esbuildBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const cucumberPreprocessor = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const esbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    // set viewport to macbook-15 inch
    viewportWidth: 1440,
    viewportHeight: 900,

    async setupNodeEvents(on, config) {
      
      const bundler = esbuildBundler({
        plugins: [esbuildPlugin(config)],
      });
      
      on("file:preprocessor", bundler);
      await cucumberPreprocessor(on, config);

      return config;
    },
    baseUrl: "https://www.pokerstars.uk",
    "specPattern": "**/*.{feature, features}"
  }
});
