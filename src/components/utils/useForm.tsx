import { useState } from "react";

function useForm(setUserData: any, userData: any) {
  const [error, setError] = useState({
    errUsername: "",
    errAge: "",
    errEmail: "",
    errFcolor: "",
  });

  function handleChange(event: any) {
    const { value, name } = event.target;
    setUserData(Object.assign(userData, { [name]: value }));
  }
  function capitalStr(str: String) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleFocus(event: any) {
    const { name } = event.target;

    setError(Object.assign(error, { [`err${capitalStr(name)}`]: "" }));
  }

  function handleBlurInput(event: any) {
    const { name, value } = event.target;
    try {
      const errorField = "err" + capitalStr(name);
      let errorMsg = "";

      if (name !== "age") {
        if (value.trim() === "") {
          errorMsg = `${capitalStr(name)} is a required field`;
        } else if (
          name === "email" &&
          !/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
        ) {
          errorMsg = `${capitalStr(name)} is not valid`;
        } else if (
          name === "username" &&
          (value.length < 5 || /[^a-zA-Z0-9]/.test(value))
        ) {
          errorMsg = `${capitalStr(
            name
          )} must contain at least 5 characters and only alphanumeric characters`;
        } else if (name == "fcolor" && value == "") {
          errorMsg = `${capitalStr(name)} is a required field`;
        }
      }
      if (name === "age") {
        if (
          value <= 0 ||
          value > 100 ||
          value === undefined ||
          value === null
        ) {
          errorMsg = `${capitalStr(name)} is a required field`;
        } else {
          setUserData(
            Object.assign(userData, {
              skillSets: Math.ceil(value / 10),
            })
          );
        }
      }

      setError((prevError) => ({
        ...prevError,
        [errorField]: errorMsg,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((sw: any) => {
        sw.sync.register("sync-form").then(() => {
          localStorage.setItem("formData", JSON.stringify(userData));
        });
      });
    } else {
      // If offline sync is not supported, send the data directly
      sendData(userData);
    }
  };

  const sendData = async (data: Object) => {
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to send data", error);
    }
  };

  return [
    handleChange,
    handleBlurInput,
    error,
    handleFocus,
    handleSubmit,
  ] as const;
}

export { useForm };
