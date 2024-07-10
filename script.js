"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = 'afjWFT3VgQh7jxuGLh6uhMr57oDgM2k4';
const searchInputElement = document.getElementById('search-input');
const searchButtonElement = document.getElementById('search-button');
const gifContainer = document.getElementById('gif-container');
searchButtonElement.addEventListener('click', () => {
    const query = searchInputElement.value;
    fetchData(query);
    searchInputElement.value = '';
});
function fetchData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=20`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            if (Array.isArray(data.data)) {
                printData(data.data);
            }
            else {
                console.error('Unexpected response structure:', data);
            }
        }
        catch (error) {
            console.error('Error fetching GIFs:', error);
        }
    });
}
function printData(data) {
    gifContainer.innerHTML = '';
    data.forEach((gif) => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.className = 'gif-item';
        gifContainer.appendChild(img);
    });
}
