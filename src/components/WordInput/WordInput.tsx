import { useState, useRef, useEffect } from "react";
import search from "../../assets/search.svg";
import styles from "./WordInput.module.css";
import { StatusType, WordDetail } from "../Dictionary/Dictionary";

type PropType = {
    setMeaning: (obj: WordDetail) => void;
    setStatus: (arg: StatusType) => void;
};

const WordInput = ({ setMeaning, setStatus }: PropType) => {
    const [word, setWord] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    function handleWordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setWord(e.target.value);
    }
    async function getWord() {
        setStatus("loading");
        try {
            const res = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            if(res.ok) {
                const data = await res.json();
                setMeaning(data[0]);
                setStatus("success");

            }
            else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (word === "") {
            alert("enter a valid word");
            return;
        }
        // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        //     .then((res) => res.json())
        //     .then((data) => setMeaning(data[0]));
        getWord();
        setWord("");
    }

    

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input
                className={styles.input}
                type="text"
                placeholder="Search for a word"
                value={word}
                onChange={(e) => handleWordChange(e)}
                ref={inputRef}
            />
            <button className={styles.button}>
                <img src={search} />
            </button>
        </form>
    );
};

export default WordInput;
