import { defineConfig, devices } from '@playwright/test'

// View transitions are a Chromium feature, so we test against the
// prerendered production build served by `vite preview`.
export default defineConfig({
	testDir: 'e2e',
	use: { baseURL: 'http://localhost:4173' },
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: !process.env.CI,
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
