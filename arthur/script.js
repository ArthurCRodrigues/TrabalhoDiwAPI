const username = 'ArthurCRodrigues';
const githubApiUrl = `https://api.github.com/users/${username}`;
const reposApiUrl = `https://api.github.com/users/${username}/repos`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(githubApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('name').textContent = data.name;
            document.getElementById('username').textContent = data.login;
            document.getElementById('bio').textContent = data.bio;
            document.getElementById('location').textContent = data.location;
            document.getElementById('joined').textContent = `Joined ${new Date(data.created_at).toLocaleDateString()}`;
            document.getElementById('linkedin').href = `https://www.linkedin.com/in/arthurcarvalh0/`;
        })
        .catch(error => console.error('Error fetching GitHub user data:', error));

    fetch(reposApiUrl)
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById('repo-list');
            data.slice(0, 6).forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.classList.add('repository');
                repoItem.innerHTML = `
                    <div>
                        <h4>${repo.name}</h4>
                        <p>${repo.description || ''}</p>
                    </div>
                    <span class="repo-language">${repo.language}</span>
                `;
                repoList.appendChild(repoItem);
            });
        })
        .catch(error => console.error('Error fetching GitHub repositories:', error));
});
