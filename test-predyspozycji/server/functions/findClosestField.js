function findClosestField(average, fields) {
    return fields.reduce((closest, field) => {
        const difference = Math.abs(field.wartosc_punktowa - average)
        console.log(difference, closest.difference)
        if (difference < closest.difference) {
            return { id_kierunku: field.id_kierunku, difference }
        }
        return closest;
    }, { id_kierunku: null, difference: Infinity }).id_kierunku
};

module.exports = findClosestField;