const API_KEY = '966c9b2612f05dbf0656837029a364c0';
const URL = 'https://api.themoviedb.org/3/';
const WEBSITE_URL = 'https://www.themoviedb.org';
let topRated = document.querySelector('.toprated');
let trending = document.querySelector('.trending');
let genreList = document.querySelector('.genres');
let searchResultsImages = document.querySelector('.searchresults');
let numberofGenres = 0;


const getMovie = async(movieSearch) =>{

    
    let params = new URLSearchParams({
        api_key: API_KEY,
        query: movieSearch
    });

    let url = `${URL}search/movie?${params.toString()}`;

    const response = await fetch(url);
    if (response.status != 200){
        throw new Error ('cannot fetch data');
    }

    const data = await response.json();

    return data;
    
};


const submitMovie = () => {
    let movieSearch = document.getElementById('moviesearch').value;
    if (movieSearch.length === 0){
        displayError();
        return;
    }
    
     getMovie(movieSearch)
        .then(data => {
            //console.log(data);

            if (data.results.length > 0){
                displaySearchResults(data, movieSearch);

            }
            else{
                displayError();
            }

            
        })
        .catch(err => console.log(err));

};

const displayError =() =>{
    searchResultsImages.innerHTML= '<h3 id="searchtext">No search results. Please enter valid input.</h3>';

};

const displaySearchMovie =(movieSearch) =>{
    return `<h3 class="searchresultstext">Search results for ${movieSearch}...</h3>`;

};

const displaySearchResults = (searchResults, movieSearch) => {
    let addInnerHTML = displaySearchMovie(movieSearch);
    searchResults.results.forEach(element => {

        if (element.poster_path != null){
            //let posterurl = getDisplayPoster(element);
            addInnerHTML += getDisplayPoster(element);
        }

        
    });
    searchResultsImages.innerHTML = addInnerHTML;


};



const getDisplayPoster = (data)=>{
    let posterurl = `http://image.tmdb.org/t/p/w500${data.poster_path}`;

    return `<img src="${posterurl}">`;

};

const getTopRated = async () =>{
    let params = new URLSearchParams({
        api_key: API_KEY
       // language: 'en-US',
       // page: 1
    
    });
    
    
    let url = `${URL}movie/top_rated?${params.toString()}`;
    const response = await fetch(url);

    if (response.status != 200){
        throw new Error('cannot fetch data');
    }

    const data = await response.json();
    return data;
};

const getGenres = async() =>{

    let params = new URLSearchParams({
        api_key: API_KEY
    
    });

    let url = `${URL}genre/movie/list?${params.toString()}`;
 
    const response = await fetch(url);
    if (response.status != 200){
        throw new Error('cannot fetch data');
    }

    const data = await response.json();
    return data;


};

const getTrending = async() =>{

    let params = new URLSearchParams({
        api_key: API_KEY
    
    });

    let url = `${URL}trending/movie/week?${params.toString()}`;

    const response = await fetch(url);
    if (response.status != 200){
        throw new Error('cannot fetch data');
    }

    const data = await response.json();
    return data;


};

const submitRecs = ()=>{
    IDs = []

    for (let i=0; i<numberofGenres; i++){
        if (document.getElementsByName(i)[0].checked){
            let valuestr = document.getElementsByName(i)[0].value
            IDs.push(Number(valuestr));
        }

    }

    if (IDs.length === 0){
        displayError();
        return;
    }

    getRecs(IDs)
        .then(data => {
            //console.log(data)
            if (data.results.length > 0){
                displaySearchResults(data, 'recommendations');

            }
            else{
                displayError();
            }

        })
        .catch(err => console.log(err));
    

};

const getRecs = async(IDs=[]) =>{

    IDtoString = '';
    IDs.forEach(element => IDtoString += element.toString()+',');

    let params = new URLSearchParams({
        api_key: API_KEY,
        with_genres: IDtoString
    });

    let url = `${URL}discover/movie?${params.toString()}`;

    const response = await fetch(url);
    if (response.status != 200){
        throw new Error('cannot fetch data');
    }

    const data = await response.json();
    return data;

};

getTopRated()
    .then(data => {

        let addInnerHTML = '';
        //console.log(data)
        data.results.forEach(element =>{
            //topRated.textContent += element.title;
            //let posterurl = getDisplayPoster(element);
            addInnerHTML += getDisplayPoster(element);
            

        });

        topRated.innerHTML += addInnerHTML;

    })
    .catch(err => console.log(err));

getTrending()
    .then(data => {
        //console.log(data)
        let addInnerHTML = '';
        data.results.forEach(element =>{
            //topRated.textContent += element.title;
            //let posterurl = getDisplayPoster(element);
            addInnerHTML += getDisplayPoster(element);
            

        });
        trending.innerHTML += addInnerHTML;

    })
    .catch(err => console.log(err));


getGenres()
    .then(data =>{
        numberofGenres = data.genres.length;
        //console.log(data);

        let count = 0;
    
        data.genres.forEach(element=>{
            let addInnerHTML = '';



            addInnerHTML += `<input id="checkbox-space" type="checkbox" name="${count}" value="${element.id}">`;
            addInnerHTML += `<label for="${count}">${element.name}</label><br>`
            count += 1;

            genreList.innerHTML += addInnerHTML;

        });
    })
    .catch(err => console.log(err));




