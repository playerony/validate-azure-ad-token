# clear old documentation files
npx rimraf etc
npx rimraf docs
npx rimraf temp

# clear old build files
npx rimraf dist
npx rimraf tsconfig.tsbuildinfo

# make a new build
yarn tsc

# build a new documentation
yarn api-extractor run
yarn api-documenter markdown -i temp -o docs

# format created documentation
yarn format
