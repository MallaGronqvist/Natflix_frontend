// Fake fetch
import fakeFetch from "scripts/fakeFetch";

// Node modules
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Project files
import ListInput from "components/ListInput";
import Fields from "data/fields-sign-up.json";
import { useUser } from "state/UserContext";
import iUser from "interfaces/iUser";

export default function Login() {
  // Global state
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Local state
  const [form, setForm] = useState({ name: "", email: "", pass: "" });

  // Properties
  const endPoint = "http://localhost:8000/register/";
  const METHOD = "POST";
  const HEADERS = {
    'Content-Type': 'application/json'
  }
  
//  const HEADERS = new Headers({
//    'Accept': 'application/json',
//    'Content-Type': 'application/json'
//  })

  // Methods
  function onSubmit(event: FormEvent): void {
    console.log("Sign up attempt using:", form)
    event.preventDefault();

    fetch(endPoint, {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(form),
    })
      .then((response) => onSuccess(response))
      .catch((error) => onFailure(error));
  }

  function onSuccess(newUser: any) {  //This was iUser
    console.log("Response" + newUser);

    alert("Welcome to Natflix!");
    setUser(newUser);
    navigate("/");
  }

  function onFailure(error: string) {
    console.error(Error);
    alert(`Can't create an account because of ${error}`);
  }

  return (
    <div id="sign-up" className="auth">
      <div className="container">
        <h1>Set up your account</h1>
        <form onSubmit={(event) => onSubmit(event)}>
          <ListInput fields={Fields} state={[form, setForm]} />
          <button>Sign up</button>
        </form>
        <footer>
          <p>
            Already have an account? <Link to="/login">Sign in instead</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}
