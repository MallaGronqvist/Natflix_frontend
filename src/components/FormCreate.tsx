// MPM packages
import { FormEvent, useState } from "react";

// Project files
import InputField from "components/InputField";
import { useModal } from "state/ModalContext";
import fakeFetch from "scripts/fakeFetch";
import InputSelect from "./InputSelect";

interface iProps {
  endPoint: string;
  fields: Array<any>;
}

export default function FormUpdate({ endPoint, fields }: iProps) {
  // Global state
  const { setModal } = useModal();

  // Local state
  const [form, setForm] = useState({});

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fakeFetch(endPoint + "create/", form)
      .then(onSuccess)
      .catch((error) => onFailure(error));
  }

  function onSuccess() {
    alert("Item created!");
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not create item");
  }

  // Components
  const InputFields = fields.map((item, index) => {
    switch (item.type) {
      case "select":
        return (
          <InputSelect key={index} fields={item} state={[form, setForm]} />
        );
      case "image":
        return <p key={index}>Image selector comming soon!</p>;
      default:
        return <InputField key={index} fields={item} state={[form, setForm]} />;
    }
  });

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Update information</h2>
      {InputFields}
      <hr />
      <button className="button-gray">Save</button>
      <button className="button-gray" onClick={() => setModal(null)}>
        Cancel
      </button>
    </form>
  );
}
