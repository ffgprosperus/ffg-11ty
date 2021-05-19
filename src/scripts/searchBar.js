document.addEventListener("DOMContentLoaded", function() { 
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    const searchButton = document.querySelector('.search-bar');
    const header = document.querySelector('.header');
    const container = document.querySelector('.search-bar-container');
    searchButton.addEventListener('click', function(){
        container.classList.remove("h-0");
        container.classList.remove("py-0");
        container.classList.add("search-container");
        // const input = document.createElement("input");
        // input.className = 'absolute top-0 bottom-0 left-0 flex-grow-1 2xl w-4/5 search-bar__input cursor-pointer focus:outline-none focus:cursor-text bg-opacity-25 h-auto opacity-0 focus:opacity-100 focus:pl-4';
        // container.appendChild(input);
    });
});

