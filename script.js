const username = document.getElementById('username');
const fetchBtn = document.getElementById('fetchBtn');
const userInfo = document.getElementById('userInfo');

fetchBtn.addEventListener('click', () => { 
    const user = username.value.trim();
    if (user) {
        fetchUserData(user);
    } else {
        alert('Please enter a valid GitHub username');
    }
});

async function fetchUserData(user) {
    const apiUrl = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Invalid username!');
        }
        const data = await response.json();
        displayUserInfo(data);
    } catch (error) {
        userInfo.innerHTML = `<h2 style="color:red;">${error.message}</h2>`;
    }
}

function displayUserInfo(data) {
    userInfo.innerHTML = `
        <div style="text-align:center; margin-top:20px;">
            <img src="${data.avatar_url}" width="120" height="120" style="border-radius:50%;">
            <h3>${data.name || data.login}</h3>
            <p>${data.bio || ''}</p>
            <p><strong>Repos:</strong> ${data.public_repos} | 
               <strong>Followers:</strong> ${data.followers} | 
               <strong>Following:</strong> ${data.following}</p>
            <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
        </div>
    `;
}