export async function request(payload, loader) {
  loader.style.display = "block";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: payload,
    redirect: "follow",
  };

  return await fetch("http://localhost:50000/calculatePlan", requestOptions)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        loader.style.display = "none";

        return res.json();
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      return error;
    });
}
