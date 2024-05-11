

export const AppLocation = async () => {
    if (navigator.geolocation) {
        return new Promise((resolve) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            navigator.geolocation.getCurrentPosition((position: any) => {
                resolve({ "Latitude": position.coords.latitude, "Longitude": position.coords.longitude });
            }, () => ("Unable to retrieve your location"))
        });
    } else {
        return ("Geolocation not supported");
    }



    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // async function success(position: any) {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     return await { "Latitude": latitude, "Longitude": longitude };
    // }

    // async function error() {
    //     return await ("Unable to retrieve your location");
    // }
}

