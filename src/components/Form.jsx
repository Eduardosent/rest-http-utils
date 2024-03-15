import { useState } from "react";

export default function Form({titled,bodyd,useridd,put}){

    const defaultTitle = titled ? titled : '';
    const defaultBody = bodyd ? bodyd : '';
    const defaultId = useridd ? useridd : '';
    const defaultPut = put ? put : false;

    const [title,setTitle] = useState(defaultTitle);
    const [body,setBody] = useState(defaultBody);
    const [userid,setUserId] = useState(defaultId);
    const [errors,setErrors] = useState([]);

    async function postPost(){
        if(title.length >=5 && body.length >=5 || userid!=0){
            await fetch('https://jsonplaceholder.typicode.com/posts',{
                method:'POST',
                body:JSON.stringify({
                    title:title,
                    body:body,
                    userId: parseInt(userid)
                }),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then(resp=>resp.json()).then((res)=>{console.log(res)})
            .catch(e=>console.log(e));
        }else{
            setErrors(['Invalid valors'])
            console.log(errors)
        }
    }
    async function putPost(){
        await fetch('https://jsonplaceholder.typicode.com/posts/1',{
            method:'PUT',
            body:JSON.stringify({
                id:1,
                title:title,
                body:body,
                userId: parseInt(userid)
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(resp=>resp.json()).then((res)=>{console.log(res)})
        .catch(e=>console.log(e));
    }

console.log(errors)
    return(
        <div>
            {
                errors.length>0 &&
                errors.map((error)=>(
                    <p>{error}</p>
                ))
            }
            <input type="text" name="title" id="" placeholder="titulo" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" name="body" id="" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <input type="number" name="userid" id="" placeholder="user id" value={userid} onChange={(e)=>setUserId(e.target.value)} min={0}/>
            <button onClick={defaultPut ? putPost : postPost}>{defaultPut ? 'Actualizar' : 'Crear'}</button>
        </div>
    );
}