/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const apikey = '4f1dc020feb035971c309f2a30e0f383';
const retrieveData = async () => {
    const request = await fetch(`/all/${document.querySelector('#city').value}/${document.all('image').value}/${apikey}`);
    try {
        // Transform into JSON
        const allData = await request.json();
        console.log(' all  data  is ', allData)
        return allData;
    } catch (error) {
        console.log("error", error);
        alert('System Error');
    }

}

(function () {
    document.querySelector("#generate").addEventListener("click", function (e) {

        retrieveData().then(allData => {
            console.log(allData);
            document.all('cityname').value = document.all('city').value;
            document.all('image').value = '';
            document.all('city').value = '';
            document.getElementById('temp').innerHTML = (Math.round((allData.temp - 273.15) * 9 / 5 + 32)) + ' degrees';
            // document.getElementById('content').innerHTML = allData.feel;
            document.getElementById("date").innerHTML = new Date(allData.date * 1000).toLocaleString();

            document.getElementById('imgsearch').src = allData.image;
        });

    });

})();