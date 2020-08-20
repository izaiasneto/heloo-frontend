import React, { Component } from 'react';

import Input from '../../components/Input'

import api from '../../service/api';

import './styles.css'

class EditForm extends Component {

    state = {
        CupomForm: {
            code: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Codigo'
                },
                value: this.props.cupom.code,
                validation: {
                    required: true,
                    isCupom: true,
                },
                valid: true,
                touched: false,
                label: 'Código:'
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Descrição'
                },
                value: this.props.cupom.description,
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
                label: 'Descrição:'
            },
            value: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'valor'
                },
                value: this.props.cupom.value,
                validation: {
                    required: true
                },
                valid: true,
                label: 'Valor:'
            },
            date_max: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Descrição'
                },
                value: this.props.cupom.date_max,
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                label: 'Data de expiração:'
            },
            situation: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Ativo', displayValue: 'Ativo'},
                        {value: 'Expirado', displayValue: 'Expirado'},
                        {value: 'Usado', displayValue: 'Usado'}
                    ]
                },
                value: this.props.cupom.situation,
                validation: {
                    required: true
                },
                valid: true,
                label: 'Situação:'
            }      
        },

        
        formIsValid: true,
    }

    cupomHandler = (event) => {

        api.put(`cupons/${this.props.cupom._id}`, {  
           code: this.state.CupomForm.code.value,
           description: this.state.CupomForm.description.value,
           value: this.state.CupomForm.value.value,
           date_max: this.state.CupomForm.date_max.value,
           situation:  this.state.CupomForm.situation.value,
        })
    }

    checkValidity(value, rules) {
        let isValid = true;
       
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        
       
        if (rules.isCupom) {
            const pattern = /(?=.*[a-zA-Z])/;
            isValid = pattern.test(value) && isValid
        } 

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedCupomForm = {
            ...this.state.CupomForm
        }

        const updatedFormElement = {
            ...updatedCupomForm[inputId]
        }    
        
        if(event.target.value !== updatedFormElement.value){
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
            updatedFormElement.touched = true;
            updatedCupomForm[inputId] = updatedFormElement;

            let formIsValid = true;

            for(let inputId in updatedCupomForm){
                formIsValid = updatedCupomForm[inputId].valid && formIsValid
            }

            this.setState({
                CupomForm: updatedCupomForm, 
                formIsValid: formIsValid
            })

        }
    
    }

    render(){
        const formElementsArray = []
        for(let key in this.state.CupomForm){
            formElementsArray.push({
                id: key,
                config: this.state.CupomForm[key]
            })
        }
        let invalid = ''
        
        if (!this.state.CupomForm.code.valid && 
            this.state.CupomForm.code.validation && 
            this.state.CupomForm.code.touched) {

                invalid = <p>Seu código tem que conter pelo menos 1 letra</p>
        }

        let form = (
            <form onSubmit={this.cupomHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        label={formElement.config.label}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    
                    />
                ))}
                <button type="submit" disabled={!this.state.formIsValid}>Salvar</button>
            </form>
        )
        return (
            <div className='cupomForm'>
                <h4>Editar cupom</h4>
                {invalid}
                {form}
            </div>
        )
    }

}

export default EditForm;