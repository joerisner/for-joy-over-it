.DEFAULT_GOAL=help
.PHONY: check clean dev help setup stop test

check: ## Check the project for type and format errors
	@npm run format
	@npx astro sync && npx astro check

clean: ## Remove temporary artifacts
	@printf "\033[34;1mCleaning up the project...\033[0m\n"
	@bin/clean

dev: setup ## Start the development server
	@printf "\033[34;1mStarting the dev server...\033[0m\n"
	npx astro dev

help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; \
	printf "\nMake targets:\n\033[35m\033[0m"} /^[$$()% a-zA-Z_-]+:.*?##/ { \
	printf "  \033[35;1m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { \
	printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

setup: ## Install and setup dependencies
	@printf "\033[34;1mInstalling dependencies...\033[0m\n"
	npm install
	@printf "\033[34;1mStarting highlights-api dependency in a container...\033[0m\n"
	@open -a Docker && while (! docker stats --no-stream &> /dev/null ); do sleep 1; done && docker compose up -d

stop: ## Stop running all dependencies
	@docker compose down

test: ## Execute the test suite
	@printf "\033[34;1mExecuting tests...\033[0m\n"
	npm run vitest
	npm run playwright
