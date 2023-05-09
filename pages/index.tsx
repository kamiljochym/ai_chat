import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Dropdown from './components/Dropdown'
import ChatTab from './components/chatTab'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [spongebobChat, setSpongebobChat] = useState<{ role: string; content: string }[]>([])
    const [batmanChat, setBatmanChat] = useState<{ role: string; content: string }[]>([])
    const [homerChat, setHomerChat] = useState<{ role: string; content: string }[]>([])
    const [messageInput, setMessageInput] = useState('')
    const [character, setCharacter] = useState('Homer Simpson')

    const onSubmit = async (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) => {
        if (character === 'Homer Simpson') {

            setHomerChat((prevResult) => [
                ...prevResult,
                { role: 'user', content: messageInput },
            ])
        }
        if (character === 'Batman') {

            setBatmanChat((prevResult) => [
                ...prevResult,
                { role: 'user', content: messageInput },
            ])
        }
        if (character === 'Spongebob') {

            setSpongebobChat((prevResult) => [
                ...prevResult,
                { role: 'user', content: messageInput },
            ])
        }

        setMessageInput('')
        event.preventDefault()
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: messageInput, character: character }),
            })

            const data = await response.json()
            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                )
            }
            console.log(data.result)


            if (character === 'Homer Simpson') {

                setHomerChat((prevResult) => [...prevResult, data.result])
            }
            if (character === 'Batman') {

                setBatmanChat((prevResult) => [...prevResult, data.result])
            }
            if (character === 'Spongebob') {

                setSpongebobChat((prevResult) => [...prevResult, data.result])
            }
        } catch (error: any) {
            // Consider implementing your own error handling logic here
            console.error(error)
            alert(error.message)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageInput(event.target.value)
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key == 'Enter') {
            event.preventDefault()
            onSubmit(event)
        }
    }

    const handleChangeCharacter = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCharacter(event.target.value)
    }

    return (
        <>
            <Head>Chat To Fictional Characters</Head>
            <main className={`${styles.main} ${inter.className}`}>
                <div className={styles.titleContainer}>
                    <Dropdown
                        names={['Homer Simpson', 'Batman', 'Spongebob']}
                        handleChangeCharacter={handleChangeCharacter}
                    />
                    <h1 className={styles.heading}>Ask me anything! </h1>
                </div>
                {
                    character === 'Homer Simpson' ? <ChatTab chat={homerChat} /> : ''
                }
                {
                    character === 'Batman' ? <ChatTab chat={batmanChat} /> : ''
                }
                {
                    character === 'Spongebob' ? <ChatTab chat={spongebobChat} /> : ''
                }
                {/* <div className={styles.chatContainer}> */}
                {/*   <div className={styles.chat}> */}
                {/*     {result.map((msg, idx) => ( */}
                {/*       <p className={`${styles[msg.role]}`} key={idx}> */}
                {/*         {msg.content} */}
                {/*       </p> */}
                {/*     ))} */}
                {/*   </div> */}
                {/* </div> */}
                <form className={styles.inputContainer}>
                    <textarea
                        className={styles.inputBox}
                        value={messageInput}
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                    ></textarea>
                    <button onClick={onSubmit} type='submit'>
                        Send
                    </button>
                </form>
            </main>
        </>
    )
}
