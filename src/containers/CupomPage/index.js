import React, { Component } from 'react'

import CupomList from '../../components/CupomList'
import PageHeader from '../../components/PageHeader'
import Modal from '../../components/Modal'
import api from '../../service/api'
import SearchForm from '../SearchForm'
import CupomForm from '../CupomForm'
import EditForm from '../EditForm'

import './styles.css'



class CupomPage extends Component{

    constructor(props) {
        super(props)

        this.state = {
            cupons: [],
            displayCupons: [],
            isLoading: true,
            isModalVisible: false,
            isModalVisible2: false,
            cupom: []
        }
    }
    
    
    componentDidMount(){
        api.get('cupons')
            .then(res => {
                
                this.setState({
                    cupons :  res.data,
                    displayCupons:  res.data.slice().reverse(),
                    isLoading: false,
                })
                
            })
            .catch(() => {
                this.setState({loading : true})
                
            }) 
    }

    setModal = () => {
        if( this.state.isModalVisible === true){
            this.setState({ isModalVisible :  false})
        } else {
            this.setState({ isModalVisible : true})
        }
        
    }

    setModal2 = () => {    
        this.setState({ isModalVisible2 :  false})      
    }

    editCupom = (id) => {

        this.setState({ isModalVisible2 : true})

        let updatedDisplayCupom = [...this.state.cupons]

        var i = updatedDisplayCupom.findIndex(cupom => cupom._id === id)

        const updatedFormElement = {
            ...updatedDisplayCupom[i]
        }

        this.setState({cupom : updatedFormElement})
             
    }

    inputCupomHandler = SearchForm => {
            let updatedDisplayUsers = [...this.state.cupons]
            
            if(SearchForm["situation"].value === '' && 
               SearchForm["dateMin"].value === '' && 
               SearchForm["dateMax"].value === ''){
                this.setState({
                    displayCupons: updatedDisplayUsers
                })
            } else {
                api.get('cupons', {
                    params: {
                        situation: SearchForm["situation"].value ,
                        dateMin: SearchForm["dateMin"].value,
                        dateMax: SearchForm["dateMax"].value
                    }
                })
                .then(res => {
                    this.setState({
                        displayCupons: res.data.slice().reverse(),
                        isLoading: false,
                    })
                    
                })
                .catch(() => {
                    this.setState({isLoading: false})
                }) 
            }
            
        
    }

    deleteCupom = id => {

        var i = this.state.displayCupons.findIndex(cupom => cupom._id === id);

        let updatedCupons = [...this.state.displayCupons] 
        
        updatedCupons.splice(i, 1);

        api.delete(`cupons/${id}`)
            .then(res => {

                this.setState({
                    displayCupons :  updatedCupons,
                    isLoading: false,
                })
            })
            .catch(() => {
                this.setState({isLoading: false})
            }) 
                
    }

    render(){
        let cupons = <p id="loading">Carregando...</p>;

        if(!this.state.loading){
            cupons = <CupomList cupons={this.state.displayCupons} deleteCupom={this.deleteCupom} editCupom={this.editCupom}/>
                
        } 

        let modal = null;
        let modal2 = null;

        if(this.state.isModalVisible === true) {
            modal = <Modal onClose={this.setModal} ><CupomForm /></Modal>
        }

        if(this.state.isModalVisible2 === true) {
            modal2 = <Modal onClose={this.setModal2}><EditForm cupom={this.state.cupom} /></Modal>
        } 

        return(
           
                <div>
                    <PageHeader onClick={this.setModal}/>
                    
                    <main>
                        {modal}
                        {modal2}
                        <SearchForm inputHandler={this.inputCupomHandler}/>
                        {cupons}
                    </main>
                </div>
            
        )
    }
}


export default CupomPage;
