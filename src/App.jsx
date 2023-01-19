import { useEffect, useState } from 'react'
import axios from 'axios'

function App () {
	const [ characterList, setCharacterList ] = useState( [] )

	const getCharacters = async () => {
		const { data } = await axios.get( 'https://rickandmortyapi.com/api/character' )

		setCharacterList( data.results )
	}

	const hdlAddCharacter = ( e ) => {
		e.preventDefault()

		const form = document.getElementById( 'addCharacter' )

		setCharacterList( [
			{
				id: Math.random(),
				name: form?.elements?.name?.value,
				status: form?.elements?.status?.value,
				species: form?.elements?.species?.value,
				location: {
					name: form?.elements?.location?.value
				},
				origin: {
					name: form?.elements?.origin?.value
				},
				image: form?.elements?.image?.value
			},
			...characterList
		] )
	}

	const hdlDeleteCharacter = ( id ) => {
		setCharacterList( characterList.filter( ( character ) => character.id !== id ) )
	}

	useEffect( () => {
		getCharacters()
	}, [] )

	return (
		<div>
			<h1>Add Character</h1>
			<form id="addCharacter" className="form">
				<input type="text" placeholder="Image" name="image"/>
				<input type="text" placeholder="Name" name="name"/>
				<select name="status">
					<option value="" disabled selected>Select Status</option>
					<option value="Alive">Alive</option>
					<option value="Dead">Dead</option>
					<option value="unknown">Unknown</option>
				</select>
				<input type="text" placeholder="Species" name="species"/>
				<input type="text" placeholder="Origin" name="origin"/>
				<input type="text" placeholder="Location" name="location"/>
				<button type="submit" onClick={ hdlAddCharacter }>Add</button>
			</form>
			<div className="cards_wrapper">
				{ characterList.map( ( character ) => (
					<article className="card">
						<figure>
							<img src={ character.image } alt={ character.name }/>
						</figure>
						<aside className="description">
							<h2>{ character.name }</h2>
							<p>
								<strong>Status:</strong>
								{ character.status }
								<div
									style={ { backgroundColor: character.status === 'Alive' ? 'lawngreen' : character.status === 'Dead' ? 'palevioletred' : 'dimgray' } }/>
							</p>
							<p>
								<strong>Species:</strong>
								{ character.species }
							</p>
							<p>
								<strong>Origin:</strong> { character.origin.name }
							</p>
							<p>
								<strong>Last known location:</strong> { character.location.name }
							</p>
						</aside>
						<button className="delete_button" onClick={ () => hdlDeleteCharacter( character.id ) }
										type="button">Delete
						</button>
					</article>
				) ) }
			</div>
		</div>
	)
}

export default App
