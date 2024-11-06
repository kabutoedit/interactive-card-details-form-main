import React, { useState, useEffect } from 'react';
import './CardDetails.scss'

export default function CardDetails() {

  useEffect(() => {
		document.title = 'Create New Card'
	}, [])

	const [newCard, setNewCard] = useState(false)

	
	const [cardName, setCardName] = useState('Jane Appleseed')
	const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000')
	const [cardDate1, setCardDate1] = useState('00')
	const [cardDate2, setCardDate2] = useState('00')
	const [cardCvc, setCardCvc] = useState('000')


	const [nameError, setNameError] = useState('')
	const [numberError, setNumberError] = useState('')
	const [dateError, setDateError] = useState('')
	const [cvcError, setCvcError] = useState('')

	const cardNamePattern = /^[A-Za-z\sА-Яа-я]+$/
	const cardNumberPattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/ 
	const cardCvcPattern = /^\d{3}$/

	const handleInputName = event => {
		const { value } = event.target
		setCardName(value)

		if (cardNamePattern.test(value)) {
			setNameError('')
		} else {
			setNameError('Имя карты должно содержать только буквы и пробелы')
		}
	}

	const handleInputNumber = event => {
		const { value } = event.target
		setCardNumber(value)

		if (cardNumberPattern.test(value)) {
			setNumberError('')
		} else {
			setNumberError('Номер карты должен быть в формате 0000 0000 0000 0000')
		}
	}

	const handleInputDate1 = event => {
		const { value } = event.target
		setCardDate1(value)

		if (value.length === 2 && !/^(0[1-9]|1[0-2])$/.test(value)) {
			setDateError('Некорректный формат даты')
		} else {
			setDateError('')
		}
	}

	const handleInputDate2 = event => {
		const { value } = event.target
		setCardDate2(value)
	}

	const handleInputCvc = event => {
		const { value } = event.target
		setCardCvc(value)

		if (cardCvcPattern.test(value)) {
			setCvcError('')
		} else {
			setCvcError('CVC должен содержать 3 цифры')
		}
	}

	const handleNewCard = event => {
		event.preventDefault()
		if (!nameError && !numberError && !dateError && !cvcError) {
			setNewCard(true)
		}
		else {
			setNewCard(false)
		}
	}

return (
	<div className='cardDetails'>
		<section>
			<div className='cardFront'>
				<div className='circles'>
					<div className='circle'></div>
					<div className='circleLow'></div>
				</div>
				<div className='cardData'>
					<p>{cardNumber}</p>
					<div className='cardName'>
						<h6>{cardName}</h6>
						<h6>
							{cardDate1}/{cardDate2}
						</h6>
					</div>
				</div>
			</div>
			<div className='cardBack'>
				<p>{cardCvc}</p>
			</div>
		</section>

		{newCard ? (
			<div className='newCard'>
				<div className='circle'>✔</div>
				<h2>Thank you!</h2>
				<p>We've added your card details</p>

				<button>Continue</button>
			</div>
		) : (
			<form className='cardNewData' onSubmit={handleNewCard}>
				<label htmlFor='cardName'>CARDHOLDER NAME</label>
				<input
					id='cardName'
					maxLength={`30`}
					onChange={handleInputName}
					type='text'
					placeholder='e.g. Jane Appleseed'
					required
				/>
				{nameError && (
					<span className='errorMessage' style={{ color: 'red' }}>
						{nameError}
					</span>
				)}
				<label htmlFor='cardNumber'>CARD NUMBER</label>
				<input
					id='cardNumber'
					maxLength={`19`}
					onChange={handleInputNumber}
					type='text'
					placeholder='e.g. 1234 5678 9123 0000'
					required
				/>
				{numberError && (
					<span className='errorMessage' style={{ color: 'red' }}>
						{numberError}
					</span>
				)}

				<label htmlFor='cardMMYY'>
					EXP. DATE (MM/YY){' '}
					<label htmlFor='cardCvc' className='cvcText'>
						CVC
					</label>
				</label>
				<div>
					<input
						id='cardMMYY'
						maxLength={`2`}
						onChange={handleInputDate1}
						type='text'
						placeholder='MM'
						className='smallInput'
						required
					/>
					<input
						id='cardMMYY'
						maxLength={`2`}
						onChange={handleInputDate2}
						type='text'
						placeholder='YY'
						className='smallInput'
						required
					/>
					{dateError && (
						<span
							className='errorMessage errorMessage2'
							style={{ color: 'red' }}
						>
							{dateError}
						</span>
					)}
					<input
						id='cardCvc'
						maxLength={`3`}
						onChange={handleInputCvc}
						type='text'
						placeholder='e.g. 123'
						className='mediumInput'
						required
					/>
					{cvcError && (
						<span
							className='errorMessage errorMessage2'
							style={{ color: 'red' }}
						>
							{cvcError}
						</span>
					)}
				</div>
				<button type='submit'>Confirm</button>
			</form>
		)}
	</div>
)
}