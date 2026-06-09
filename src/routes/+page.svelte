<script lang="ts">
	import { onMount } from 'svelte'
	import { Tween } from 'svelte/motion'
	import { formatNumber } from '$lib/utils'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const options = { duration: 4000 }
	const moons = new Tween(0, options)
	const asteroids = new Tween(0, options)
	const comets = new Tween(0, options)

	onMount(() => {
		moons.target = 200
		asteroids.target = 1_303_348
		comets.target = 3_885
	})
</script>

<div class="container">
	<h1 class="title">Planets in your solar system</h1>

	<div class="details">
		<div class="item">
			<div>Moons</div>
			<div>{formatNumber(moons.current)}+</div>
		</div>

		<div class="item">
			<div>Asteroids</div>
			<div>{formatNumber(asteroids.current)}</div>
		</div>

		<div class="item">
			<div>Comets</div>
			<div>{formatNumber(comets.current)}</div>
		</div>
	</div>

	<div class="planets">
		{#each data.planets as { name, image }}
			<a href="planets/{name.toLowerCase()}" class="planet">
				<img src={image} alt={name} style:--planet="image-{name}" />
				<h2 style:--title="title-{name}">{name}</h2>
			</a>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 1024px;
		margin-inline: auto;
	}

	.title {
		max-width: 600px;
		margin-top: 6rem;
		margin-inline: auto;
		text-align: center;
	}

	.details {
		max-width: 800px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-block: 4rem;
		margin-inline: auto;
		padding-block: 2rem;
		border-top: 1px solid hsl(220 40% 14%);
		border-bottom: 1px solid hsl(220 40% 14%);

		& .item {
			text-align: center;

			& :nth-child(1) {
				color: hsl(220 40% 90%);

				font-weight: 600;
				text-transform: uppercase;
			}

			& :nth-child(2) {
				font-size: 1.4rem;
			}
		}
	}

	.planets {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 4rem;

		& h2 {
			view-transition-name: var(--title);
		}

		& .planet {
			display: grid;
			place-content: center;
			text-align: center;

			& img {
				width: 280px;
				opacity: 0.8;
				transition: opacity 0.3s ease;
				user-select: none;
				view-transition-name: var(--planet);

				&:hover {
					opacity: 1;
				}
			}
		}
	}
</style>
