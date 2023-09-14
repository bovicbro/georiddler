<script lang="ts">
	import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
	import { browser } from '$app/environment';
	import type { Area, Mark } from '../routes/gameTypes';
	import { markers } from '../store';

	let mapElement: HTMLElement;
	//@ts-ignore
	let map;

	export let setZoom: (zoom: number) => void;
	export let updateArea: (area: Area) => void;

	onMount(async () => {
		let map: L.Map;
		if (browser) {
			const currentArea = () => {
				return {
					topLeft: {
						lat: map.getBounds().getNorthWest().lat,
						long: map.getBounds().getNorthWest().lng
					},
					bottomRight: {
						lat: map.getBounds().getSouthEast().lat,
						long: map.getBounds().getSouthEast().lng
					}
				};
			};
			const leaflet = await import('leaflet');
			map = leaflet.map(mapElement).setView([51.505, -0.09], 13);
			map.on('zoomend', () => {
				setZoom(map.getZoom());
				updateArea(currentArea());
			});
			map.on('moveend', () => {
				updateArea(currentArea());
			});

			leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

			markers.subscribe((markers) => {
				markers.forEach((m) => {
					leaflet.marker([m.coordinates.lat, m.coordinates.long]).addTo(map);
				});
			});
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
