// A mock function to mimic making an async request for data

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${process.env.REACT_APP_API_URL}`,
		'X-RapidAPI-Host': 'target1.p.rapidapi.com'
	}
};
export function fetchData(url) {
    try{
     const data = fetch(url,options);
     return data;
	}catch(error){
		console.log(error);
	}
  
}
