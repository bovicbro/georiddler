<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let mapElement: HTMLElement;
	let map;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');
			map = leaflet.map(mapElement).setView([51.505, -0.09], 13);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			leaflet
				.marker([51.5, -0.09])
				.addTo(map)
				.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
				.openPopup();
		}
	});
</script>

<div bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
	div {
		height: 100%;
		width: 100%;
	}
</style>
