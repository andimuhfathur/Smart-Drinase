export async function searchWilayah(query) {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
    );

    const data = await response.json();

    return data[0];
}