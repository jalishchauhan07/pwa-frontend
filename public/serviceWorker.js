self.addEventListener("sync", function (event) {
  if (event.tag === "sync-form") {
    event.waitUntil(sendFormData());
  }
});

function sendFormData() {
  const formData = JSON.parse(localStorage.getItem("formData"));

  return fetch("pwa-backend-peach.vercel.app/process-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
      localStorage.removeItem("formData");
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}
