let albums = [];
const BASE_URL = "https://json-server-32dd.onrender.com/albums"; // 
const albumContainer = document.getElementById('albumContainer');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const viewBtn = document.getElementById('viewAlbumsBtn');
const clearBtn = document.getElementById('clearAlbumsBtn');

// Creating Form Elements
const createForm = document.createElement('form');
createForm.className = 'album-form';
createForm.innerHTML = `
  <h3>Add Album</h3>
  <input type="text" placeholder="Title" id="newTitle" required />
  <input type="text" placeholder="Artist" id="newArtist" required />
  <input type="number" placeholder="Year" id="newYear" required />
  <input type="text" placeholder="Genre" id="newGenre" required />
  <input type="url" placeholder="Cover Image URL" id="newCover" required />
  <input type="url" placeholder="Spotify URL" id="newSpotify" />
  <button type="submit">Add Album</button>
`;
document.getElementById('homeSection').prepend(createForm);

// Event Listeners
viewBtn.addEventListener('click', fetchAlbums);
clearBtn.addEventListener('click', () => albumContainer.innerHTML = '');

searchInput.addEventListener('input', handleFilters);
genreFilter.addEventListener('change', handleFilters);

createForm.addEventListener('submit', createAlbum);

// Fetch and display albums
function fetchAlbums() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      albums = data;
      populateGenreFilter();
      displayAlbums(albums);
    })
    .catch(err => console.error('Error fetching albums:', err));
}

// Populate genre dropdown
function populateGenreFilter() {
  genreFilter.innerHTML = `<option value="all">All Genres</option>`;
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
    // Click to view album and prompt for editing
    card.addEventListener('click', () => {
      const confirmEdit = confirm(`Album:\n${album.title}\nArtist: ${album.artist}\nYear: ${album.year}\n\nEdit this album?`);
      if (confirmEdit) editAlbum(album);
    });
    albumContainer.appendChild(card);
  });
}

// Filter albums by search and genre
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

// Create album (POST)
function createAlbum(e) {
  e.preventDefault();
  const newAlbum = {
    title: document.getElementById('newTitle').value,
    artist: document.getElementById('newArtist').value,
    year: parseInt(document.getElementById('newYear').value),
    genre: document.getElementById('newGenre').value,
    cover: document.getElementById('newCover').value,
    spotify: document.getElementById('newSpotify').value
  };
  fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAlbum)
  })
    .then(res => res.json())
    .then(added => {
      albums.push(added);
      displayAlbums(albums);
      createForm.reset();
      alert('Album added!');
    })
    .catch(err => console.error('Error adding album:', err));
}

// Edit album (PATCH)
function editAlbum(album) {
  const newTitle = prompt('New Title:', album.title);
  const newArtist = prompt('New Artist:', album.artist);
  const newYear = prompt('New Year:', album.year);
  const newGenre = prompt('New Genre:', album.genre);
  const newCover = prompt('New Cover URL:', album.cover);
  const newSpotify = prompt('New Spotify URL:', album.spotify);

  const updatedAlbum = {
    title: newTitle,
    artist: newArtist,
    year: parseInt(newYear),
    genre: newGenre,
    cover: newCover,
    spotify: newSpotify
  };

  fetch(`${BASE_URL}/${album.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAlbum)
  })
    .then(res => res.json())
    .then(updated => {
      albums = albums.map(a => (a.id === updated.id ? updated : a));
      displayAlbums(albums);
      alert('Album updated!');
    })
    .catch(err => console.error('Error updating album:', err));
}

// Delete album (you can call this manually from the console)
function deleteAlbum(id) {
  if (!confirm('Are you sure you want to delete this album?')) return;
  fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then(() => {
      albums = albums.filter(album => album.id !== id);
      displayAlbums(albums);
      alert('Album deleted!');
    })
    .catch(err => console.error('Error deleting album:', err));
}

// Dark Mode Toggle (kept from your original code)
document.getElementById('toggleDarkMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Navigation
document.getElementById('homeBtn').addEventListener('click', () => {
  document.getElementById('homeSection').style.display = 'block';
  document.getElementById('aboutSection').style.display = 'none';
  document.getElementById('contactSection').style.display = 'none';
});
document.getElementById('aboutBtn').addEventListener('click', () => {
  document.getElementById('homeSection').style.display = 'none';
  document.getElementById('aboutSection').style.display = 'block';
  document.getElementById('contactSection').style.display = 'none';
});
document.getElementById('contactBtn').addEventListener('click', () => {
  document.getElementById('homeSection').style.display = 'none';
  document.getElementById('aboutSection').style.display = 'none';
  document.getElementById('contactSection').style.display = 'block';
});
