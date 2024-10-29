@react.component
let make = () => {
  let (name, setName) = React.useState(() => "")
  let (email, setEmail) = React.useState(() => "")
  let (message, setMessage) = React.useState(() => "")

  let handleSubmit = event => {
    event->ReactEvent.Form.preventDefault
    Js.log("Nom: " ++ name)
    Js.log("Email: " ++ email)
    Js.log("Message: " ++ message)
    // Ici, tu pourrais ajouter un appel API pour envoyer le message au support
  }

  <div className="form-container">
    <h2> {React.string("Contact Support")} </h2>
    <form onSubmit=handleSubmit className="user-form">
      <div className="form-group">
        <label htmlFor="name"> {React.string("Nom:")} </label>
        <input
          id="name"
          value=name
          onChange={event => setName(ReactEvent.Form.target(event)["value"])}
          className="form-input"
          placeholder="Entrez votre nom"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email"> {React.string("Email:")} </label>
        <input
          id="email"
          value=email
          onChange={event => setEmail(ReactEvent.Form.target(event)["value"])}
          type_="email"
          className="form-input"
          placeholder="Entrez votre email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="message"> {React.string("Message:")} </label>
        <textarea
          id="message"
          value=message
          onChange={event => setMessage(ReactEvent.Form.target(event)["value"])}
          className="form-input"
          placeholder="Décrivez votre demande ou problème"
        />
      </div>
      <button type_="submit" className="submit-button">
        {React.string("Envoyer")}
      </button>
    </form>
  </div>
}
