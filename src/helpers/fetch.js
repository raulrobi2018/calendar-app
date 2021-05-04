const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithOutToken = (endpoint, data, method = "GET") => {
    const url = `${baseUrl}/${endpoint}`;
    if (method === "GET") {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
};

const fetchWithToken = (endpoint, data, method = "GET") => {
    const url = `${baseUrl}/${endpoint}`;

    //Si llegase a ser null le seteo vacío
    const token = localStorage.getItem("token") || "";

    console.log(url);

    if (method === "GET") {
        return fetch(url, {
            method,
            headers: {
                "x-token": token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                "Content-type": "application/json",
                "x-token": token
            },
            body: JSON.stringify(data)
        });
    }
};

export {fetchWithOutToken, fetchWithToken};
