<script lang="ts">
	import LeafletMap from '$lib/LeafletMap.svelte';
	import Button from '../components/Button.svelte';
	import type { Area, UserGuess } from './gameTypes';
	import { createUserGuess } from './gameTypes';
	import { fade } from 'svelte/transition';

	const resetStatus = () => {
		return {
			riddle: '',
			riddleId: '',
			guessedCorrect: false,
			numberOfGuesses: 0,
			showInstructions: false
		};
	};

	let status = resetStatus();

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
		if (zoomlevel > 14) {
			return 'true';
		} else {
			return 'false';
		}
	};

	const toggleInstructions = () => {
		if (status.showInstructions) {
			status.showInstructions = false;
		} else {
			status.showInstructions = true;
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
		status.numberOfGuesses++;
		if (result === 1) {
			status.guessedCorrect = true;
		} else {
			status.guessedCorrect = false;
		}
	};

	const getCurrentUserGuest = (): UserGuess => {
		return createUserGuess(area, status.riddleId) as UserGuess;
	};

	const getRiddle = async () => {
		const response = await fetch('/riddle');
		const result = await response.json();
		status = resetStatus();
		status.riddle = result.riddle;
		status.riddleId = result.riddleId;
	};
</script>

<svelte:head>
	<title>GuessTheSpot</title>
	<meta name="GuessTheSpot" content="A game where you try to solve a geographical riddle" />
</svelte:head>
<section>
	<div class="container">
		<div class="menu">
			{#if status.showInstructions}
				<p>
					Instructions: You get a riddle, the answer to the riddle is a place on earth. Locate the
					place so that it is inside your current view of the map an click "Guess". If the answer to
					the riddle is inside your view port, you get a point.
				</p>
			{/if}
			<p>Riddle: {status.riddle}</p>
			{#if status.numberOfGuesses > 0}
				{#if status.guessedCorrect === true}
					<p class="correct">✅ Correct!</p>
				{:else}
					<p class="error">❌ Incorrect!</p>
				{/if}
			{/if}
			<div class="buttons">
				<Button text="New riddle" click={getRiddle} />
				<Button text="Instructions" click={() => toggleInstructions()} />
			</div>
		</div>
		<div class="mapContainer">
			{#if allowedZoom(zoomlevel) === 'true'}
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
		padding: 1em;
	}
	.mapContainer {
		flex-grow: 1;
		display: grid;
		grid-template-columns: 3, 1fr;
	}
	/* .correct { */
	/* 	background-color: green; */
	/* } */
	/**/
	/* .error { */
	/* 	background-color: red; */
	/* } */
</style>
