import { expect, test } from '@playwright/test'

test('navigates from the index to a planet, carrying the shared element', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { name: 'Planets in your solar system' })).toBeVisible()

	// Every planet links to its detail page.
	await expect(page.locator('a.planet')).toHaveCount(8)

	// The image and title expose a `view-transition-name`, which is what lets the
	// browser morph them into the matching elements on the detail page.
	const thumb = page.locator('a[href="planets/earth"] img')
	await expect(thumb).toHaveCSS('view-transition-name', 'image-Earth')

	await page.locator('a[href="planets/earth"]').click()
	await expect(page).toHaveURL('/planets/earth')

	const title = page.getByRole('heading', { level: 1, name: 'Earth' })
	await expect(title).toBeVisible()
	await expect(title).toHaveCSS('view-transition-name', 'title-Earth')
})

test('the active nav link reflects the current route', async ({ page }) => {
	await page.goto('/about')
	await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
	await expect(page.getByRole('link', { name: 'Flights' })).not.toHaveAttribute('aria-current', 'page')
})

test('the reservation button animates into its loading state', async ({ page }) => {
	await page.goto('/planets/earth')

	const button = page.getByRole('button')
	await expect(button).toHaveAttribute('data-state', 'idle')
	await expect(button).toContainText('Make reservation')

	await button.click()
	await expect(button).toHaveAttribute('data-state', 'loading')
	await expect(button).toContainText('Making reservation')
})
