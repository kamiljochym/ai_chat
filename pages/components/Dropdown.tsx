import styles from '@/styles/Home.module.css'

type DropdownProps = {
    names: string[]
    handleChangeCharacter: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown = ({ names, handleChangeCharacter }: DropdownProps) => {
    return (
        <select className={styles.dropdownMenu} onChange={handleChangeCharacter}>
            {names.map((name, idx) => (
                <option className={styles.dropdownItem} key={idx}>
                    {name}
                </option>
            ))}
        </select>
    )
}

export default Dropdown
