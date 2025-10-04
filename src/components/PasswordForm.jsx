import React, { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";

export default function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!next || !confirm) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    if (next !== confirm) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    if (next.length < 8) {
      setMessage("Le nouveau mot de passe doit contenir 8 caractères.");
      return;
    }
    setMessage("Mot de passe mis à jour (démo).");
    setCurrent("");
    setNext("");
    setConfirm("");
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">
        <strong>Changer le mot de passe</strong>
        <span className="muted">Sécurité du compte</span>
      </div>
      <div className="form-row">
        <Input
          label="Mot de passe actuel"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <Input
          label="Nouveau mot de passe"
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <Input
          label="Confirmer"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      {message && (
        <div className="muted" style={{ marginTop: 8 }}>
          {message}
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        <Button variant="primary" type="submit">
          Mettre à jour
        </Button>
      </div>
    </form>
  );
}
