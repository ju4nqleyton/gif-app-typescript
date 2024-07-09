const API_KEY: string = 'afjWFT3VgQh7jxuGLh6uhMr57oDgM2k4';
const searchInputElement = document.getElementById(
  'search-input'
) as HTMLInputElement;
const searchButtonElement = document.getElementById(
  'search-button'
) as HTMLInputElement;
const gifContainer = document.getElementById('gif-container') as HTMLElement;

interface Gif {
  images: {
    fixed_height: {
      url: string;
    };
  };
}

searchButtonElement.addEventListener('click', () => {
  const query = searchInputElement.value;
  fetchData(query);
  searchInputElement.value = '';
});

async function fetchData(query: string) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=20`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (Array.isArray(data.data)) {
      printData(data.data);
    } else {
      console.error('Unexpected response structure:', data);
    }
  } catch (error) {
    console.error('Error fetching GIFs:', error);
  }
}

function printData(data: Gif[]) {
  gifContainer.innerHTML = '';
  data.forEach((gif) => {
    const img = document.createElement('img');
    img.src = gif.images.fixed_height.url;
    gifContainer.appendChild(img);
  });
}
