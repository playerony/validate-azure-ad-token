commitMessage="$1"

if [ -z "$commitMessage" ]; then
  echo 'Error: commit message was not specified.'

  exit 1
fi

git add .
echo "Info: Staged all files."

git commit -m "$commitMessage"
echo "Info: Added the commit with message: '$commitMessage'."

currentBranch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

git push origin "$currentBranch"
echo "Info: Push changes to '$currentBranch' branch."
