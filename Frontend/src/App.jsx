/*
  💡Premessa: Stai sviluppando un form di registrazione per una piattaforma dedicata ai giovani sviluppatori web. 
  Gli utenti devono iscriversi indicando le loro competenze e specializzazioni.

  📌 Milestone 2: Validare in tempo reale
Aggiungere la validazione in tempo reale dei seguenti campi:

✅ Username:  Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).

✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.

✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:


Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi.
*/
import { useState, useMemo } from 'react'

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {
 const [name, setName] = useState("");
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [specializzazione, setSpecializzazione] = useState("")
 const [anni, setAnni] = useState("")
 const [descr, setDescr] = useState("")

  const isUserValid = useMemo(() => {
   const charsValid = username.split("").every((c) => letters.includes(c.toLowerCase()) || numbers.includes(c.toLowerCase()) )
   return charsValid && username.trim().length >= 6;  
  }, [username])

  const isPasswordValid = useMemo(() => {
   /*Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.*/
   return (
      password.trim().length >= 8 &&
      password.split("").some((p) => letters.includes(p.toLowerCase())) &&
      password.split("").some((p) => numbers.includes(p.toLowerCase())) &&
      password.split("").some((p) => symbols.includes(p.toLowerCase()))
    )
       
   
  }, [password])


    const isDescrValid = useMemo(() => {
   /*Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).*/
   return descr.trim().length >= 100 && descr.trim().length <= 1000
   
  }, [descr])


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
          {username && (
            <p className={isUserValid ? 'valid' : 'error'}>{isUserValid ? "User ok"  : "Deve contenere solo caratteri alfanumerici e almeno 6 caratteri"}</p>
          )}
         <label className='label'>Password:</label>
         <input className='input' type='password' placeholder='inserisci la tua password' onChange={(e) => setPassword(e.target.value)} value={password}/>
         {password && (
            <p className={isPasswordValid ? 'valid' : 'error'}> {isPasswordValid ? "Password ok"  : "Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo."}</p>
          )}

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
           {descr && (
            <p className={isDescrValid ? 'valid' : 'error'}> {isDescrValid ? "Descrizione ok"  : "Deve contenere tra 100 e 1000 caratteri senza spazi iniziali e finali."}</p>
          )}

          <button type='submit'>Invia</button>
      </form>
    </>
  )
}

export default App
