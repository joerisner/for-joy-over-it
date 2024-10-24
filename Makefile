.DEFAULT_GOAL=start

help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; \
	printf "\nUsage:\n\033[36m\033[0m"} /^[$$()% a-zA-Z_-]+:.*?##/ { \
	printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { \
	printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

setup: ## Install dependencies
	@printf "\033[34;1mInstalling dependencies...\033[0m\n"
	npm install

build: setup ## Build the application
	@printf "\033[34;1mBuilding Astro project...\033[0m\n"
	npx astro build
	
start: setup ## Start the development server
	@printf "\033[34;1mStarting the dev server...\033[0m\n"
	npx astro dev

.PHONY: test
test: build  ## Execute the test suite
	@printf "\033[34;1mExecuting tests...\033[0m\n"
	npx playwright test

clean: ## Remove temporary artifacts
	@printf "\033[34;1mCleaning up the project...\033[0m\n"
	bin/clean
