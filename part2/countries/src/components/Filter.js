const Filter = ({valueVar, changeHandler}) => {
return (
    <div>Find countries <input value={valueVar} onChange={changeHandler}/></div>
)
}

export default Filter