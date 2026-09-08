"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { tr } from "framer-motion/client";
import { useState } from "react";
const OutputPanel = () => {
  const{output,error,isRunning}=useCodeEditorStore();
  const [isCopied, setIsCopied]=useState(false);
  const hasContent =error || output;

  const handlecopy=async ()=>{
    if(!hasContent)
      return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() =>  setIsCopied(false),2000);
  }
  return (
    <div>OutputPanel</div>
  )
}

export default OutputPanel