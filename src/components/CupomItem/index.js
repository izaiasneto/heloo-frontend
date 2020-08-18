import React from 'react';

import './styles.css'


const CupomItem = ({editCupom = () => {} , deleteCupom = () => {} , cupom}) => {
    let style = "item"

    if(cupom.situation === 'Expirado' ){
        style = "expirado"
    }
    

    return(
        
            <tr className={style}  >
                <td>{cupom.code}</td>
                <td>{cupom.description}</td>
                <td id="td-value">R$ {cupom.value},00</td>
                <td>{cupom.date_max}</td>
                <td>{cupom.use_date}</td>
                <td>{cupom.situation}</td>
                <td>
                    <div className="buttons">
                        <button disabled={cupom.situation === 'Expirado'} type="button" onClick={() => editCupom(cupom._id)} className="buttonEditar">Editar</button>
                        <button type="button" onClick={() => deleteCupom(cupom._id)} className="buttonApagar">Apagar</button>
                    </div>
                   
                </td>
            </tr>
        
    )      
    
}

export default CupomItem;