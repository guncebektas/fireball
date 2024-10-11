.PHONY: run-simple run-simple-example

run-simple:
	@echo Running application in simple mode
	meteor -s settings.json

run-simple-example:
	@echo Running application in simple mode
	meteor -s settings.example.json
