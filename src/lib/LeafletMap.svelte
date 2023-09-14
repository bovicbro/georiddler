<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import type { Area } from '../routes/gameTypes';

	let mapElement: HTMLElement;

	export let setZoom: (zoom: number) => void;
	export let updateArea: (area: Area) => void;
	export let setMarker: (lat: number, long: number, text: string) => void;

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

			setMarker = (lat: number, long: number, text: string) => {
				leaflet.marker([lat, long]).addTo(map).bindPopup(text).openPopup();
				map.setView([lat, long]);
			};
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
