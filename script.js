// ចាប់ផ្តើម Telegram WebApp SDK
const tg = window.Telegram.WebApp;
tg.expand(); // ពង្រីកអេក្រង់ Mini App ឱ្យពេញ

// បង្ហាញឈ្មោះអ្នកប្រើប្រាស់ Telegram ຖົកទាញបាន
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
  const firstName = tg.initDataUnsafe.user.first_name || "មិត្ត";
  document.getElementById('user-greeting').innerText = `សួស្តី, ${firstName}! ស្វែងរកជាងនៅជុំវិញអ្នក`;
} else {
  document.getElementById('user-greeting').innerText = `ស្វែងរកជាងម៉ូតូនៅជុំវិញអ្នក`;
}

// ទិន្នន័យគំរូជាងម៉ូតូ (អាចប្តូរជាការទាញយកពី Backend API នាពេលក្រោយ)
const mechanicsData = [
  {
    id: 1,
    name: "ជាង សុខា (ជួសជុលម៉ូតូទូទៅ ២៤ម៉ោង)",
    phone: "012345678",
    location: "ផ្លូវមុន្នីវង្ស, ភ្នំពេញ",
    distance: "1.2 គីឡូម៉ែត្រ",
    mapUrl: "https://maps.google.com"
  },
  {
    id: 2,
    name: "ហាងម៉ូតូ ឌីកូ & ដូរយ៉េេ (សង្គ្រោះបន្ទាន់)",
    phone: "098765432",
    location: "ទួលគោក, ភ្នំពេញ",
    distance: "2.5 គីឡូម៉ែត្រ",
    mapUrl: "https://maps.google.com"
  },
  {
    id: 3,
    name: "ជាង វុទ្ធី ប៉ះកង់ម៉ូតូស្មាត",
    phone: "077889900",
    location: "ស្ទឹងមានជ័យ, ភ្នំពេញ",
    distance: "3.8 គីឡូម៉ែត្រ",
    mapUrl: "https://maps.google.com"
  }
];

// បង្ហាញបញ្ជីជាងលើអេក្រង់
function renderMechanics(data) {
  const listContainer = document.getElementById('mechanicList');
  listContainer.innerHTML = '';

  if (data.length === 0) {
    listContainer.innerHTML = '<p style="text-align:center; color:#888;">រកមិនឃើញជាងម៉ូតូទេ</p>';
    return;
  }

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>📍 ទីតាំង: ${item.location} (${item.distance})</p>
      <p>📞 លេខទូរស័ព្ទ: ${item.phone}</p>
      <div class="btn-group">
        <a href="tel:${item.phone}" class="btn">ហៅទូរស័ព្ទ</a>
        <a href="${item.mapUrl}" target="_blank" class="btn btn-map">មើលផែនទី</a>
      </div>
    `;
    listContainer.appendChild(card);
  });
}

// បង្ហាញទិន្នន័យទាំងអស់ដំបូងបង្អស់
renderMechanics(mechanicsData);

// ប្រព័ន្ធស្វែងរក (Search Filter)
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = mechanicsData.filter(item => 
    item.name.toLowerCase().includes(keyword) || 
    item.location.toLowerCase().includes(keyword)
  );
  renderMechanics(filtered);
});