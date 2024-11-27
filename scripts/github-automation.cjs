const simpleGit = require('simple-git');
const { execSync } = require('child_process');
const git = simpleGit();

/**
 * Create a new tag and push it to the remote repository according to the latest version in package.json.
 * @returns {Promise<void>}
 */
async function createTagAndPush() {
    try {
        // Generate the changelog
        execSync('npm run changelog', { stdio: 'inherit' });

        // Get the latest version from package.json
        const { version } = require('../package.json');

        // Create a new tag
        await git.addTag(`v${version}`);

        // Push the new tag
        await git.pushTags('origin');

        console.log(`Tag v${version} created and pushed successfully.`);
    } catch (error) {
        console.error('Error creating and pushing tag:', error);
    }
}

createTagAndPush();