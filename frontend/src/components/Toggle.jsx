export default function Toggle({dark,setDark}){
  return(
    <button onClick={()=>setDark(!dark)}>
      {dark ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}