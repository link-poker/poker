#!/bin/bash
set -e

# Receive the app name and the version as arguments
app="$1"
update_type="$2"

# Retrieve the last tag for the app
last_tag=$(git describe --tags --match "${app}-*" --abbrev=0)

# Calculate the new version
version=$(echo "${last_tag}" | sed -e "s/^${app}-v//")
IFS='.' read -r -a version_parts <<< "$version"
major=${version_parts[0]}
minor=${version_parts[1]}
patch=${version_parts[2]}
case $update_type in
  major)
    major=$((major + 1))
    minor=0
    patch=0
    ;;
  minor)
    minor=$((minor + 1))
    patch=0
    ;;
  patch)
    patch=$((patch + 1))
    ;;
  *)
    echo "Invalid version argument. Please provide a valid update type: major | minor | patch"
    exit 1
    ;;
esac
version="${major}.${minor}.${patch}"


# Check if there are changes in the app
if git diff --name-only ${last_tag}..HEAD | grep -q "apps/${app}"; then

  # Retrieve the commit history since the last tag
  commit_history=$(git log ${last_tag}..HEAD --pretty=format:"- %s" -- apps/${app})

  # Create a new tag with the app name and the commit message
  new_tag="${app}-v${version}"
  new_tag_message=$(cat <<EOF
${new_tag} Release Notes

Changes
${commit_history}
EOF
)

  # Create the new tag
  git tag -a "${new_tag}" -m "${new_tag_message}"

  echo "New tag ${new_tag} has been created with the commit history for apps/${app} since ${last_tag}."
  echo "${new_tag_message}"
else
  echo "No changes in apps/${app} since the last ${app} tag. No new tag created."
fi
