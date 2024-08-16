import style from "./forms.module.css";
import { useForm } from "./utils/useForm";
import { useState } from "react";

function Form() {
  const [userData, setUserData] = useState({
    username: "",
    age: 0,
    email: "",
    skillSets: 10,
    fcolor: "Black",
  });

  // const permission=await navigator

  const [handleChange, handleBlurInput, error, handleFocus, handleSubmit] =
    useForm(setUserData, userData);

  return (
    <div className={style.container}>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            onBlur={handleBlurInput}
            onFocus={handleFocus}
            name="username"
            aria-describedby="errorUsername"
          />
          <label id="errorUsername" className={style.errorLabel}>
            {error.errUsername && error.errUsername}
          </label>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            className={style.inputAge}
            type="number"
            id="age"
            onChange={handleChange}
            onBlur={handleBlurInput}
            onFocus={handleFocus}
            name="age"
            aria-describedby="errorAge"
          />
          <label id="errorAge" className={style.errorLabel}>
            {error.errAge && error.errAge}
          </label>
        </div>
        <div className={style.formGroup}>
          <label>Favorite Color</label>
          <select
            className={style.inputSelect}
            onChange={handleChange}
            name="fcolor"
            id="fcolor"
            onFocus={handleFocus}
            onBlur={handleBlurInput}
            aria-describedby="errorColor"
          >
            <option value="">Select a color</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Grey">Grey</option>
            <option value="Red">Red</option>
            <option value="Gold">Gold</option>
          </select>
          <label id="errorFcolor" className={style.errorLabel}>
            {error.errFcolor && error.errFcolor}
          </label>
        </div>
        <div className={style.formGroup}>
          <label>Email</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlurInput}
            onFocus={handleFocus}
            name="email"
            aria-describedby="errorEmail"
          />
          <label id="errorEmail" className={style.errorLabel}>
            {error.errEmail && error.errEmail}
          </label>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="skillLevel">Skill Level</label>
          <input
            className={style.inputSkill}
            id="skillLevel"
            type="range"
            min={1}
            max={10}
            value={userData.skillSets}
            onChange={handleChange}
            name="skillLevel"
            list="value"
          />
          <datalist id="value">{optionList()}</datalist>
        </div>
        <div className={style.formGroupBtn}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

function optionList() {
  const arr = [];
  for (let i = 1; i <= 10; i++) {
    arr.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return arr;
}

export default Form;
