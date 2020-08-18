import React from 'react'

import './styles.css'

const pageheader = ({onClick = () => {}}) => {

    return (
        <header className="page-header">
                <div className="top-bar-container">
                        <h1>GrCupons</h1>
                        <button onClick={onClick}>Cadastrar Cupom</button>
                </div>     
        </header>
    )

}

export default pageheader