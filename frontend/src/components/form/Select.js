import styles from './Select.module.css'

const Select = ({ text, name, options, handleOnChange, value }) => {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>
                {text}:
                <select
                    name={name}
                    id={name}
                    onChange={handleOnChange}
                    value={value || ''}
                >

                    <option value="">Selecione uma opção</option>
                    {options.map((option) => (
                        <option value={option} key={option}>
                            {option}
                        </option>    
                    ))}
                </select>
            </label>
        </div>

    )
}

export default Select