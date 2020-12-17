const rowMap = ["A", "B", "C", "D", "E", "F", "G"];
const columnInRow = 10;

export const convertSeatIndexToRow = (seatIndex) =>{
    return rowMap[Math.floor(seatIndex/columnInRow)]
}

export const convertSeatIndexToColumn = (seatIndex) =>{
    return seatIndex % columnInRow + 1
}

export const convertSeatIndexToSeatText = (seatIndex) => {
    return convertSeatIndexToRow(seatIndex)+convertSeatIndexToColumn(seatIndex)
}