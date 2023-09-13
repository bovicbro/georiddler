<script lang="ts">
	import LeafletMap from '$lib/LeafletMap.svelte';
	import Button from '../components/Button.svelte';
	import type { Area, UserGuess } from './gameTypes';
	import { createUserGuess } from './gameTypes';

	let map: LeafletMap;
	let zoomlevel = 0;
	let area: Area = {
		topLeft: {
			lat: 0,
			long: 0
		},
		bottomRight: {
			lat: 0,
			long: 0
		}
	};

	const riddleId = '1';

	const setArea = (a: Area) => {
		area = a;
	};

	const setZoomlevel = (zoom: number) => {
		zoomlevel = zoom;
	};

	const allowedZoom = (zoomlevel: number) => {
		if (zoomlevel > 14) {
			return 'true';
		} else {
			return 'false';
		}
	};

	const submitGuess = async (userGuess: UserGuess) => {
		const response = await fetch('/riddle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ guess: userGuess })
		});
		console.log(response.body);
	};

	const getCurrentUserGuest = (): UserGuess => {
		return createUserGuess(area, riddleId) as UserGuess;
	};
</script>

<svelte:head>
	<title>GuessTheSpot</title>
	<meta name="GuessTheSpot" content="A game where you try to solve a geographical riddle" />
</svelte:head>
<section>
	<div class="container">
		<div class="menu">
			<p>
				Instructions: You get a riddle, the answer to the riddle is a place on earth. Locate the
				place so that it is inside your current view of the map an click "Guess". If the answer to
				the riddle is inside your view port, you get a point. zoom: {allowedZoom(zoomlevel)}
				area: {JSON.stringify(area)}
			</p>
			<div class="buttons">
				<Button text="New riddle" click={() => {}} />
				<Button text="Instructions" click={() => {}} />
				{#if allowedZoom(zoomlevel) === 'true'}
					<Button text="Guess" click={() => submitGuess(getCurrentUserGuest())} />
				{/if}
			</div>
		</div>
		<div class="map">
			<LeafletMap bind:this={map} setZoom={setZoomlevel} updateArea={setArea} />
		</div>
	</div>
</section>

<style>
	p {
		text-align: center;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1em;
	}
	.container {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-content: stretch;
	}
	.menu {
		background-color: #3e4a5c;
		max-height: 10em;
		flex-shrink: 1;
		padding: 1em;
	}
	.map {
		flex-grow: 1;
		position: static;
		position: relative;
	}
</style>
