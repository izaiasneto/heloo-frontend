import React from 'react';

import CupomItem from '../../components/CupomItem'
import './styles.css'


const cupomList = (props) => {
     
 
        return(
            <React.Fragment>
                <table id="cupom-list">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data de Expiração</th>
                            <th>Data de Uso</th>
                            <th>Situação</th>
                            <th>Ação</th>                          
                        </tr>
                    </thead>
                    <tbody>
                    {props.cupons.map(cupom => {
                            return <CupomItem key={cupom._id} cupom={cupom} deleteCupom={props.deleteCupom}  editCupom={props.editCupom}/>
                        })}               
                    </tbody>
                </table>
            </React.Fragment>
        )
    
}

export default cupomList;