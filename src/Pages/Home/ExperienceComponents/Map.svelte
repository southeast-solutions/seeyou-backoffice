<script>
    import { onMount, afterUpdate, createEventDispatcher } from "svelte";

    export let lat = 44.4325;
    export let lng = 26.0943854;
    export let isChangable = false;

    const dispatch = createEventDispatcher();

    let container;
    let map;
    let zoom = 16;
    let mapLat = lat || 44.4325;
    let mapLng = lng || 26.0943854;
    let center = { lat: mapLat, lng: mapLng };
    let marker;

    onMount(async () => {
        map = new google.maps.Map(container, {
            zoom,
            center,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        });

        map.addListener("click", function (e) {
            if (isChangable) {
                placeMarker(e.latLng, map);
            }
        });
        if (lat && lng) {
            marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
            });
            map.panTo({ lat, lng });
        }
    });
    afterUpdate(() => {
        console.log({ lat, lng });
        if (marker) {
            marker.setMap(null);
        }
        if (lat && lng) {
            marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
            });
            map.panTo({ lat, lng });
        }
    });

    const placeMarker = (position, map) => {
        marker = new google.maps.Marker({
            position: position,
            map: map,
        });
        map.panTo(position);
        marker.setMap(map);
        dispatch("markerChanged", position);
    };
</script>

<div class="full-screen" bind:this={container} id={lat + lng} />

<style>
    .full-screen {
        width: 100%;
        height: 300px;
    }
</style>
