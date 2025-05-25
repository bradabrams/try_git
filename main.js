// Simple dataset of some California state parks
const parks = [
  {
    name: 'Big Basin Redwoods State Park',
    lat: 37.1728,
    lon: -122.2225,
    description: 'Home to ancient coast redwoods and lush trails.'
  },
  {
    name: 'Anza-Borrego Desert State Park',
    lat: 33.2550,
    lon: -116.3760,
    description: 'California\'s largest state park with desert landscapes.'
  },
  {
    name: 'Emerald Bay State Park',
    lat: 38.9547,
    lon: -120.0980,
    description: 'Scenic views of Lake Tahoe and historic sites.'
  }
];

const map = L.map('map').setView([36.7783, -119.4179], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const visited = JSON.parse(localStorage.getItem('visited-parks') || '{}');

function saveVisited(parkName, date) {
  visited[parkName] = date;
  localStorage.setItem('visited-parks', JSON.stringify(visited));
}

function showParkDetails(park) {
  const info = document.getElementById('park-info');
  info.innerHTML = `
    <h3>${park.name}</h3>
    <p>${park.description}</p>
    <p><strong>Visited:</strong> ${visited[park.name] || 'Not yet'}</p>
  `;
  document.getElementById('save-visit').onclick = () => {
    const date = document.getElementById('visit-date').value;
    if (date) {
      saveVisited(park.name, date);
      showParkDetails(park);
    }
  };
}

parks.forEach(park => {
  const marker = L.marker([park.lat, park.lon]).addTo(map);
  marker.on('click', () => showParkDetails(park));
});
