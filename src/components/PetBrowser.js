import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  mapPets = () => {
    return this.props.pets.map(pet => {
      return <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} key={pet.id}/>
    })
  }
  render() {
    let pets = this.props.pets
    return (<div className="ui cards">
      {this.mapPets()}
    </div>)
  }
}

export default PetBrowser
