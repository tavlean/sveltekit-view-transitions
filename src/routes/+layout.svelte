<script lang="ts">
	import ViewTransition from './navigation.svelte'
	import Header from './header.svelte'
	import '../app.css'
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Planets</title>
</svelte:head>

<div class="app">
	<ViewTransition />
	<Header />

	<main>
		{@render children?.()}
	</main>
</div>

<style>
	.app {
		padding-block: 2rem;
	}
</style>
