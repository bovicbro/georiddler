<script lang="ts">
	export let big: boolean = false;
	export let text: string = 'Button';
	export let click: () => void = () => {
		console.log('Hello world from a button');
	};
</script>

<section>
	<button class:big on:click={click}> {text} </button>
</section>

<style>
	button {
		padding: 0.4em;
		border-style: none;
		border-radius: 4px;
		background-color: #cdd3dc;
		transition: 0.1s;
	}

	.big {
		background-color: #ffcc99;
		font-size: 2em;
		border-style: solid;
		border-width: 5px;
		border-color: #ff901f;
		box-shadow: 0px 0px 0px 2px #cdd3dc;
	}

	.big button:hover {
		background-color: #a35200;
		cursor: pointer;
	}

	.big button:active {
		cursor: click;
		transition: 0s;
		background-color: #7fa1d3;
	}

	button:hover {
		background-color: #9aa6b8;
		cursor: pointer;
	}

	button:active {
		cursor: click;
		transition: 0s;
		background-color: #7fa1d3;
	}
</style>
