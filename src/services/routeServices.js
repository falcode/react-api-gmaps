export const url = 'https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/';
export const trips = 'trips';
export const stops = 'stops';

export const getRoutes = () => {
   return fetch(`${url}${trips}`)
        .then(res => res.json())
        .catch(error => {
            console.log(`Error at getRoutes`, error);
            return [];
        })
}

export const getStop = (id) => {
    return fetch(`${url}${stops}/${id}`)
         .then(res => res.json())
         .catch(error => {
             console.log(`Error at getStop with ID:${id}`, error);
             return null;
        })
}