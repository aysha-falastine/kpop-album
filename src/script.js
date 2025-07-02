/*
let albums = [];
const albumContainer = document.getElementById('albumContainer');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');

document.addEventListener('DOMContentLoaded', () => {
  fetch('db.json')
    .then(res => res.json())
    .then(data => {
      albums = data.albums;
      populateGenreFilter();
      displayAlbums(albums);
    })
    .catch(err => console.error('Error fetching data:', err));
});

function populateGenreFilter() {
  const genres = [...new Set(albums.map(album => album.genre))];
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function displayAlbums(albumList) {
  albumContainer.innerHTML = '';
  if (albumList.length === 0) {
    albumContainer.textContent = 'No albums found.';
    return;
  }

  albumList.forEach(album => {
    const card = document.createElement('div');
    card.classList.add('album-card');
    card.innerHTML = `
      <img src="${album.cover}" alt="${album.title} cover" class="album-cover"/>
      <div class="album-info">
        <div class="album-title">${album.title}</div>
        <div class="album-artist">${album.artist}</div>
        <div class="album-year">${album.year}</div>
      </div>
    `;

    // This part opens Spotify link if available
    if (album.spotifyUrl) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.open(album.spotifyUrl, '_blank', 'noopener');
      });
    } else {
      card.addEventListener('click', () => {
        alert(`Album: ${album.title}\nArtist: ${album.artist}\nYear: ${album.year}\nGenre: ${album.genre}`);
      });
    }

    albumContainer.appendChild(card);
  });
}


searchInput.addEventListener('input', handleFilters);
genreFilter.addEventListener('change', handleFilters);

function handleFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const genreValue = genreFilter.value;

  const filtered = albums.filter(album => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm) ||
      album.artist.toLowerCase().includes(searchTerm);
    const matchesGenre = genreValue === 'all' || album.genre === genreValue;

    return matchesSearch && matchesGenre;
  });

  displayAlbums(filtered);
}

// Dark Mode
const darkModeBtn = document.getElementById('toggleDarkMode');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Navigation
const homeBtn = document.getElementById('homeBtn');
const aboutBtn = document.getElementById('aboutBtn');
const contactBtn = document.getElementById('contactBtn');
const homeSection = document.getElementById('homeSection');
const aboutSection = document.getElementById('aboutSection');
const contactSection = document.getElementById('contactSection');

homeBtn.addEventListener('click', () => {
  homeSection.style.display = 'block';
  aboutSection.style.display = 'none';
  contactSection.style.display = 'none';
});
aboutBtn.addEventListener('click', () => {
  homeSection.style.display = 'none';
  aboutSection.style.display = 'block';
  contactSection.style.display = 'none';
});
contactBtn.addEventListener('click', () => {
  homeSection.style.display = 'none';
  aboutSection.style.display = 'none';
  contactSection.style.display = 'block';
});
*/
let albums = [];
const albumContainer = document.getElementById('albumContainer');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');

const BASE_URL = "https://json-server-32dd.onrender.com/albums";

// Fetch and display albums
function fetchAndDisplayAlbums() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      albums = data;
      populateGenreFilter();
      displayAlbums(albums);
    })
    .catch(err => console.error('Error fetching data:', err));
}

// Populate genre dropdown
function populateGenreFilter() {
  genreFilter.innerHTML = '<option value="all">All Genres</option>';
  const genres = [...new Set(albums.map(album => album.genre))];
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

// Display albums
function displayAlbums(albumList) {
  albumContainer.innerHTML = '';
  if (albumList.length === 0) {
    albumContainer.textContent = 'No albums found.';
    return;
  }

  albumList.forEach(album => {
    const card = document.createElement('div');
    card.classList.add('album-card');
    card.innerHTML = `
      <img src="${album.cover}" alt="${album.title} cover" class="album-cover"/>
      <div class="album-info">
        <div class="album-title">${album.title}</div>
        <div class="album-artist">${album.artist}</div>
        <div class="album-year">${album.year}</div>
      </div>
    `;

    // Open Spotify link if available
    if (album.spotifyUrl) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.open(album.spotifyUrl, '_blank', 'noopener');
      });
    } else {
      card.addEventListener('click', () => {
        alert(`Album: ${album.title}\nArtist: ${album.artist}\nYear: ${album.year}\nGenre: ${album.genre}`);
      });
    }

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginTop = '8px';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteAlbum(album.id);
    });
    card.appendChild(deleteBtn);

    albumContainer.appendChild(card);
  });
}

// Search & Filter
searchInput.addEventListener('input', handleFilters);
genreFilter.addEventListener('change', handleFilters);

function handleFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const genreValue = genreFilter.value;

  const filtered = albums.filter(album => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm) ||
      album.artist.toLowerCase().includes(searchTerm);
    const matchesGenre = genreValue === 'all' || album.genre === genreValue;

    return matchesSearch && matchesGenre;
  });

  displayAlbums(filtered);
}

// Dark Mode
const darkModeBtn = document.getElementById('toggleDarkMode');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Navigation
const homeBtn = document.getElementById('homeBtn');
const aboutBtn = document.getElementById('aboutBtn');
const contactBtn = document.getElementById('contactBtn');
const homeSection = document.getElementById('homeSection');
const aboutSection = document.getElementById('aboutSection');
const contactSection = document.getElementById('contactSection');

homeBtn.addEventListener('click', () => {
  homeSection.style.display = 'block';
  aboutSection.style.display = 'none';
  contactSection.style.display = 'none';
});
aboutBtn.addEventListener('click', () => {
  homeSection.style.display = 'none';
  aboutSection.style.display = 'block';
  contactSection.style.display = 'none';
});
contactBtn.addEventListener('click', () => {
  homeSection.style.display = 'none';
  aboutSection.style.display = 'none';
  contactSection.style.display = 'block';
});

// ADD album helper
function addAlbum(newAlbum) {
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAlbum)
  })
  .then(res => res.json())
  .then(addedAlbum => {
    albums.push(addedAlbum);
    displayAlbums(albums);
  })
  .catch(err => console.error("Error adding album:", err));
}

// DELETE album helper
function deleteAlbum(id) {
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    albums = albums.filter(album => album.id !== id);
    displayAlbums(albums);
  })
  .catch(err => console.error("Error deleting album:", err));
}

// UPDATE album helper
function updateAlbum(id, updatedFields) {
  fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedFields)
  })
  .then(res => res.json())
  .then(updatedAlbum => {
    albums = albums.map(album => album.id === id ? updatedAlbum : album);
    displayAlbums(albums);
  })
  .catch(err => console.error("Error updating album:", err));
}

// Clear albums from view
const clearBtn = document.getElementById('clearAlbumsBtn');
clearBtn.addEventListener('click', () => {
  albumContainer.innerHTML = '';
});

// View albums
const viewBtn = document.getElementById('viewAlbumsBtn');
viewBtn.addEventListener('click', () => {
  fetchAndDisplayAlbums();
});
