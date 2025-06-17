import { createContext, useState } from "react";
import runChat from "../config/gemini";
 
export const Context= createContext();

const ContextProvider =(props)=>{

    const[input,setInput] =useState("");//inputprompt
    const[recentPrompt,setRecentprompt]=useState("");//
    const [prevPrompts,setPrevPrompts]=useState([]);//inputhistory
    const[showResult,setShowResult]=useState(false);//result
    const[loading,setLoading]=useState(false);
    const[resultData,setResultData]=useState("");

    // Fixed delay function for updating resultData
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, index * 50); // Adjust timing if needed
    };

    const newChat=()=>{
        setLoading (false)
        setShowResult(false)
    }

    const onSent=  async(prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !==undefined){
            response=await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentprompt(input)
            response=await runChat(input)
        }
        
        let responseArray =response.split("**");
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i===0|| i%2 !==1){
                newResponse +=responseArray[i]
            }
            else{
                newArray +="<b>"+responseArray[i]+"</b>";
            }
        }

        let newRrespsonse2 = newResponse.split("*").join("</br>")
        let newReesponseArray=+newRrespsonse2.split("");
        for(let i=0;i<newReesponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput(" ")
    }

    onSent("What is react js")

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentprompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat


    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider 