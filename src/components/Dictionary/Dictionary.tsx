import { useState } from "react";
import WordDetails from "../WordDetails/WordDetails";
import WordInput from "../WordInput/WordInput";

export type WordDetail = {
    word: string;
    phonetic: string;
    phonetics: [{ text: string; audio: string }];
    origin: string;
    meanings: [
        {
            partOfSpeech: string;
            definitions: [
                {
                    definition: string;
                    example: string;
                    synonyms: [];
                    antonyms: [];
                }
            ];
        }
    ];
};

export type StatusType = "idle" | "loading" | "success" | "error";

const Dictionary = () => {
    const [wordDetail, setWordDetail] = useState({} as WordDetail);
    const [status, setStatus] = useState<StatusType>("idle");
    function setMeaning(obj: WordDetail) {
        setWordDetail(obj);
    }
    return (
        <>
            <WordInput setMeaning={setMeaning} setStatus={setStatus} />
            <WordDetails wordDetail={wordDetail} status={status} />
        </>
    );
};

export default Dictionary;
