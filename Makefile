.PHONY: run-simple run-simple-example run

run-simple:
	@echo Running application in simple mode
	BRAND=$$(node scripts/get-brand.js settings.json) meteor --exclude-archs web.browser.legacy,web.cordova --settings settings.json --port 3001

run-simple-example:
	@echo Running application in simple mode with example settings
	BRAND=$$(node scripts/get-brand.js settings.example.json) meteor --exclude-archs web.browser.legacy,web.cordova --settings settings.example.json --port 3001

run:
	@echo Running application with external mongodb
	BRAND=$$(node scripts/get-brand.js settings.json) MONGO_URL=mongodb://localhost:27017/fireball meteor --exclude-archs web.browser.legacy,web.cordova --settings settings.json --port 3001
