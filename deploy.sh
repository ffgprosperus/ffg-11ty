#!/bin/bash -i

# set up environment variables used by npm and Eleventy to know where to deploy
export NVM_DIR="/home/dh_3abdz7/.nvm"
export FFG_BUILD_DIR="/home/dh_3abdz7/prosperusdemo.xyz/build"

[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

# Delete the previous deploy, minus the deploy scripts
find . ! -name "deploy*" -delete

# Move to the directory where the code has been checked out
cd $FFG_TMP_DIR

# install and build the website
# the FFG_BUILD_DIR exported above will tell eleventy to put it in the correct directory
npm install &> install.txt
npm run build &> output.txt
