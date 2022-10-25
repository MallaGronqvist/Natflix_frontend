// Fake fetch
import fakeFetch from "scripts/fakeFetch";

// Node modules
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// Project files
import ListInput from "components/ListInput";
import Fields from "data/fields-sign-in.json";
import iUser from "interfaces/iUser";
import { useUser } from "state/UserContext";

export default function Login() {
  // Global state
  const { user, setUser } = useUser();

  // Local state
  const [form, setForm] = useState({ email: "", password: "" });

  // Properties
  const endPoint = "http://localhost:8000/login";
  const METHOD = "POST";
  const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  })

  // Methods
  function onSubmit(event: FormEvent): void {
    console.log("Login attempt using:", form)
    event.preventDefault();

    fetch(endPoint, {
      method: METHOD,
      headers: HEADERS,
      body: "username="+form.email+"&password="+form.password,
    })
      .then((response) => onSuccess(response))
      .catch((error) => onFailure(error));
  }

  function onSuccess(returningUser: any) {  // This was iUser
    console.log(returningUser);

    alert("Logged in");
    setUser(returningUser);
    // navigate to home page?
  }

  function onFailure(error: string) {
    console.error(error);
    alert(error);
  }

  return (
    <div id="sign-in" className="auth">
      <div className="container">
        <h1>Sign In</h1>
        <form onSubmit={(event) => onSubmit(event)}>
          <ListInput fields={Fields} state={[form, setForm]} />
          <button>Sign in</button>
        </form>
        <footer>
          <p>
            New to Natflix? <Link to="/registration">Sign up now</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}
