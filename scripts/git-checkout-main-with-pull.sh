mainBranchName=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
echo "Info: Detach main branch name as: '$mainBranchName'."

git checkout $mainBranchName
echo "Info: Checkout to '$mainBranchName' branch."

git pull origin $mainBranchName
echo "Info: Pull changes from '$mainBranchName' branch."
