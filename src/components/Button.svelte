<script lang="ts">
	export let text: string = 'Button';
	export let click: () => void = () => {
		console.log('Hello world from a button');
	};
</script>

<section>
	<button on:click={click}> {text} </button>
</section>

<style>
	button {
		padding: 0.4em;
		border-style: none;
		border-radius: 4px;
		background-color: #cdd3dc;
		transition: 0.04s;
	}

	button:hover {
		background-color: #9aa6b8;
		cursor: pointer;
	}

	button:active {
		cursor: click;
		background-color: #7fa1d3;
	}
</style>
