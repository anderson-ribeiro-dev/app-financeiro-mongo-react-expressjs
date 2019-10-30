import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pagerHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos' //url backend

export default class Todo extends Component {
    constructor(props) {
       super(props)
       //estado inicial do objeto
       //alterar os estado setState({})
       this.state = { 
            description: '',
            list: [] 
        }

       this.handleChange = this.handleChange.bind(this) 
       this.handleAddF = this.handleAddF.bind(this) 
       this.handleRemove = this.handleRemove.bind(this)
       this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
       this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
       this.handleSearch = this.handleSearch.bind(this)
       this.handleClear = this.handleClear.bind(this)

       this.refresh()
    }

    //e - evento do ochange
    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value }) //pegar os valores do form
    }

    //buscar dados, filtro
    refresh (description = '') {
        const search = description ? `&description__regex=/${description}/` : '' //filtro descrição
        axios.get(`${URL}?sort=-createdAt${search}`) //ordenado resultado
            .then((resp) => this.setState({...this.state, description, list: resp.data}))
    }

    //fitro
    handleSearch() {
        this.refresh(this.state.description)
    }

    //manipular o evento
    handleAddF() {
    //   console.log(this.state.description)
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())

    }


    //remover elemento
    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    //marcar como feito 
    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => this.refresh(this.state.description))
    }

    //desmarcar feito
    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refresh(this.state.description))
    }

    handleClear() {
        this.refresh()
    }


    render(){
        return (
            <div>
                <PageHeader name="Tarefar" small="Cadastro"/>

                <TodoForm  description={this.state.description}
                           handleChange={this.handleChange}
                           handleAdd={this.handleAddF} 
                           handleSearch={this.handleSearch}
                           handleClear={this.handleClear}/>

                <TodoList list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove}/>
            </div>
        )
    }
}