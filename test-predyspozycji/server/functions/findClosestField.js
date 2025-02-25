function findClosestField(personalityPoint, fields) {
    
    let smallestDistance = Infinity;
    let bestMatch = null;

    fields.forEach(field => {
        const distance = Math.sqrt(
            Math.pow(personalityPoint.x - field.x, 2) +
            Math.pow(personalityPoint.y - field.y, 2)
        );

        if (distance < smallestDistance) {
            smallestDistance = distance;
            bestMatch = field
        }
    });
    return bestMatch.id_kierunku
};

module.exports = findClosestField;