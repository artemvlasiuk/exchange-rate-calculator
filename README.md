# Currency Converter

[DEMO LINK](https://exchange-rate-calculator-nine.vercel.app/)

## Description

A simple currency converter built with React, Typescript, HTML, and CSS. The app fetches real-time currency exchange rates using the ExchangeRate API and provides users with the ability to convert between different currencies.

## Features

### Header with Exchange Rates

- The header displays the current exchange rates of USD and EUR to UAH.
- The rates are fetched from a public API (ExchangeRate API) to ensure real-time accuracy.

### Currency Conversion Component

- The app includes separate input and select elements for each currency.
- Users can input the amount to convert, and the conversion is recalculated based on the selected currencies.
- The select dropdown includes at least three currencies: UAH, USD, and EUR.
- Conversion works both ways: changing the amount or currency in either input will automatically recalculate the corresponding value in the other input.

### Additional Features

- The conversion recalculates correctly when changing the currency in either select dropdown.
- Smooth and user-friendly interface with well-structured code.

## Installation

1. Download the repository.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173/`.
