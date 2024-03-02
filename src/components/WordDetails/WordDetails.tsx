import { StatusType, WordDetail } from "../Dictionary/Dictionary";
import styles from "./WordDetails.module.css";
import play from "../../assets/play.svg";
import { useEffect, useRef, useState } from "react";

type PropType = {
    wordDetail: WordDetail;
    status: StatusType;
};

const WordDetails = ({ wordDetail, status }: PropType) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioSrc = wordDetail?.phonetics?.filter((item) => item.audio !== "");

    function handlePlay() {
        if (isPlaying) audioRef?.current?.play();
        else audioRef?.current?.pause();
    }
    useEffect(() => {
        handlePlay();
    }, [isPlaying]);

    if (status === "error") {
        return (
            <main className={styles.container}>
                <div className={styles.errorContainter}>
                    <h1>🙁 No definitions found</h1>
                    <p>
                        We couldn't find definitions for the word you're looking
                        for
                    </p>
                </div>
            </main>
        );
    }

    if (status === "loading") {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loader}></div>
                </div>
            </div>
        );
    }

    return (
        <main className={styles.container}>
            {status === "success" && (
                <>
                    <div className={styles.header}>
                        <h1>{wordDetail?.word}</h1>
                        {audioSrc?.length > 0 && (
                            <button
                                className={styles.button}
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                                <>
                                    <img src={play} />
                                    <audio
                                        src={audioSrc[0]?.audio}
                                        ref={audioRef}
                                        onEnded={() => setIsPlaying(false)}
                                    />
                                </>
                            </button>
                        )}
                    </div>
                    <div className={styles.content}>
                        {wordDetail?.meanings?.map((meaning, index) => (
                            <div key={index}>
                                <h2>{meaning.partOfSpeech}</h2>
                                <p>Meaning</p>
                                {meaning?.definitions?.map(
                                    (definition, ind) => (
                                        <div key={ind}>
                                            <li>{definition.definition}</li>
                                            <p>{definition?.example}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
};

export default WordDetails;
