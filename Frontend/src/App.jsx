/*
  💡Premessa: Stai sviluppando un form di registrazione per una piattaforma dedicata ai giovani sviluppatori web. 
  Gli utenti devono iscriversi indicando le loro competenze e specializzazioni.

 🎯 Bonus: Migliorare l'Usabilità
Utilizziamo useRef() per migliorare l’esperienza utente, implementando le seguenti funzionalità:

Focus automatico al primo input (Nome) al mount del componente.
Bottone "Reset" in fondo al form per ripristinare tutti i valori:
Gli input controllati devono tornare ai valori iniziali.
Gli input non controllati devono essere resettati manualmente usando useRef().
Freccia fissa in basso a destra che, quando cliccata, riporta l'utente all'inizio del form (bisogna usare position: fixed).
*/
import { useState, useMemo, useRef, useEffect } from 'react'

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {

 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [descr, setDescr] = useState("")
 const anniRef = useRef()
 const specRef = useRef()
 const nameRef = useRef()
 const formRef = useRef()

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
 if(nameRef.current.value === "" || username === "" || password === "" || specRef.current.value === "" || anniRef.current.value === "" || descr === "" ){
  console.log("Devi compilare tutti i campi");
  return;
 }else if(parseInt(anniRef.current.value) < 1){
  console.log("Gli anni di esperienza deve essere un numero positivo")
  return;
 }
 console.log(nameRef.current.value, username, password, anniRef.current.value, specRef.current.value, descr);
 }

 useEffect(() => {
 nameRef.current.focus()
 }, [])

 const handleReset = () => {
  nameRef.current.value = "";
  specRef.current.value = "";
  anniRef.current.value = "";
  setDescr("")
  setPassword("")
  setUsername("")
  nameRef.current.focus() //metto anche qua il focus, così al reset rimette il focus sul name.
 }

 const scrollToView = () => {
 formRef.current.scrollIntoView({behavior: "smooth"})
 }



  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
         <label className='label'>Nome:</label>
         <input className='input' type='text' placeholder='inserisci il tuo nome' ref={nameRef}/>

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
         <select className='input' ref={specRef}>
          <option value="">-- Scegli una Specializzazione --</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
         </select>

          <label className='label'>Anni di esperienza:</label>
         <input className='input' type='number' placeholder='inserisci gli anni di esperienza' ref={anniRef}/>

          <label className='label'>Descrizione:</label>
         <textarea className='input' placeholder='inserisci una breve descrizione' onChange={(e) => setDescr(e.target.value)} value={descr}/>
           {descr && (
            <p className={isDescrValid ? 'valid' : 'error'}> {isDescrValid ? "Descrizione ok"  : "Deve contenere tra 100 e 1000 caratteri senza spazi iniziali e finali."}</p>
          )}

          <button type='submit'>Invia</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={scrollToView} className='scrollTopBtn '>↑</button>
      </form>
    </>
  )
}

export default App
