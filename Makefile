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


# Installs deps & runs server with your custom code
run: install
	@echo "Starting API server..."
	@NODE_PATH=. DEBUG=$(DEBUG) $(BABEL) index.js

# Runs mocha on basic tests (must have main server running)
test:
	@echo "Starting tests..."
	@NODE_PATH=. $(MOCHA) --compilers js:babel/register ./test/index.test.js
	@echo "Done testing.\n"

# Installs deps
install:
	@echo "Installing dependencies..."
	@npm install
	@echo "Done installing dependencies.\n"

# Runs ESLint
lint:
	@echo "Running code linter... \n"
	@$(ESLINT) *.js lib
	@echo "Done.\n"

# Installs deps & runs example server
example: install
	@echo "Starting example API..."
	@NODE_PATH=. DEBUG=$(DEBUG) $(BABEL) examples/index.js

# Runs mocha on example tests (must have example running)
test-example:
	@echo "Starting tests..."
	@NODE_PATH=. $(MOCHA) --compilers js:babel/register ./test/example.test.js
	@echo "Done testing.\n"

# Cleans deps
clean:
	@echo "Cleaning up..."
	@rm -rf node_modules
	@echo "Done cleaning up.\n"


.PHONY: clean test install