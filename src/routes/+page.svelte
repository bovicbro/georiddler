<script>
	import LeafletMap from '$lib/LeafletMap.svelte';
	import Button from '../components/Button.svelte';
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
				the riddle is inside your view port, you get a point.
			</p>
			<!-- Buttons should be broken out to its own component -->
			<div class="buttons">
				<Button text="New riddle" click={() => {}} />
				<Button text="Instructions" click={() => {}} />
				<Button text="Guess" click={() => {}} />
			</div>
		</div>
		<div class="map">
			<LeafletMap />
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
