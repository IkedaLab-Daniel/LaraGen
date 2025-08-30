import { useState } from "react"

const DualAuthForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    return(
        <form action="" className="">
            <h1>Dual Form Auth</h1>
        </form>
    )
}

export default DualAuthForm