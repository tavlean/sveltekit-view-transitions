<script lang="ts">
	import type { Snippet } from 'svelte'
	import { onNavigate } from '$app/navigation'
	import Header from './header.svelte'
	import '../app.css'

	let { children }: { children: Snippet } = $props()

	// Animate every client-side navigation with the View Transitions API.
	// https://svelte.dev/docs/kit/$app-navigation#onNavigate
	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<title>Planets</title>
</svelte:head>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		padding-block: 2rem;
	}
</style>
