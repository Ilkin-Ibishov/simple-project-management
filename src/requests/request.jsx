export function requestFunction({ destination, data, id, fetchMethod }) {
    if (id !== '') {
      destination += '/' + id;
    }
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/${destination}`, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(fetchMethod + ' to ' + destination + '/' + id, data);
        return resolve(data);
      })
      .catch(error => {
        console.error('There was a problem during fetch:', error);
        reject(error);
      });
    });
  }
  