export async function deletePlan(id, loader) {
  loader.style.display = "block";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const payload = JSON.stringify({
    "data": {
      "id": id
    }
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: payload,
    redirect: "follow",
  };

  return await fetch("http://localhost:50000/deletePlan", requestOptions)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {

        return res.json();
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      return error;
    });
}
