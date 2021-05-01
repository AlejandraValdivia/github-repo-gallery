// Create and name a Global variable to select the div with a class of "overview".
const overview = document.querySelector('.overview');
const username = "alejandravaldivia";
const repoList = document.querySelector(".repo-list");

// Create and name an async function to fetch information from your GitHub profile using the GitHub API address:
const gitUserInfo = async function() {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json()
  displayUserInfo(data);
};

// Call the function to see your results:
gitUserInfo();

// Display the fetched user information on the page:
const displayUserInfo = function (data) {
  // Create a new div and give it a class of "user-info". 
  const div = document.createElement("div");
  div.classList.add("user-info");
  // Populate the div, with the following elements for figure, image, and paragraphs:
  div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div> 
  `;
  // Append the div to the overview element.
  overview.append(div);
  gitRepos();
};

const gitRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};