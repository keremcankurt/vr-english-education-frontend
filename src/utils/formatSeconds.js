export function formatSeconds(seconds) {
    // Dakikaları hesapla
    const minutes = Math.floor(seconds / 60);
    // Kalan saniyeleri hesapla
    const remainingSeconds = seconds % 60;

    // Dakika ve saniyeleri iki haneli formatta sıfır ile doldur
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Formatlanmış dakika ve saniyeleri birleştir
    return formattedMinutes + ':' + formattedSeconds;
}