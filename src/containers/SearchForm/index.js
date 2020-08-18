import React, { Component} from 'react'

import Input from '../../components/SearchInput'

import './styles.css'


class SearchForm extends Component {
    
    state = {
        searchForm: {
            situation: {
                elementType: 'select',
                elementConfig: {
                        options: [
                            {value: '', displayValue: 'Todos'},
                            {value: 'Ativo', displayValue: 'Ativo'},
                            {value: 'Expirado', displayValue: 'Expirado'},
                            {value: 'Usado', displayValue: 'Usado'}
                        ]
                    },
                    value: '',
                    
            },
            dateMin: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'DD-MM-AAAA'
                },
                value: '',
                label: 'De:',
                   
            },
            dateMax: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'DD-MM-AAAA'
                },
                value: '',
                label: 'Até:',
                   
            },   

        },
            
    }


    inputChangedHandler = (event, inputIdentifier, inputHandler) => {
        
        if(!this.props.isLoading){
            const updatedSearchForm = { ...this.state.searchForm}
        
            
            const updatedFormElement = {
                ...updatedSearchForm[inputIdentifier]
            };

            updatedFormElement.value = event.target.value;
            updatedSearchForm[inputIdentifier] = updatedFormElement;

            this.setState({ searchForm: updatedSearchForm });

            inputHandler(updatedSearchForm);
        }
    }

    

    
    render() {

        const formElementsArray = [];
        //adicionar uma key e um config
        for (let key in this.state.searchForm) {
            formElementsArray.push({
                id: key,
                config: this.state.searchForm[key]
            });
        }   
        let search = (
            <div className='searchFormInputs'>
                    <form className="searchSelect">
                        <Input
                            key={formElementsArray[0].id}
                            elementType={formElementsArray[0].config.elementType}
                            elementConfig={formElementsArray[0].config.elementConfig}
                            value={formElementsArray[0].config.value}

                            changed={event =>
                                this.inputChangedHandler(
                                  event,
                                  formElementsArray[0].id,
                                  this.props.inputHandler
                                )
                              }
                        />
                        </form>
                    <form className="searchDates">

                        <Input
                            key={formElementsArray[1].id}
                            label={formElementsArray[1].config.label}
                            elementType={formElementsArray[1].config.elementType}
                            elementConfig={formElementsArray[1].config.elementConfig}
                            value={formElementsArray[1].config.value}

                            changed={event =>
                                this.inputChangedHandler(
                                  event,
                                  formElementsArray[1].id,
                                  this.props.inputHandler
                                )
                              }
                        />
                        <Input
                            key={formElementsArray[2].id}
                            label={formElementsArray[2].config.label}
                            elementType={formElementsArray[2].config.elementType}
                            elementConfig={formElementsArray[2].config.elementConfig}
                            value={formElementsArray[2].config.value}

                            changed={event =>
                                this.inputChangedHandler(
                                  event,
                                  formElementsArray[2].id,
                                  this.props.inputHandler
                                )
                              }
                        />
                    </form>
                
              </div>  
            
        )
        
        return (
            <div className='searchForm'>
                
                {search}
                
            </div>   
        )
    }
}

export default SearchForm;