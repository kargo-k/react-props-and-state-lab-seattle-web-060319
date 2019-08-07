import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilters = (value) => {
    this.setState({ filters: { type: value } })
  }

  fetchPets = () => {
    const filter = this.state.filters.type
    let url
    if (filter === 'all') {
      url = '/api/pets'
    } else {
      url = `/api/pets?type=${filter}`
    }
    fetch(url)
      .then(res => res.json())
      .then(newPets => this.setState({ pets: newPets }
      ))
  }

  adoptPet = (petId) => {
    console.log(petId)
    let thisPet = this.state.pets.find(pet => pet.id == petId)
    let index = this.state.pets.indexOf(thisPet)
    thisPet.isAdopted = true
    this.setState(prevState => {
      let pets = prevState.pets
      pets[index] = thisPet
      return { pets: pets }
    })
  }

  render() {
    return (
      <div className="ui container" >
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFilters} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
