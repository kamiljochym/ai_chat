import styles from '@/styles/Home.module.css'

type ChatTabProps = {
    chat: { role: string; content: string }[],
    // handleChangeCharacter: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const ChatTab = ({ chat }: ChatTabProps) => {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chat}>
                {chat.map((msg, idx) => (
                    <p className={`${styles[msg.role]}`} key={idx}>
                        {msg.content}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default ChatTab
