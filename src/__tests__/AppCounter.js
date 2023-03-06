import '@testing-library/jest-dom'
import { render, screen, act } from "@testing-library/react"

import AppCounter from "../AppCounter"

describe('AppCounter', () => {

	it('should increment the counter when clicked', async () => {
		render(<AppCounter />)

		act(() => {
			screen.getByText('+').click()
		})

		expect(screen.getByText('Count: 1')).toBeInTheDocument()
	})

	it('should decrement the counter when clicked', async () => {
		render(<AppCounter />)

		act(() => {
			screen.getByText('-').click()
		})

		expect(screen.getByText('Count: -1')).toBeInTheDocument()
	})

	it('should reset the counter when clicked', async () => {
		render(<AppCounter />)

		act(() => {
			screen.getByText('-').click()
		})

		expect(screen.getByText('Count: -1')).toBeInTheDocument()

		act(() => {
			screen.getByText('Reset').click()
		})

		expect(screen.getByText('Count: 0')).toBeInTheDocument()
	})
})
