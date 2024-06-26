let currentIndex = 0;

function showSlide(carousel, index) {
    const images = carousel.querySelector('.carousel-images');
    const totalImages = images.querySelectorAll('img').length;
    if (index >= totalImages) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalImages - 1;
    } else {
        currentIndex = index;
    }
    images.style.transform = `translateX(-${currentIndex * 100 / totalImages}%)`;
}

function nextSlide(button) {
    const carousel = button.closest('.carousel');
    showSlide(carousel, currentIndex + 1);
}

function prevSlide(button) {
    const carousel = button.closest('.carousel');
    showSlide(carousel, currentIndex - 1);
}

// Fetch GitHub user info
fetch('https://api.github.com/users/ArthurCRodrigues')
    .then(response => response.json())
    .then(data => {
        const githubMainInfo = document.querySelector('.github-main-info');
        githubMainInfo.innerHTML = `
            <img src="${data.avatar_url}" alt="${data.name}">
            <h2>${data.name}</h2>
            <p>${data.login}</p>
            <p>${data.bio}</p>
        `;

        const githubAdditionalInfo = document.querySelector('.github-additional-info');
        const joinDate = new Date(data.created_at).toLocaleDateString();
        githubAdditionalInfo.innerHTML = `
            <p>Location: ${data.location}</p>
            <p>Joined: ${joinDate}</p>
        `;

        const githubLinkedin = document.querySelector('.github-linkedin');
        githubLinkedin.innerHTML = `
            <a href="https://www.linkedin.com/in/arthurcarvalh0/" target="_blank">LinkedIn Profile</a>
        `;
    })
    .catch(error => console.error('Error fetching GitHub data:', error));

// Fetch GitHub repositories
fetch('https://api.github.com/users/ArthurCRodrigues/repos')
    .then(response => response.json())
    .then(repos => {
        const reposContainer = document.querySelector('.repos-container');
        repos.forEach(repo => {
            const repoItem = document.createElement('div');
            repoItem.className = 'repo-item';
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description'}</p>
                <p class="language">${repo.language || 'Unknown'}</p>
            `;
            reposContainer.appendChild(repoItem);
        });
    })
    .catch(error => console.error('Error fetching GitHub repositories:', error));
