document.addEventListener('DOMContentLoaded', () => {
  const gridTab = document.getElementById('grid-tab');
  const listTab = document.getElementById('list-tab');
  const cryptoContainer = document.getElementById('crypto-container');
  const cryptoTable = document.getElementById('crypto-table');

  gridTab.addEventListener('click', () => {
    gridTab.classList.add('active');
    listTab.classList.remove('active');
    cryptoContainer.classList.add('grid-view');
    cryptoContainer.classList.remove('list-view');
    cryptoTable.style.display = 'none';
  });

  listTab.addEventListener('click', () => {
    listTab.classList.add('active');
    gridTab.classList.remove('active');
    cryptoContainer.classList.add('list-view');
    cryptoContainer.classList.remove('grid-view');
    cryptoTable.style.display = 'table';
  });

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const displayData = (data) => {
    cryptoContainer.innerHTML = '';
    const cryptoTableBody = document.querySelector('#crypto-table tbody');
    cryptoTableBody.innerHTML = '';

    data.forEach(crypto => {
      if (cryptoContainer.classList.contains('grid-view')) {
        const cryptoCard = document.createElement('div');
        cryptoCard.classList.add('crypto-card');

        const cryptoImage = document.createElement('img');
        cryptoImage.src = crypto.image;
        cryptoImage.alt = `${crypto.name} logo`;

        const cryptoName = document.createElement('h2');
        cryptoName.textContent = crypto.name;

        const cryptoPrice = document.createElement('p');
        cryptoPrice.textContent = `Price: $${crypto.current_price}`;

        const cryptoMarketCap = document.createElement('p');
        cryptoMarketCap.textContent = `Market Cap: $${crypto.market_cap}`;

        const cryptoPriceChange = document.createElement('p');
        cryptoPriceChange.textContent = `24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%`;

        cryptoCard.appendChild(cryptoImage);
        cryptoCard.appendChild(cryptoName);
        cryptoCard.appendChild(cryptoPrice);
        cryptoCard.appendChild(cryptoMarketCap);
        cryptoCard.appendChild(cryptoPriceChange);

        cryptoContainer.appendChild(cryptoCard);
      } else if (cryptoContainer.classList.contains('list-view')) {
        const cryptoRow = document.createElement('tr');

        const cryptoImageCell = document.createElement('td');
        cryptoImageCell.innerHTML = `<img src="${crypto.image}" alt="${crypto.name} logo">`;

        const cryptoNameCell = document.createElement('td');
        cryptoNameCell.textContent = crypto.name;

        const cryptoPriceCell = document.createElement('td');
        cryptoPriceCell.textContent = `$${crypto.current_price}`;

        const cryptoMarketCapCell = document.createElement('td');
        cryptoMarketCapCell.textContent = `$${crypto.market_cap}`;

        const cryptoPriceChangeCell = document.createElement('td');
        cryptoPriceChangeCell.textContent = `${crypto.price_change_percentage_24h.toFixed(2)}%`;

        cryptoRow.appendChild(cryptoImageCell);
        cryptoRow.appendChild(cryptoNameCell);
        cryptoRow.appendChild(cryptoPriceCell);
        cryptoRow.appendChild(cryptoMarketCapCell);
        cryptoRow.appendChild(cryptoPriceChangeCell);

        cryptoTableBody.appendChild(cryptoRow);
      }
    });
  };

  fetchData();
});
