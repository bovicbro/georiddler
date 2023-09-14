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

			const icon = leaflet.icon({
				iconUrl: 'marker.png',
				iconSize: [50, 50], // size of the icon
				iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
				popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
			});

			markers.subscribe((markers) => {
				markers.forEach((m) => {
					leaflet.marker([m.coordinates.lat, m.coordinates.long], { icon: icon }).addTo(map);
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
