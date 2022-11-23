export async function getPlans(loader) {
    return await fetch("http://localhost:50000/getPlans")
   .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      loader.style.display = "none"
      return responseJson
  })
    .catch((error) => {
      return error
    });
  };

  