/*
  💡Premessa: Stai sviluppando un form di registrazione per una piattaforma dedicata ai giovani sviluppatori web. 
  Gli utenti devono iscriversi indicando le loro competenze e specializzazioni.

  📌 Milestone 1: Creare un Form con Campi Controllati
Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):

✅ Nome completo (input di testo)

✅ Username (input di testo)

✅ Password (input di tipo password)

✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")

✅ Anni di esperienza (input di tipo number)

✅ Breve descrizione sullo sviluppatore (textarea)

Aggiungi una validazione al submit, verificando che:

Tutti i campi siano compilati
L'input Anni di esperienza sia un numero positivo
La Specializzazione sia selezionata

Al submit, se il form è valido, stampa in console i dati.
*/
import { useState } from 'react'

function App() {
 const [name, setName] = useState("");
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [specializzazione, setSpecializzazione] = useState("")
 const [anni, setAnni] = useState("")
 const [descr, setDescr] = useState("")


 const handleSubmit = (e) => {
 e.preventDefault()
 if(name === "" || username === "" || password === "" || specializzazione === "" || anni === "" || descr === "" ){
  console.log("Devi compilare tutti i campi");
  return;
 }else if(parseInt(anni) < 1){
  console.log("Gli anni di esperienza deve essere un numero positivo")
  return;
 }
 console.log(name, username, password, specializzazione, anni, descr);
 }



  return (
    <>
      <form onSubmit={handleSubmit}>
         <label className='label'>Nome:</label>
         <input className='input' type='text' placeholder='inserisci il tuo nome' onChange={(e) => setName(e.target.value)} value={name}/>

         <label className='label'>UserName:</label>
         <input className='input' type='text' placeholder='inserisci il tuo User' onChange={(e) => setUsername(e.target.value)} value={username}/>

         <label className='label'>Password:</label>
         <input className='input' type='password' placeholder='inserisci la tua password' onChange={(e) => setPassword(e.target.value)} value={password}/>

         <label className='label'>Specializzazione:</label>
         <select className='input' value={specializzazione} onChange={(e) => setSpecializzazione(e.target.value)}>
          <option value="">-- Scegli una Specializzazione --</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
         </select>

          <label className='label'>Anni di esperienza:</label>
         <input className='input' type='number' placeholder='inserisci gli anni di esperienza' onChange={(e) => setAnni(e.target.value)} value={anni}/>

          <label className='label'>Descrizione:</label>
         <textarea className='input' placeholder='inserisci una breve descrizione' onChange={(e) => setDescr(e.target.value)} value={descr}/>

          <button type='submit'>Invia</button>
      </form>
    </>
  )
}

export default App
