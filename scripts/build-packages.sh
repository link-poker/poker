#!/bin/bash

# Move to the packages directory
cd ./packages

# Loop through each directory in ./packages
for dir in */ ; do
    # Remove the trailing slash from the directory name
    dir=${dir%*/}
    # Run the build command for each directory
    echo "Building package: $dir"
    pnpm run $dir build
done

# Return to the original directory
cd ..
