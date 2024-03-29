<script lang="ts">
	import LeafletMap from '$lib/LeafletMap.svelte';
	import Button from '../components/Button.svelte';
	import type { Area, Mark, UserGuess } from './gameTypes';
	import { createUserGuess } from './gameTypes';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { markers } from '../store';
	import { resetState, getInitialState, type State } from '$lib/game/game';
	import { toggleInstructions } from '$lib/game/ui';

	const addMarker = (mark: Mark) => {
		markers.update((prev) => [...prev, mark]);
	};

	let state: State = getInitialState();
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

	const setArea = (a: Area) => {
		area = a;
	};

	const setZoomlevel = (zoom: number) => {
		zoomlevel = zoom;
	};

	const allowedZoom = (zoomlevel: number) => {
		if (zoomlevel > 13) {
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

		const result = await response.json();
		state.numberOfGuesses++;
		if (result.score === 1) {
			state.guessedCorrect = true;
			addMarker({
				coordinates: { lat: result.coordinates.lat, long: result.coordinates.long },
				text: 'hello',
				title: 'hello'
			});
		} else {
			state.guessedCorrect = false;
		}
	};

	const getCurrentUserGuest = (): UserGuess => {
		if (state.riddleId === undefined) throw new Error('riddleId is undefined');
		return createUserGuess(area, state.riddleId) as UserGuess;
	};

	const getRiddle = async () => {
		const response = await fetch('/riddle');
		const result = await response.json();
		state = resetState(state);
		state.riddle = result.riddle;
		state.riddleId = result.riddleId;
	};

	onMount(() => {
		getRiddle();
	});
</script>

<svelte:head>
	<title>GuessTheSpot</title>
	<meta name="GuessTheSpot" content="A game where you try to solve a geographical riddle" />
</svelte:head>
<section>
	<div class="container">
		<div class="menu">
			<div class="menu-content">
				{#if state.showInstructions}
					<p>
						You get a riddle, the answer to the riddle is a place on earth. Locate the place so that
						it is inside your current view of the map an click "Guess". If the answer to the riddle
						is inside your view port, you get a point. Zoom in to make a guess!
						{$markers.length}
					</p>
				{/if}
				{#if state.riddle}
					<p>{state.riddle}</p>
				{/if}
				<div class="buttons">
					<Button text="New riddle" click={getRiddle} />
					<Button text="Instructions" click={() => (state = toggleInstructions(state))} />
				</div>
				{#if state.numberOfGuesses > 0}
					{#if state.guessedCorrect === true}
						<p class="correct">✅ Correct!</p>
					{:else}
						<p class="error">❌ Incorrect!</p>
					{/if}
				{:else}
					<p />
				{/if}
			</div>
		</div>
		<div class="mapContainer">
			{#if allowedZoom(zoomlevel) === 'true' && !state.guessedCorrect}
				<div transition:fade={{ duration: 250 }} class="mapGridContent overlapButton">
					<Button big={true} text="Guess" click={() => submitGuess(getCurrentUserGuest())} />
				</div>
			{/if}
			<div class="mapGridContent map">
				<LeafletMap bind:this={map} setZoom={setZoomlevel} updateArea={setArea} />
			</div>
		</div>
	</div>
</section>

<style>
	p {
		text-align: center;
	}
	.overlapButton {
		z-index: 2;
		margin-bottom: 5em;
		margin-top: auto;
		align-content: center;
		display: flex;
		grid-column: 2;
		grid-row: 1;
	}
	.map {
		z-index: 1;
		grid-column: 1 / 3;
		grid-row: 1;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1em;
		margin: 1em;
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
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		min-height: 12em;
	}
	.menu-content {
		max-width: 40em;
		dispaly: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.mapContainer {
		flex-grow: 1;
		display: grid;
		grid-template-columns: 3, 1fr;
	}
</style>
