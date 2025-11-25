type Props = {
    htmlform:string;
    label:string;
}

function Label(props: Props) {
    const {htmlform,label} = props;
  return (
    <label htmlFor={htmlform} className="block text-sm/6 font-medium text-gray-900" >
      
      {label}
      </label>
    
  )
}

export default Label