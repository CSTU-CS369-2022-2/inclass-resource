import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from "@testing-library/react"

import AppFilter from "../AppFilter"

describe('AppFilter', () => {
	it('should filter elements when select filter value', async () => {
		render(<AppFilter />)

		const select = screen.getByDisplayValue('...')

		await waitFor(() => {
			expect(select).toBeInTheDocument()
		})

		expect(screen.getByText('4 tasks remaining')).toBeInTheDocument()
		expect(screen.getAllByRole('listitem').length).toEqual(4)

		fireEvent.change(select, { target: { value: 'done' }})

		await waitFor(() => {
			expect(screen.getByDisplayValue('Done')).toBeInTheDocument()
		})
		expect(screen.getByText('2 tasks remaining')).toBeInTheDocument()
		expect(screen.getAllByRole('listitem').length).toEqual(2)
	})

	it('should add item when click add todo button', () => {
		// TODO: to be implemented by student
	})

	it('should delete item when click delete button', () => {
		// TODO: to be implemented by student
	})
})