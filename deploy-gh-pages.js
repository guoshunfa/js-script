/**
 * Deploy the dist folder to GitHub Pages
 * 
 * 使用方法：
 * 1. 将当前js脚本复制到git项目根目录下
 * 2. 修改repoUrl为你的GitHub仓库地址
 * 3. 修改branchName为你想要部署的分支名（默认为gh-pages）
 * 4. 修改distDir为你的构建输出目录（默认为dist）
 * 5. 运行脚本
 * 6. 使用bun或者nodejs直接执行当前js脚本，bun deploy-gh-pages.js
 */
import { execSync } from 'child_process';

const repoUrl = 'git@github.com:<user_name>/<address>.git';
const branchName = 'gh-pages';
const distDir = 'dist';
const buildCommand = 'bun run build';

function runCommand(command) {
    try {
        const output = execSync(command, { stdio: 'inherit' });
        return output;
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        process.exit(1);
    }
}

runCommand(buildCommand);

process.chdir(distDir);

runCommand('git init');
runCommand(`git remote add origin ${repoUrl}`);
runCommand(`git checkout -b ${branchName}`);
runCommand('git add .');
runCommand('git commit -m "Deploy dist folder to GitHub Pages"');
runCommand(`git push -u origin ${branchName}`);

console.log('successfully deployed to GitHub Pages');