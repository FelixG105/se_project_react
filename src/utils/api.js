const baseUrl = 'http://localhost:3001';


function getItems () {
    return fetch (`${baseUrl}/items`).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}



function postItems ({name, imageUrl, weather}) {
    return fetch (`${baseUrl}/items`, {
        method: "POST",
        headers:{ 'Content-Type': "application/json" },
        body: JSON.stringify({
            name: name,
            imageUrl: imageUrl,
            weather: weather,
        })
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}




function deleteItems (_id) {
    return fetch (`${baseUrl}/items/${_id}`, {
        method: "DELETE",
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}

export {getItems, postItems, deleteItems}
