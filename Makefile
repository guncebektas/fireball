.PHONY: run-simple run-simple-example run

run-simple:
	@echo Running application in simple mode
	meteor --exclude-archs web.browser.legacy,web.cordova --settings settings.json --port 3001

run-simple-example:
	@echo Running application in simple mode with example settings
	meteor --exclude-archs web.browser.legacy,web.cordova --settings settings.example.json --port 3001

run:
    @echo Running application with external mongodb
    MONGO_URL=mongodb://localhost:27017/saas meteor --exclude-archs web.browser.legacy,web.cordova --settings settings.json --port 3001
