function findClosestField(average, fields) {
    return fields.reduce((closest, field) => {
        const difference = Math.abs(field.wartosc_punktowa - average)
        console.log(difference, closest.difference)
        if (difference < closest.difference) {
            return { nazwa: field.nazwa, difference }
        }
        return closest;
    }, { nazwa: null, difference: Infinity }).nazwa
};

module.exports = findClosestField;