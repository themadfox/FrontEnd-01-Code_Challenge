import { useEffect, useState } from 'react'
import axios from 'axios'

function App () {
	const [ characterList, setCharacterList ] = useState( [] )

	const getCharacters = async () => {
		const { data } = await axios.get( 'https://rickandmortyapi.com/api/character' )
		console.log( data.results )

		setCharacterList( data.results )
	}

	const hdlAddCharacter = () => {
		// Do Something
	}

	const hdlDeleteCharacter = (id) => {
	setCharacterList( characterList.filter( ( character ) => character.id !== id ) )
	}

	useEffect( () => {
		getCharacters()
	}, [] )

	return (
		<div>
			<h1>Add Character</h1>
			<form className='form'>
				<input type="text" placeholder='Name'/>
				<input type="text" placeholder='Status'/>
				<input type="text" placeholder='Origin'/>
				<input type="text" placeholder='Image'/>
				<input type="text" placeholder='Location'/>
				<button type="submit">Add</button>
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
						<button className="delete_button" onClick={ ()=>hdlDeleteCharacter(character.id) } type="button">Delete</button>
					</article>
				) ) }
			</div>
		</div>
	)
}

export default App
