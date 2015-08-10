#
# DemocracyOS Makefile
#

BABEL="./node_modules/.bin/babel-node"
MOCHA="./node_modules/.bin/mocha"
ESLINT="./node_modules/eslint/bin/eslint.js"

ifndef DEBUG
	DEBUG="api-starter*"
endif

ifndef NODE_ENV
	NODE_ENV="development"
endif

run: install
	@echo "Starting API server..."
	@NODE_PATH=. DEBUG=$(DEBUG) $(BABEL) index.js

example: install
	@echo "Starting example API..."
	@NODE_PATH=. DEBUG=$(DEBUG) $(BABEL) examples/index.js

install:
	@echo "Installing dependencies..."
	@npm install
	@echo "Done installing dependencies.\n"

lint:
	@echo "Running code linter... \n"
	@$(ESLINT) *.js lib
	@echo "Done.\n"

test-example:
	@echo "Starting tests..."
	@$(MOCHA) --compilers js:babel/register ./test/example.test.js
	@echo "Done testing.\n"

clean:
	@echo "Cleaning up..."
	@rm -rf node_modules
	@echo "Done cleaning up.\n"


.PHONY: clean test install