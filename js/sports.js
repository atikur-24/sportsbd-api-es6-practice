// get all players information in click search button 
const searchAllData = (id) => {
    const leftContainer = document.getElementById('left-container')
    leftContainer.classList.add('d-none');
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');

    const inputElement = document.getElementById('search-value');
    const inputValue = inputElement.value;
    const searchId = id || inputValue
    const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => showPlayersData(data.player))
}

// show all player data click search button in UI
const showPlayersData = players => {
  const searchElement = document.getElementById('search-value')
    searchElement.value = '';
    const cardContainer = document.getElementById('players-info');
    cardContainer.innerHTML = '';
    const spinner = document.getElementById('spinner');
    spinner.classList.add('d-none')
    players.forEach(player => {
      const {strPlayer, strNationality, strThumb, idPlayer} = player;
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML =`
        <div class="card h-100">
          <img height="60%" src="${strThumb ? strThumb : "https://picsum.photos/500/300?random=3"}" class="card-img-top" alt="${strPlayer}">
          <div class="card-body">
            <h5 class="card-title">${strPlayer}</h5>
            <p class="card-text">Nationality: ${strNationality}</p>
            <div class="d-flex justify-content-around">
              <button onclick="loadPlayerData(${idPlayer})" class="btn btn-primary">Details</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
      </div>
        `;
        cardContainer.appendChild(div)
    }) 
}

// get single player data using dynamic URL and unique id
const loadPlayerData = id => {
  const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => showPlayerDetail(data.players[0]))
}

// show single player data using dynamic URL and unique id
const showPlayerDetail = playerData => {
  const leftContainer = document.getElementById('left-container')
  leftContainer.classList.remove('d-none')
  const { strThumb, strDescriptionEN, strPlayer, strGender } = playerData;
  // show players banner
  const bannerMale = document.getElementById('male');
  const bannerFemale = document.getElementById('female');
  if (strGender === 'Male') {
    bannerMale.classList.remove('d-none');
    bannerFemale.classList.add('d-none');
  } else {
    bannerFemale.classList.remove('d-none');
    bannerMale.classList.add('d-none');
  }
  // show player details
  const playerDetails = document.getElementById('player-details');
  playerDetails.innerHTML = `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${strPlayer}</h5>
            <p class="card-text">${strDescriptionEN.slice(0, 100) + '...'}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  `;
}

searchAllData('messi');