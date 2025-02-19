import React, { useState, useEffect } from 'react'
import './CardDetails.scss'

export default function CardDetails() {
	useEffect(() => {
		document.title = 'Create New Card'
	}, [])

	// создана ли новая карта
	const [newCard, setNewCard] = useState(false)

	// состояние для карты с начальными значениями
	const [cardName, setCardName] = useState('Jane Appleseed')
	const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000')
	const [cardMonth, setCardMonth] = useState('00')
	const [cardYear, setCardYear] = useState('00')
	const [cardCvc, setCardCvc] = useState('000')

	// состояния для ошибок
	const [nameError, setNameError] = useState('')
	const [numberError, setNumberError] = useState('')
	const [dateError, setDateError] = useState('')
	const [cvcError, setCvcError] = useState('')

	// регулярные выражения для проверки вводимых данных
	const cardNameRegExp = /^[A-Za-z\sА-Яа-я]+$/
	const cardNumberRegExp = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/
	const cardCvcRegExp = /^\d{3}$/
	const cardMonthRegExp = /^(0[1-9]|1[0-2])$/

	const handleInputName = event => {
		const { value } = event.target
		setCardName(value)

		if (cardNameRegExp.test(value)) {
			setNameError('')
		} else {
			setNameError('Имя карты должно содержать только буквы и пробелы')
		}
	}

	const handleInputNumber = event => {
		const { value } = event.target
		setCardNumber(value)

		if (cardNumberRegExp.test(value)) {
			setNumberError('')
		} else {
			setNumberError('Номер карты должен быть в формате 0000 0000 0000 0000')
		}
	}

	const handleInputMonth = event => {
		const { value } = event.target
		setCardMonth(value)

		if (cardMonthRegExp.test(value)) {
			setDateError('')
		} else {
			setDateError('Некорректный формат даты')
		}
	}

	const handleInputYear = event => {
		const { value } = event.target
		setCardYear(value)
	}

	const handleInputCvc = event => {
		const { value } = event.target
		setCardCvc(value)

		if (cardCvcRegExp.test(value)) {
			setCvcError('')
		} else {
			setCvcError('CVC должен содержать 3 цифры')
		}
	}

	const handleNewCard = event => {
		event.preventDefault()
		if (!nameError && !numberError && !dateError && !cvcError) {
			setNewCard(true)
		} else {
			setNewCard(false)
		}
	}

	return (
		<div className='cardDetails'>
			<section className='cardData'>
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
								{cardMonth}/{cardYear}
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
					<div className='circle'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='50'
							height='30'
							viewBox='0 0 256 256'
						>
							<g fill='#ffffff' strokeWidth='1000'>
								<g transform='scale(8.53333,8.53333)'>
									<path d='M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z'></path>
								</g>
							</g>
						</svg>
					</div>
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
							onChange={handleInputMonth}
							type='text'
							placeholder='MM'
							className='smallInput'
							required
						/>
						<input
							id='cardMMYY'
							maxLength={`2`}
							onChange={handleInputYear}
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
